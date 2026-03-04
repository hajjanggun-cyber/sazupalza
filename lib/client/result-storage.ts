const STORAGE_PREFIX = 'sajupalza:result:';
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

type StoredPayload<T> = {
  data: T;
  createdAt: number;
};

function buildKey(kind: string, token: string): string {
  return `${STORAGE_PREFIX}${kind}:${token}`;
}

function createToken(): string {
  if (typeof globalThis !== 'undefined' && 'crypto' in globalThis && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function cleanupExpiredEntries(storage: Storage) {
  const now = Date.now();

  for (let index = storage.length - 1; index >= 0; index -= 1) {
    const key = storage.key(index);
    if (!key || !key.startsWith(STORAGE_PREFIX)) {
      continue;
    }

    const raw = storage.getItem(key);
    if (!raw) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw) as StoredPayload<unknown>;
      if (!parsed.createdAt || now - parsed.createdAt > MAX_AGE_MS) {
        storage.removeItem(key);
      }
    } catch {
      storage.removeItem(key);
    }
  }
}

export function storeResultPayload<T>(kind: string, data: T): string {
  if (typeof window === 'undefined') {
    throw new Error('Result storage is only available in the browser');
  }

  const token = createToken();
  const payload = JSON.stringify({
    data,
    createdAt: Date.now(),
  } satisfies StoredPayload<T>);
  const key = buildKey(kind, token);

  try {
    cleanupExpiredEntries(window.localStorage);
    window.localStorage.setItem(key, payload);
  } catch {
    // Ignore localStorage quota/privacy mode failures.
  }

  try {
    cleanupExpiredEntries(window.sessionStorage);
    window.sessionStorage.setItem(key, payload);
  } catch {
    // Ignore sessionStorage quota/privacy mode failures.
  }

  return token;
}

export function readResultPayload<T>(kind: string, token: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const key = buildKey(kind, token);
  const storages: Storage[] = [window.sessionStorage, window.localStorage];

  for (const storage of storages) {
    try {
      const raw = storage.getItem(key);
      if (!raw) {
        continue;
      }

      const parsed = JSON.parse(raw) as StoredPayload<T>;
      if (!parsed.createdAt || Date.now() - parsed.createdAt > MAX_AGE_MS) {
        storage.removeItem(key);
        continue;
      }

      return parsed.data;
    } catch {
      try {
        storage.removeItem(key);
      } catch {
        // Ignore cleanup failures.
      }
    }
  }

  return null;
}
