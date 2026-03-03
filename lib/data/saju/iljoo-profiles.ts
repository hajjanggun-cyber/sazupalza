import { IljooProfile, ILJOO_PROFILES_1 } from './iljoo-profiles-1';
import { ILJOO_PROFILES_2 } from './iljoo-profiles-2';
import { ILJOO_PROFILES_3 } from './iljoo-profiles-3';
import { ILJOO_PROFILES_4 } from './iljoo-profiles-4';
import { ILJOO_PROFILES_5 } from './iljoo-profiles-5';

export type { IljooProfile };

export const ILJOO_PROFILES: Record<string, IljooProfile> = {
  ...ILJOO_PROFILES_1,
  ...ILJOO_PROFILES_2,
  ...ILJOO_PROFILES_3,
  ...ILJOO_PROFILES_4,
  ...ILJOO_PROFILES_5,
};
