'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// 구형 ?name=...&year=... URL을 새 /result/[id] URL로 리다이렉트
function RedirectContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  useEffect(() => {
    const name = searchParams.get('name');
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const day = searchParams.get('day');

    if (name && year && month && day) {
      // 구형 파라미터를 새 Base64 URL-safe 인코딩으로 변환
      const data = {
        name,
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day),
        lunar: searchParams.get('lunar') === 'true',
        ...(searchParams.get('mbti') && { mbti: searchParams.get('mbti')! }),
        ...(searchParams.get('hour') && {
          hour: parseInt(searchParams.get('hour')!),
        }),
        hasPhoto: searchParams.get('hasPhoto') === '1',
      };

      try {
        const jsonStr = JSON.stringify(data);
        const bytes = new TextEncoder().encode(jsonStr);
        const binStr = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
        const encoded = btoa(binStr)
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
        router.replace(`/${locale}/result/${encoded}`);
      } catch {
        router.replace(`/${locale}`);
      }
    } else {
      // 파라미터 없음 → 홈으로
      router.replace(`/${locale}`);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-yellow-400 text-4xl mb-4 animate-spin">✨</div>
        <p className="text-yellow-200 text-sm">결과 페이지로 이동 중...</p>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-yellow-200 text-sm">이동 중...</div>
        </div>
      }
    >
      <RedirectContent />
    </Suspense>
  );
}
