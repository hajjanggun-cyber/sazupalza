'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { storeResultPayload } from '@/lib/client/result-storage';
import { buildLocalizedHref } from '@/lib/seo';

// ── 28문항 데이터 ──
const QUESTIONS = [
    { id: 1, axis: 'EI', qKo: '주말에 아무 약속이 없다면 나는?', qEn: 'If I have no plans for the weekend, I...', aKo: '친구들에게 연락해서 번개 모임을 잡는다', aEn: 'Call friends to arrange a quick meetup', aScore: 'E', bKo: '밀린 드라마나 영화를 보며 혼자만의 시간을 즐긴다', bEn: 'Enjoy alone time catching up on shows or movies', bScore: 'I' },
    { id: 2, axis: 'EI', qKo: '새로운 사람을 소개받는 자리에서 나는?', qEn: 'When introduced to someone new, I...', aKo: '먼저 말을 걸고 분위기를 주도하는 편이다', aEn: 'Usually start the conversation and lead the vibe', aScore: 'E', bKo: '주로 상대방의 이야기를 듣고 리액션하는 편이다', bEn: 'Mostly listen and react to what they say', bScore: 'I' },
    { id: 3, axis: 'EI', qKo: '스트레스를 가장 잘 푸는 방법은?', qEn: 'My best way to relieve stress is...', aKo: '사람들과 만나 수다를 떨며 푼다', aEn: 'Meeting people and chatting it away', aScore: 'E', bKo: '조용한 곳에서 혼자 쉬거나 산책하며 푼다', bEn: 'Resting alone in a quiet place or taking a walk', bScore: 'I' },
    { id: 4, axis: 'EI', qKo: '여러 명이 모인 회의(또는 모임)에서 나는?', qEn: 'In a group meeting or gathering, I...', aKo: '내 생각을 적극적으로 말하며 참여한다', aEn: 'Actively participate and share my thoughts', aScore: 'E', bKo: '다른 사람들의 의견을 먼저 충분히 들어본다', bEn: 'Focus on listening to others first', bScore: 'I' },
    { id: 5, axis: 'EI', qKo: '하루 일과를 마치고 집에 돌아왔을 때 내 에너지는?', qEn: 'When getting home after a long day, my energy...', aKo: '여전히 기운이 넘쳐 다른 활동을 더 할 수 있다', aEn: 'Is still high, ready for another activity', aScore: 'E', bKo: '방전되어 바로 누워서 쉬고 싶다', bEn: 'Is fully drained, I just want to lie down', bScore: 'I' },
    { id: 6, axis: 'SN', qKo: '어떤 일을 새롭게 시작할 때 나는?', qEn: 'When starting something new, I...', aKo: '기존의 검증된 방법과 매뉴얼을 따른다', aEn: 'Follow proven methods and manuals', aScore: 'S', bKo: '나만의 새로운 방식이나 가능성을 탐색한다', bEn: 'Explore my own new methods or possibilities', bScore: 'N' },
    { id: 7, axis: 'SN', qKo: '사과(Apple)를 떠올려 보라고 하면 나는?', qEn: 'If asked to imagine an "Apple", I think of...', aKo: '빨갛다, 동그랗다, 아삭하다 등 특징을 먼저 떠올린다', aEn: 'Red, round, crisp (physical traits)', aScore: 'S', bKo: '백설공주, 뉴욕, 아이폰 등 연관된 이미지를 떠올린다', bEn: 'Snow White, New York, iPhone (associations)', bScore: 'N' },
    { id: 8, axis: 'SN', qKo: '친구에게 재미있는 이야기를 전해줄 때 나는?', qEn: 'When telling a friend a funny story, I...', aKo: '일어난 일의 순서와 팩트 위주로 자세히 설명한다', aEn: 'Detail the timeline and facts of what happened', aScore: 'S', bKo: '그때의 느낌과 핵심 내용만 요약해서 전달한다', bEn: 'Summarize the core point and how it felt', bScore: 'N' },
    { id: 9, axis: 'SN', qKo: '요리를 할 때 나는?', qEn: 'When cooking a meal, I...', aKo: '레시피의 계량과 순서를 정확하게 맞추려 노력한다', aEn: 'Try to follow the recipe measurements exactly', aScore: 'S', bKo: '내 감이나 입맛에 따라 대략적으로 재료를 넣는다', bEn: 'Roughly add ingredients based on my intuition', bScore: 'N' },
    { id: 10, axis: 'SN', qKo: '미래에 대해 상상할 때 주로 어떤 생각을 하나요?', qEn: 'When imagining the future, what do you think about?', aKo: '당장 현실적으로 일어날 수 있는 구체적인 계획들', aEn: 'Concrete, realistic plans that could happen soon', aScore: 'S', bKo: '일어나지 않은 일에 대한 기발하고 다양한 상상들', bEn: 'Various imaginative scenarios of what could be', bScore: 'N' },
    { id: 11, axis: 'TF', qKo: '친구가 우울하다며 화분을 하나 샀다고 할 때 나의 반응은?', qEn: 'A friend says they bought a plant because they were depressed. I say...', aKo: '"무슨 식물 샀어? 키우기 쉬운 거야?" (원인 파악형)', aEn: '"What kind of plant? Is it easy to grow?" (Focus on fact)', aScore: 'T', bKo: '"무슨 일 있어? 왜 우울해!" (공감형)', bEn: '"What happened? Why are you depressed!" (Focus on emotion)', bScore: 'F' },
    { id: 12, axis: 'TF', qKo: '팀 프로젝트에서 갈등이 생겼을 때 중요하게 생각하는 것은?', qEn: 'During a team project conflict, what matters most?', aKo: '누구의 의견이 더 합리적이고 논리적인가 판별하기', aEn: 'Figuring out whose idea is more logical/reasonable', aScore: 'T', bKo: '서로 기분이 상하지 않게 조율하고 화합하기', bEn: 'Harmonizing and ensuring no feelings are hurt', bScore: 'F' },
    { id: 13, axis: 'TF', qKo: '누군가의 고민을 들어줄 때 나는 주로?', qEn: 'When listening to someone\'s worries, I usually...', aKo: '문제를 해결할 수 있는 실질적인 조언이나 방법을 제안한다', aEn: 'Offer practical advice or solutions to fix it', aScore: 'T', bKo: '그 사람의 힘든 마음에 공감하며 위로를 건넨다', bEn: 'Empathize, validate their feelings, and comfort them', bScore: 'F' },
    { id: 14, axis: 'TF', qKo: '일을 훌륭하게 끝냈을 때 듣고 싶은 칭찬은?', qEn: 'After doing a great job, the compliment I prefer is...', aKo: '"결과물이 정말 완벽하고 능률적이네요!" (능력 인정)', aEn: '"The result is flawless and efficient!" (Skill-focused)', aScore: 'T', bKo: '"고생 많았어요. 당신 덕분에 정말 든든해요!" (노력 인정)', bEn: '"You worked so hard. We rely on you!" (Effort-focused)', bScore: 'F' },
    { id: 15, axis: 'TF', qKo: '규칙이나 법을 적용할 때 나의 생각은?', qEn: 'When applying rules or laws, I think...', aKo: '예외 없이 공명정대하게 규칙대로 처리해야 한다', aEn: 'They should be applied fairly without exception', aScore: 'T', bKo: '상황에 따라 융통성 있게 정상참작을 해야 한다', bEn: 'We should consider situations and be flexible', bScore: 'F' },
    { id: 16, axis: 'JP', qKo: '해외여행을 가기 일주일 전 내 모습은?', qEn: 'A week before an overseas trip, I am...', aKo: '일자별 일정표, 맛집 리스트, 예산까지 액셀로 정리 완료', aEn: 'Fully planned: daily schedule, restaurants, and budget', aScore: 'J', bKo: '비행기표와 숙소만 잡고, 나머지는 가서 끌리는 대로 정할 예정', bEn: 'Flights and hotels booked, rest decided spontaneously', bScore: 'P' },
    { id: 17, axis: 'JP', qKo: '내 방 책상이나 스마트폰 앱 정리는 주로 어떻게 되어 있나?', qEn: 'How organized is your desk or smartphone apps?', aKo: '카테고리별로 폴더를 나누어 깔끔하게 정리되어 있다', aEn: 'Neatly organized by folders and categories', aScore: 'J', bKo: '내가 필요한 것만 바로 찾을 수 있으면 충분하다', bEn: 'I just need to find what I need (somewhat freestyle)', bScore: 'P' },
    { id: 18, axis: 'JP', qKo: '일을 할 때 나의 데드라인(마감 기한) 관리 방식은?', qEn: 'How do you manage task deadlines?', aKo: '마감이 닥치기 전에 미리미리 조금씩 해둔다', aEn: 'Work steadily ahead of time to finish early', aScore: 'J', bKo: '마감 직전에 엄청난 집중력을 발휘해 한 번에 끝낸다', bEn: 'Use intense burst of energy right before the deadline', bScore: 'P' },
    { id: 19, axis: 'JP', qKo: '주말 데이트(또는 약속)가 갑자기 취소되었다면 나는?', qEn: 'If a weekend plan is suddenly canceled, I am...', aKo: '미리 짜놓은 일정이 틀어져서 당황하고 짜증난다', aEn: 'Annoyed because my planned schedule is ruined', aScore: 'J', bKo: '아싸, 생긴 빈 시간에 뭐 할지 새로 생각하며 즐거워한다', bEn: 'Excited for unexpected free time to do whatever', bScore: 'P' },
    { id: 20, axis: 'JP', qKo: '내가 선호하는 쇼핑 스타일은?', qEn: 'My preferred shopping style is...', aKo: '살 물건의 목록을 미리 정해놓고 그것만 딱 사고 온다', aEn: 'Make a list of exactly what to buy and stick to it', aScore: 'J', bKo: '돌아다니다가 마음에 드는 것이 꽂히면 즉흥적으로 산다', bEn: 'Browse around and buy things spontaneously if I like them', bScore: 'P' },
    { id: 21, axis: 'EI', qKo: '중요한 결정을 내려야 할 때, 나는 어떻게 생각을 정리하나요?', qEn: 'When I need to make an important decision, I...', aKo: '여러 사람과 이야기를 나누면서 대화 속에서 자연스럽게 정리된다', aEn: 'Talk it through with others — conversations help me figure things out', aScore: 'E', bKo: '혼자 충분히 생각하고 결론을 낸 뒤에야 남에게 말한다', bEn: 'Process it quietly alone and speak only once I\'ve reached a conclusion', bScore: 'I' },
    { id: 22, axis: 'EI', qKo: '혼자 집중해서 작업해야 할 때, 내가 선호하는 환경은?', qEn: 'When I need to focus and work alone, I prefer...', aKo: '약간의 소음이나 사람들이 오가는 공간이 오히려 집중이 잘 된다', aEn: 'A space with some background noise or people around — it actually helps me focus', aScore: 'E', bKo: '완전히 조용하고 아무도 없는 공간이어야 집중이 된다', bEn: 'A completely silent, empty space where no one can interrupt me', bScore: 'I' },
    { id: 23, axis: 'SN', qKo: '설명서나 안내문을 읽을 때 나는?', qEn: 'When reading instructions or a manual, I...', aKo: '처음부터 차근차근 순서대로 읽는다', aEn: 'Read it step by step from beginning to end', aScore: 'S', bKo: '전체를 대충 훑어보며 핵심만 빠르게 파악한다', bEn: 'Skim through and quickly grasp only the key points', bScore: 'N' },
    { id: 24, axis: 'SN', qKo: '대화할 때 내가 가장 답답한 순간은?', qEn: 'The most frustrating thing in a conversation is...', aKo: '상대방이 두루뭉술하거나 모호하게 말할 때 (구체적 사실을 원함)', aEn: 'When the other person speaks vaguely or non-specifically (I want clear facts)', aScore: 'S', bKo: '상대방이 지엽적인 디테일만 늘어놓을 때 (전체 맥락을 원함)', bEn: 'When they keep listing minor details without the big picture (I want context)', bScore: 'N' },
    { id: 25, axis: 'TF', qKo: '익명 게시판에 올라온 누군가의 사업 아이디어가 보기에 분명히 실패할 것 같다면?', qEn: 'If a business plan posted anonymously online looks clearly likely to fail...', aKo: '현실적인 문제점을 조목조목 댓글로 적어준다', aEn: 'I comment pointing out the specific, realistic problems', aScore: 'T', bKo: '노력이 느껴지니 응원의 댓글을 단다', bEn: 'I can feel the effort, so I leave an encouraging comment instead', bScore: 'F' },
    { id: 26, axis: 'TF', qKo: '어떤 선택을 한 뒤 \'잘못됐다\'고 느낄 때, 내가 더 자주 드는 생각은?', qEn: 'After making a decision that turned out wrong, the thought I have MORE often is...', aKo: '\'더 좋은 방법이 있었는데, 왜 그걸 선택했지?\' (결과와 논리에 대한 후회)', aEn: '"There was a better option — why didn\'t I choose that?" (regretting the outcome/logic)', aScore: 'T', bKo: '\'그 사람 감정이 상했을 텐데, 배려가 부족했나...\' (관계와 감정에 대한 후회)', bEn: '"I probably hurt their feelings — I should have been more considerate..." (regretting the impact on others)', bScore: 'F' },
    { id: 27, axis: 'JP', qKo: '식당에서 메뉴를 고를 때 나는?', qEn: 'When choosing from a restaurant menu, I...', aKo: '빠르게 하나를 정하고, 한번 정하면 바꾸지 않는다', aEn: 'Decide quickly and stick with my choice without changing it', aScore: 'J', bKo: '여러 후보를 두고 고민하다가 주문 직전에 바꾸기도 한다', bEn: 'Consider multiple options and sometimes switch my order at the last second', bScore: 'P' },
    { id: 28, axis: 'JP', qKo: '할 일이 여러 개 쌓였을 때 나는?', qEn: 'When multiple tasks pile up, I...', aKo: '목록을 만들고 하나씩 순서대로 처리해야 마음이 편하다', aEn: 'Make a list and handle them one by one in order — that feels right', aScore: 'J', bKo: '기분이 당기는 것부터 이것저것 동시에 건드리며 진행한다', bEn: 'Start with whatever feels most appealing and multitask across several at once', bScore: 'P' },
];

function getAxisClarity(primaryCount: number): number {
    const totalPerAxis = 7;
    const oppositeCount = totalPerAxis - primaryCount;
    const gap = Math.abs(primaryCount - oppositeCount);
    return Math.max(48, Math.min(96, 48 + gap * 8));
}

export default function PersonalityForm() {
    const router = useRouter();
    const locale = useLocale();
    const isKo = locale === 'ko';

    const [step, setStep] = useState(0); // 0~19
    const [answers, setAnswers] = useState<string[]>([]);
    const [calculating, setCalculating] = useState(false);

    const currentQ = QUESTIONS[step];
    const progress = Math.round(((step) / QUESTIONS.length) * 100);

    const handleAnswer = (score: string) => {
        const newAnswers = [...answers, score];
        setAnswers(newAnswers);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            // 마지막 문항 완료 → 결과 산출
            setCalculating(true);
            setTimeout(() => {
                const eCount = newAnswers.filter(a => a === 'E').length;
                const nCount = newAnswers.filter(a => a === 'N').length;
                const fCount = newAnswers.filter(a => a === 'F').length;
                const pCount = newAnswers.filter(a => a === 'P').length;

                const EI = eCount >= 4 ? 'E' : 'I';
                const SN = nCount >= 4 ? 'N' : 'S';
                const TF = fCount >= 4 ? 'F' : 'T';
                const JP = pCount >= 4 ? 'P' : 'J';

                const mbti = `${EI}${SN}${TF}${JP}`;
                const clarity = Math.round(
                    (getAxisClarity(eCount) + getAxisClarity(nCount) + getAxisClarity(fCount) + getAxisClarity(pCount)) / 4
                );

                const data = {
                    mbti,
                    clarity,
                    axisCounts: {
                        EI: eCount,
                        SN: nCount,
                        TF: fCount,
                        JP: pCount,
                    },
                    ts: Date.now(),
                };

                const token = storeResultPayload('personality', data);
                router.push(buildLocalizedHref(locale, `/personality-result/${token}`));
            }, 600);
        }
    };

    if (calculating) {
        return (
            <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-6 animate-spin">⏳</div>
                <h3 className="text-xl font-bold text-yellow-100 mb-2">
                    {isKo ? '답변 분석 중...' : 'Reviewing your answers...'}
                </h3>
                <p className="text-yellow-200/50 text-sm">
                    {isKo ? '나만의 성격 유형을 추출하고 있습니다' : 'Preparing your personality profile'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg px-4 py-3 text-center">
                <p className="text-purple-300/80 text-sm">
                    🧠 {isKo
                        ? '솔직하게 응답할수록 가장 정확한 유형이 도출됩니다'
                        : 'Answer intuitively for the most natural result'}
                </p>
            </div>

            <div className="relative pt-1 pb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-200/60 text-xs font-medium">Question {step + 1} of 28</span>
                    <span className="text-yellow-400/80 text-xs font-bold">{progress}%</span>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-900/40">
                    <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500 transition-all duration-300"></div>
                </div>
            </div>

            <div className="card-dark p-6 min-h-[160px] flex items-center justify-center fade-in-up" key={step}>
                <h3 className="text-xl font-bold text-yellow-100 text-center leading-relaxed">
                    {isKo ? currentQ.qKo : currentQ.qEn}
                </h3>
            </div>

            <div className="space-y-3 pt-2">
                <button
                    onClick={() => handleAnswer(currentQ.aScore)}
                    className="w-full text-left p-5 rounded-xl border border-yellow-700/30 bg-white/5 hover:bg-purple-900/20 hover:border-purple-500/50 transition-all group fade-in-up"
                    style={{ animationDelay: '0.1s' }}
                >
                    <p className="text-yellow-100 group-hover:text-purple-200 text-[15px] sm:text-base leading-relaxed break-keep">
                        A. {isKo ? currentQ.aKo : currentQ.aEn}
                    </p>
                </button>

                <button
                    onClick={() => handleAnswer(currentQ.bScore)}
                    className="w-full text-left p-5 rounded-xl border border-yellow-700/30 bg-white/5 hover:bg-purple-900/20 hover:border-purple-500/50 transition-all group fade-in-up"
                    style={{ animationDelay: '0.2s' }}
                >
                    <p className="text-yellow-100 group-hover:text-purple-200 text-[15px] sm:text-base leading-relaxed break-keep">
                        B. {isKo ? currentQ.bKo : currentQ.bEn}
                    </p>
                </button>
            </div>

            <div className="pt-6">
                <button
                    onClick={() => router.push(buildLocalizedHref(locale))}
                    className="w-full text-center text-yellow-200/40 hover:text-yellow-200 text-xs transition-colors"
                >
                    {isKo ? '← 메인으로 돌아가기' : '← Back to Menu'}
                </button>
            </div>
        </div>
    );
}
