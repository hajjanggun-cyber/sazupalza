# -*- coding: utf-8 -*-
"""Replace contentKo & contentEn for day-pillar, saju-spirits, lucky-element"""
import re

path = r'c:\Users\홈_메인\Desktop\11  11 실전코딩\sajupalza\lib\blog\saju-posts.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_field(content, slug, field, new_value):
    """Find slug block and replace the given template-literal field."""
    slug_pat = f"slug: '{slug}'"
    slug_idx = content.find(slug_pat)
    if slug_idx < 0:
        print(f"SLUG NOT FOUND: {slug}")
        return content
    # find the field start after slug
    field_start = content.find(f"    {field}: `", slug_idx)
    if field_start < 0:
        print(f"FIELD NOT FOUND: {field} in {slug}")
        return content
    # find the backtick open
    bt_open = content.find('`', field_start + len(f"    {field}: "))
    # find the closing backtick (next standalone backtick)
    bt_close = content.find('\n    `', bt_open + 1)
    if bt_close < 0:
        print(f"CLOSING BACKTICK NOT FOUND for {field} in {slug}")
        return content
    # bt_close points to \n    ` -> we want to keep \n    `
    old_block = content[bt_open+1:bt_close]
    content = content[:bt_open+1] + '\n' + new_value + '\n' + content[bt_close:]
    print(f"OK: {slug}.{field} replaced ({len(old_block)} -> {len(new_value)} chars)")
    return content

# ════════════════════════════════════════════════════════════
# day-pillar  contentKo
# ════════════════════════════════════════════════════════════
day_pillar_ko = """<section>
<p>사주팔자 여덟 글자 가운데 가장 중요한 한 글자를 꼽으라 한다면, 열에 아홉은 '일주(日柱)'를 선택합니다. 일주는 내가 태어난 날의 기둥입니다. 위에 놓인 천간을 일간(日干)이라 하고, 아래 지지를 일지(日支)라 부릅니다. 일간은 나 자신—내 의식과 기질, 내가 세상에 반응하는 방식—을 나타냅니다. 일지는 내 발 밑의 땅이자, 내가 가장 편안하게 느끼는 사적 공간, 그리고 배우자의 자리입니다.</p>

<p>단 두 글자지만 그 안에 담긴 정보의 밀도는 놀랍습니다. 명리학을 처음 배우는 사람도, 수십 년을 공부한 역술가도, 결국 일주 분석으로 돌아오는 이유가 바로 여기에 있습니다.</p>

<h2 id="ilju-core">1. 일간(日干): 나를 움직이는 본질 에너지</h2>
<p>10천간은 목(木)·화(火)·토(土)·금(金)·수(水) 다섯 가지 오행이 음양으로 갈라진 것입니다. 내 일간이 무엇인지를 알면, 내가 왜 어떤 상황에서는 탁월하고 어떤 상황에서는 번번이 무너지는지를 이해하게 됩니다.</p>
<ul>
  <li><strong>갑목(甲木) — 거목의 리더:</strong> 성장 욕구와 리더십이 강합니다. 남 위에 서려는 자존심이 크지만 유연성이 부족해 고집으로 읽힐 수 있습니다. 직진형 창업가, 선두 주자에 어울립니다.</li>
  <li><strong>을목(乙木) — 덩굴의 전략가:</strong> 환경 적응력과 눈치가 탁월합니다. 강자에게 기댈 줄 알고, 미적 감수성이 뛰어납니다. 예술·패션·기획 분야에서 두각을 나타냅니다.</li>
  <li><strong>병화(丙火) — 태양의 활동가:</strong> 밝고 에너지가 넘치며 사람을 끌어모읍니다. 속을 감추지 못하는 것이 단점이지만, 그 솔직함이 오히려 대중의 신뢰를 얻습니다.</li>
  <li><strong>정화(丁火) — 촛불의 예술가:</strong> 섬세하고 집중력이 강합니다. 한 우물을 깊이 파는 전문가 기질로, 연구·의료·예술·교육 분야에서 독보적인 경지에 오릅니다.</li>
  <li><strong>무토(戊土) — 산의 중재자:</strong> 묵직하고 신뢰감을 줍니다. 변화를 싫어하지만 그 안정감이 조직의 버팀목이 됩니다. 대형 프로젝트 관리, 공무, 건설 분야에 강합니다.</li>
  <li><strong>기토(己土) — 논밭의 포용자:</strong> 모든 오행을 품어 키워내는 어머니 같은 기운입니다. 디테일에 강하고, 조용히 실무를 완성하는 숨은 조력자형입니다.</li>
  <li><strong>경금(庚金) — 원석의 추진가:</strong> 강직하고 결단이 빠릅니다. 정의감이 강해 불합리한 것을 참지 못합니다. 군·검·경, 외과의사, 엔지니어에 적합합니다.</li>
  <li><strong>신금(辛金) — 보석의 완벽주의자:</strong> 날카로운 미적 기준을 가졌습니다. 예민하고 자존심이 강하지만, 그 예민함이 명품 같은 결과물을 만들어냅니다.</li>
  <li><strong>임수(壬水) — 강의 기획자:</strong> 아이디어가 끝없이 솟아납니다. 빠른 두뇌 회전과 유머로 사람을 사로잡지만, 한 가지에 집중하는 지속력이 부족할 수 있습니다.</li>
  <li><strong>계수(癸水) — 빗물의 사색가:</strong> 조용하지만 내면이 깊습니다. 뛰어난 직관력으로 보이지 않는 것을 감지하며, 상담·연구·영성 분야에서 탁월한 통찰을 발휘합니다.</li>
</ul>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">🦁 내 일간 기질과 배우자운 바로 확인하기 →</a>
</div>

<h2 id="spouse-luck">2. 일지(日支): 내 발 밑의 땅, 배우자의 얼굴</h2>
<p>일지는 나의 가장 솔직한 내면이자 배우자의 자리입니다. 일간과 일지가 어떤 오행 관계를 맺고 있느냐에 따라 십성(十星)이 결정되고, 그 십성이 배우자의 성품과 결혼 패턴을 예고합니다.</p>
<p>일지가 <strong>정재(正財)나 정관(正官)</strong>에 해당하면 안정적이고 사회적으로 인정받는 배우자를 만날 가능성이 높습니다. 반면 <strong>상관(傷官)이나 편관(偏官)</strong>이 일지에 자리하면, 관계에 역동적인 에너지가 흘러 처음엔 강렬한 끌림이 있지만 장기적으로 조율이 필요합니다.</p>

<h3>형충파해(刑沖破害) — 갈등의 예고가 아닌 성장의 신호</h3>
<p>일지가 다른 기둥과 <strong>충(沖)</strong> 관계를 이루면 "배우자와 자주 충돌하거나 인연이 바뀐다"고 이야기합니다. 그러나 이를 '운명의 저주'로 읽어서는 안 됩니다. 충은 오히려 서로를 더 깊이 이해하라는 우주의 숙제입니다. 충을 인식한 커플이 문제를 예방하고 더 단단한 관계를 만들어가는 사례는 명리 상담 현장에서 수없이 목격됩니다.</p>

<h2 id="sixty-pillars">3. 육십갑자: 당신의 삶을 설명하는 60가지 코드</h2>
<p>10천간 × 12지지가 만들어내는 60개의 조합, 곧 육십갑자(六十甲子)는 인류의 삶을 60가지 원형 이야기로 압축해 놓은 것입니다.</p>
<p><strong>갑자(甲子)</strong>는 '큰 물 위에 뿌리를 내리는 거목'입니다. 뛰어난 지성과 이상을 품지만, 불안정한 토대 위에 서 있어 끊임없이 인정받고 싶어 합니다. <strong>정사(丁巳)</strong>는 '두 개의 불이 타오르는' 일주로, 열정과 집중력이 극에 달하지만 소진도 빠릅니다. <strong>경신(庚申)</strong>은 '강철 위의 강철'로 불릴 만큼 추진력이 강하며, 무결점을 추구하는 완벽주의자입니다.</p>
<p>자신의 육십갑자 일주를 알면, 삶의 반복되는 패턴과 핵심 과제가 한눈에 보입니다. 이것이 명리학이 단순한 미신이 아닌 '자기 이해의 도구'로 주목받는 이유입니다.</p>

<h2 id="daily-life">4. 일간별 직업·파트너 선택 전략</h2>
<p>일간의 음양에 따라 최적의 환경이 달라집니다. <strong>양간(甲·丙·戊·庚·壬)</strong>은 개척하고 주도하는 환경에서 빛을 발합니다. 창업, 세일즈 리더십, 독립 전문직이 잘 맞습니다. <strong>음간(乙·丁·己·辛·癸)</strong>은 섬세함과 전문성이 빛나는 분야—컨설팅, 의료, 연구, 예술, 교육—에서 최고의 결과를 만들어냅니다.</p>
<p>파트너 선택에서도 일간 기준으로 정재(남성의 경우) 또는 정관(여성의 경우)에 해당하는 오행을 가진 이를 만날 때, 서로의 에너지가 자연스럽게 보완되어 가장 지속 가능한 관계가 완성됩니다.</p>

<h2 id="conclusion">5. 결론: 일주를 알면 인생이 달라진다</h2>
<p>사주를 본다는 것은 미래를 점치는 것이 아닙니다. 내가 왜 이런 사람인지, 나는 어떤 환경에서 빛나는지, 내가 끌리는 이성의 패턴은 왜 반복되는지—그 이유를 이해하는 과정입니다. 일주는 그 여정의 출발점이자 핵심 나침반입니다. 오늘 자신의 일주를 확인하고, 그 안에 담긴 이야기를 펼쳐보세요.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/saju/lucky-element" style="text-decoration: underline; color: #f9d976;">[관련글] 사주 용신 찾기 — 내 사주에서 가장 필요한 행운의 기운은?</a></p>
  <p><a href="/ko/saju/saju-spirits" style="text-decoration: underline; color: #f9d976;">[관련글] 도화살·역마살의 진짜 의미 — 현대에서 살은 무기다</a></p>
</div>
</section>"""

# ════════════════════════════════════════════════════════════
# day-pillar  contentEn  (original, not translation)
# ════════════════════════════════════════════════════════════
day_pillar_en = """<section>
<p>Every person who learns Korean astrology eventually asks the same question: <em>"Which part of my chart matters most?"</em> Experienced practitioners almost always point to the same answer: the <strong>Day Pillar</strong>. Not because the other three pillars—Year, Month, Hour—don't matter. They do. But the Day Pillar is where your identity lives.</p>

<p>It's made of two characters: the <strong>Day Master</strong> (the Heavenly Stem on top) and the <strong>Day Branch</strong> (the Earthly Branch below). Together, they form the most intimate snapshot of who you are and how you love.</p>

<h2 id="ilju-core">1. The Day Master: Ten Ways to Be Human</h2>
<p>The Day Master is drawn from the Ten Heavenly Stems, each a distinct expression of elemental energy. Think of them less as "types" and more as <em>themes</em>—the lens through which you experience the world.</p>
<ul>
  <li><strong>Gab (甲) — The Pioneer Tree:</strong> Visionary, driven, born to lead. Struggles when the path is uncertain or when authority is questioned. Entrepreneurs, CEOs, trailblazers.</li>
  <li><strong>Eul (乙) — The Climbing Vine:</strong> Elegant, adaptive, quietly strategic. Masters the art of working with—and through—others. Artists, diplomats, stylists.</li>
  <li><strong>Byeong (丙) — The Open Sun:</strong> Magnetic, warm, irresistibly social. What you see is what you get—which is both their superpower and their vulnerability. Performers, salespeople, motivators.</li>
  <li><strong>Jeong (丁) — The Still Flame:</strong> Precise, devoted, deeply specialized. Like a candle that burns with focused warmth rather than blinding brightness. Surgeons, researchers, therapists, craftspeople.</li>
  <li><strong>Mu (戊) — The Mountain:</strong> Dependable, grounded, immovable. The person everyone leans on in a crisis. Corporate managers, civil servants, architects.</li>
  <li><strong>Gi (己) — The Fertile Field:</strong> Nurturing, detail-oriented, quietly essential. Often overlooked but impossible to replace. Educators, accountants, caregivers.</li>
  <li><strong>Gyeong (庚) — The Raw Blade:</strong> Bold, principled, decisive under pressure. A natural reformer who cannot tolerate injustice. Military, law enforcement, surgeons, engineers.</li>
  <li><strong>Sin (辛) — The Refined Jewel:</strong> Aesthetic, perfectionist, quietly intense. Produces work of exceptional quality, but sets equally high standards for others. Designers, editors, luxury brands.</li>
  <li><strong>Im (壬) — The River:</strong> Creative, strategic, constantly generating ideas. Risk is the River's natural habitat. Entrepreneurs, marketers, visionaries.</li>
  <li><strong>Gye (癸) — The Still Rain:</strong> Intuitive, introspective, emotionally perceptive. Often knows things before they're spoken. Counselors, writers, spiritual guides.</li>
</ul>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">🦁 Find Your Day Master & Love Compatibility →</a>
</div>

<h2 id="spouse-luck">2. The Day Branch: Your Relationship Blueprint</h2>
<p>If the Day Master is the actor, the Day Branch is the environment in which they perform. It represents your body, your private life—and crucially, your <strong>marriage palace</strong>.</p>
<p>The Ten God relationship between your Day Master and Day Branch tells the story of your romantic life. If the Day Branch activates your <em>Direct Wealth</em> or <em>Direct Officer</em>, you tend to attract reliable, socially respected partners. If it activates your <em>Hurting Officer</em> or <em>Seven Killings</em>, your relationships carry an electric charge—thrilling at first, demanding in the long run.</p>

<h3>Clash and Punishment: Warning Labels, Not Death Sentences</h3>
<p>When the Day Branch clashes with another pillar, many people panic. Don't. A clash is not a prediction of divorce—it's a signal that this relationship requires more conscious effort, more communication, and more room for difference. Many of the most passionate and enduring relationships involve a clash somewhere in the chart. The key is awareness.</p>

<h2 id="sixty-pillars">3. The 60 Pillars: Your Personal Archetype</h2>
<p>Ten Stems × Twelve Branches = 60 combinations. Each is a unique lifetime archetype with its own strengths, blind spots, and karmic theme.</p>
<p><strong>Gab-Ja (甲子)</strong> — the Great Tree floating on deep water — is gifted with intellectual brilliance and vision, but quietly fears that the ground beneath them will give way. <strong>Jeong-Sa (丁巳)</strong> — a candle inside a furnace — burns with extraordinary focus and can achieve mastery, but must guard against consuming themselves in the process. <strong>Gyeong-Sin (庚申)</strong> is pure, uncompromising metal — the pillar of judges, athletes, and elite specialists who hold nothing back.</p>
<p>Knowing your specific pillar doesn't just tell you who you are. It tells you what you're here to <em>learn</em>.</p>

<h2 id="daily-life">4. Using Your Day Pillar in Real Life</h2>
<p>Yang Day Masters (Gab, Byeong, Mu, Gyeong, Im) are built to initiate, lead, and expand. They thrive in roles where they set the direction: founders, executives, independent practitioners. Yin Day Masters (Eul, Jeong, Gi, Sin, Gye) are built to refine, deepen, and sustain. They excel as experts, consultants, creatives, and healers.</p>
<p>When choosing a partner, look for someone whose elemental nature registers as your Direct Wealth (for men) or Direct Officer (for women) relative to your Day Master. This isn't a rigid rule—it's a starting point for understanding why some connections feel effortless and others take ongoing work.</p>

<h2 id="conclusion">5. The Bottom Line</h2>
<p>Your Day Pillar is the most honest mirror your Saju chart holds up. It doesn't tell you what will happen to you—it tells you <em>how you happen</em>. Understanding it is not about predicting the future. It's about living the present with clarity, choosing relationships with intention, and building a career that fits the energy you were born with rather than fighting against it.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/saju/lucky-element" style="text-decoration: underline; color: #f9d976;">[Read Next] Finding Your Lucky Element — The Key to Saju Balance</a></p>
  <p><a href="/en/saju/saju-spirits" style="text-decoration: underline; color: #f9d976;">[Read Next] Saju Stars Decoded — Why "Bad" Stars Are Often Your Greatest Asset</a></p>
</div>
</section>"""

# ════════════════════════════════════════════════════════════
# saju-spirits  contentKo
# ════════════════════════════════════════════════════════════
spirits_ko = """<section>
<p>사주 상담을 받고 돌아오는 사람들 중 상당수는 고개를 갸우뚱합니다. "도화살이 있다는데 제가 그렇게 바람기가 있나요?", "역마살이 있어서 평생 떠돌아야 한다고요?" 사실 이 질문들은 아직 '살(殺)'의 진짜 의미를 오해하고 있다는 증거입니다. 현대 명리학에서 살은 흉기가 아닙니다. 방향을 알려주는 나침반입니다.</p>

<h2 id="popular-spirits">1. 도화살(桃花殺) — 인기의 씨앗</h2>
<p>도화살은 복숭아꽃처럼 아름다움으로 사람을 끌어당기는 기운입니다. 과거에는 이를 '이성에 흔들리는 음란한 기운'으로 해석했습니다. 그 해석이 틀린 것은 아닙니다. 단지 불완전합니다.</p>
<p>도화살의 본질은 <strong>매력과 사랑받는 능력</strong>입니다. 연예인·인플루언서·세일즈 챔피언·마케터 중 도화살을 가진 사람의 비율이 유독 높은 것은 우연이 아닙니다. 대중의 시선을 끌고, 처음 만난 사람도 편안하게 만들며, 기억에 오래 남는 인상을 주는 것—그것이 도화살이 현대 사회에서 발휘하는 힘입니다.</p>
<p>다만 도화살이 지나치게 강하거나 흉신(凶神)과 결합하면 이성 문제나 스캔들로 이어질 수 있습니다. 핵심은 이 에너지를 <em>전문성과 결합</em>하는 것입니다. 매력을 직업으로 승화시킨 사람들이 도화살을 가장 잘 쓰는 사람들입니다.</p>

<h2 id="travel-spirits">2. 역마살(驛馬殺) — 세상을 무대로 삼는 에너지</h2>
<p>역마(驛馬)는 역참을 달리는 말, 즉 빠르고 끊임없이 이동하는 존재입니다. 조선시대라면 "한곳에 정착하지 못하고 평생 떠돈다"는 말이 불운이었겠지만, 글로벌 시대에 역마살은 <strong>최고의 비즈니스 자산</strong>이 됩니다.</p>
<p>해외영업·무역·항공·디지털 노마드·유튜브 여행 채널—이 모든 직업군에서 역마살은 성공의 엔진입니다. 역마살을 가진 사람이 한 도시, 한 회사, 한 루틴에 억지로 묶여 있으면 몸은 멀쩡해도 정신이 서서히 시들어갑니다. 반대로 움직임과 변화를 삶의 구조로 받아들이면, 에너지가 폭발적으로 살아납니다.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">🌟 내 사주에 숨겨진 신살 분석받기 →</a>
</div>

<h2 id="powerful-spirits">3. 백호살·괴강살 — 강한 자의 특권</h2>
<p>백호살(白虎殺)은 맹호(猛虎)의 기운, 괴강살(魁罡殺)은 하늘의 우두머리 별자리에서 온 기운입니다. 둘 다 에너지의 밀도가 보통 사주의 몇 배에 달합니다.</p>
<p>이 살들이 잘못 풀리면—즉, 적절한 출구 없이 억눌리면—사고, 폭발적 감정, 고립으로 나타납니다. 그러나 <strong>전문 직업(업상대체, 業上代替)</strong>으로 이 기운을 쓰면 이야기가 달라집니다. 외과의사, 검사, 소방관, 특수부대원, 격투기 선수, 위기 관리 전문가—이런 직업에서 백호·괴강의 기운은 누구도 못 따라올 경쟁력이 됩니다. 이 살이 있다면 "내가 왜 이렇게 강렬하게 살아야 하지?"라고 탓하지 마세요. 그 강도를 수용할 수 있는 직업과 환경을 설계하는 것이 답입니다.</p>

<h2 id="modern-application">4. 화개살·귀인살 — 내면의 깊이와 인복</h2>
<p>화개살(華蓋殺)은 종교·철학·예술과 깊이 연결된 살입니다. 화개살이 있는 사람은 세상의 소란에서 벗어나 혼자 있는 시간을 필요로 합니다. 이 시간이 충분히 주어질 때 천재적인 창조성이 발휘됩니다. 작가, 음악가, 수도자, 명상 지도자 중 화개살이 많은 것은 이 때문입니다.</p>
<p>귀인살(귀인의 기운)은 '어디를 가나 도와주는 사람을 만나는 복'입니다. 이 기운이 있는 사람은 의식적으로 인덕을 쌓는 노력—봉사, 베풀기, 먼저 다가가기—을 기울일 때 그 효과가 배가됩니다. 귀인의 기운은 받는 것이 아니라 먼저 주는 사람에게 더 강하게 작동합니다.</p>

<h2 id="conclusion">5. 살(殺)은 운명이 아니라 도구입니다</h2>
<p>신살을 이해하는 가장 성숙한 태도는 이것입니다: "이 에너지가 나에게 있다면, 나는 그것을 어떻게 설계할 것인가?" 도화살이 있으면 매력을 직업으로 만드세요. 역마살이 있으면 이동을 삶의 구조에 포함시키세요. 백호·괴강이 있으면 강도 높은 전문성이 요구되는 분야로 진입하세요. 화개살이 있으면 혼자 있는 시간을 죄책감 없이 가지세요.</p>
<p>사주의 살은 내 안에 있는 날카로운 도구입니다. 두려워하면 베이고, 숙련되면 세상을 조각합니다.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/saju/lucky-element" style="text-decoration: underline; color: #f9d976;">[관련글] 사주 용신 찾기 — 내 행운의 열쇠를 찾는 법</a></p>
  <p><a href="/ko/saju/day-pillar" style="text-decoration: underline; color: #f9d976;">[관련글] 일주 완전정복 — 나라는 사람의 설계도를 읽어라</a></p>
</div>
</section>"""

# ════════════════════════════════════════════════════════════
# saju-spirits  contentEn  (original)
# ════════════════════════════════════════════════════════════
spirits_en = """<section>
<p>The first time most Westerners encounter the concept of <em>Sal</em> (살) in Korean astrology, the reaction is usually the same: mild alarm. <em>"Peach Blossom Star? That sounds like a curse."</em> It isn't. The history of how these stars were interpreted—and misinterpreted—over centuries says more about social anxieties than it does about the actual energetic patterns these stars represent.</p>

<p>Here's the reframe that changes everything: <strong>every Sal is a description of concentrated energy, not a moral verdict.</strong> What you do with that energy is the story of your life.</p>

<h2 id="popular-spirits">1. The Peach Blossom Star (Dowa-Sal) — The Popularity Engine</h2>
<p>Dowa-Sal carries the energy of the peach blossom: beautiful, magnetic, impossible to ignore. Historically, it was associated with romantic recklessness. Today, it maps almost perfectly onto what modern culture calls <em>personal brand</em> and <em>charisma</em>.</p>
<p>Look at the careers of top influencers, television personalities, star salespeople, and brand ambassadors. An disproportionate number carry Dowa energy in their charts. The ability to walk into a room and change its temperature, to make strangers feel immediately at ease, to be remembered long after you've left—this is Dowa-Sal at work.</p>
<p>The traditional warning about romantic trouble isn't wrong. But it's incomplete. When Dowa energy is expressed through a professional channel—entertainment, marketing, public speaking, community building—the romantic volatility tends to stabilize. The energy finds its proper outlet.</p>

<h2 id="travel-spirits">2. The Traveling Horse Star (Yeokma-Sal) — Built for the Global Era</h2>
<p>In dynastic Korea, a life of constant travel was a hardship. Yeokma-Sal meant you couldn't put down roots, couldn't hold a stable position, couldn't be reliably present for your family. That framing made sense then. It makes almost no sense now.</p>
<p>In 2025, Yeokma energy describes the person who thrives in international business, remote work across time zones, frequent relocation, and constant environmental stimulation. Digital nomads, international salespeople, travel content creators, import-export specialists—these are Yeokma's modern champions. The "curse" of not being able to stay still is, in the right context, the superpower of being able to go anywhere.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">🌟 Discover Your Hidden Saju Stars →</a>
</div>

<h2 id="powerful-spirits">3. The White Tiger & Extreme Commander Stars — Power That Demands a Worthy Container</h2>
<p>Baekho-Sal (White Tiger) and Goegang-Sal (Extreme Commander) are the high-voltage stars of the Saju system. They don't do anything halfway. When this energy is expressed without a proper channel, it can manifest as accidents, explosive conflict, or self-destructive intensity.</p>
<p>But look at where this energy thrives: elite surgeons, prosecutors, special forces soldiers, competitive athletes, crisis managers, explosive growth entrepreneurs. The concept of <em>Eopsang-Daeche</em> (業上代替)—channeling dangerous energy through professional mastery—explains why so many high-performers in demanding fields carry these stars. The danger doesn't disappear. It becomes precision.</p>

<h2 id="modern-application">4. The Hidden Canopy & Noble Star — Depth and Invisible Support</h2>
<p>Hwagae-Sal (Hidden Canopy) is the star of solitude and spiritual depth. People who carry it need extended periods of privacy and reflection to do their best work. When this need is denied—by a busy social schedule, an open-plan office, constant demands—Hwagae energy turns inward and creates depression or creative paralysis. When honored, it produces extraordinary depth: novelists, composers, spiritual teachers, philosophers, therapists.</p>
<p>The Noble Star energy (Gwiin) describes a person who consistently attracts help, mentorship, and fortunate encounters. One insight that experienced practitioners share: this energy amplifies when you lead with generosity. The people with the strongest Noble Star in their chart are almost always those who habitually give first—advice, time, connections, joy—without keeping score.</p>

<h2 id="conclusion">5. The Final Word on Sal</h2>
<p>The most useful question when you learn you carry a particular Sal isn't <em>"Is this bad?"</em> It's <em>"What environment lets this energy work for me instead of against me?"</em></p>
<p>Dowa-Sal? Build a career that rewards your magnetism. Yeokma-Sal? Design a life with movement at its center. Baekho-Goegang? Enter a field that respects—and productively uses—raw intensity. Hwagae-Sal? Protect your solitude unapologetically and make the world richer with what you discover there.</p>
<p>Your Saju stars tell you the shape of your blade. You decide what you carve.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/saju/lucky-element" style="text-decoration: underline; color: #f9d976;">[Read Next] Finding Your Yongshin — The Element That Tips Your Chart Toward Fortune</a></p>
  <p><a href="/en/saju/day-pillar" style="text-decoration: underline; color: #f9d976;">[Read Next] The Day Pillar Decoded — Understanding Your Core Identity in Saju</a></p>
</div>
</section>"""

# ════════════════════════════════════════════════════════════
# lucky-element  contentKo
# ════════════════════════════════════════════════════════════
lucky_ko = """<section>
<p>명리학을 깊이 공부하다 보면 어느 순간 가장 중요한 질문 하나에 도달합니다. "내 사주에서 가장 필요한 기운은 무엇인가?" 그 대답이 바로 용신(用神)입니다. 용신은 사주의 불균형을 바로잡아주는 핵심 오행이며, 인생의 전성기를 만들어주는 결정적인 에너지입니다. 용신을 알면 직업, 색깔, 방향, 음식, 인간관계까지—삶의 거의 모든 선택에서 "나에게 유리한 방향"이 무엇인지 파악할 수 있습니다.</p>

<h2 id="yongshin-concept">1. 용신이란 무엇인가 — 사주 균형의 해결사</h2>
<p>사주팔자는 여덟 글자가 서로 힘을 겨루는 역동적인 시스템입니다. 어떤 오행은 너무 많아서 과잉이 되고, 어떤 오행은 너무 적어서 제 역할을 못 합니다. 이때 사주 전체를 중화(中和)로 이끄는 핵심 글자가 용신입니다.</p>
<p>비유하자면 이렇습니다. 사주가 너무 뜨거운 여름날 같다면, 시원한 水(물)가 용신입니다. 사주가 너무 차갑고 축축한 겨울 늪 같다면, 따뜻한 火(불)와 건조한 土(흙)가 용신이 됩니다. 사주가 금속으로만 가득 차 날카롭고 차갑다면, 이를 녹여줄 火(불) 또는 물 흘려보낼 水(물)가 용신의 역할을 합니다.</p>
<p>용신이 대운(大運)이나 세운(歲運)에서 들어올 때, 우리는 인생의 상승기를 경험합니다. 반대로 용신을 억누르는 기운이 들어오면 침체기가 옵니다. 이것이 명리학자들이 "10년 대운의 흐름을 보라"고 강조하는 이유입니다.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">💎 내 용신과 행운의 색상 무료 확인 →</a>
</div>

<h2 id="types-of-yongshin">2. 용신의 종류 — 억부·조후·통관·병약</h2>
<p>용신을 찾는 방법은 하나가 아닙니다. 사주의 성격에 따라 다양한 접근법이 있습니다.</p>
<h3>억부용신(抑扶用神): 힘의 균형을 맞춘다</h3>
<p>사주가 너무 강하면(신강) 그 에너지를 설기(泄氣)하거나 극(剋)하는 오행이 용신입니다. 반대로 사주가 너무 허약하면(신약) 나를 도와주는 인성(印星)이나 비겁(比劫)이 용신이 됩니다. 명리학 입문에서 가장 먼저 배우는 용신론이 바로 억부용신입니다.</p>
<h3>조후용신(調候用神): 온도를 조절한다</h3>
<p>겨울 한가운데 태어난 사람의 사주는 얼어붙은 강처럼 차갑습니다. 아무리 재물운이 좋아 보여도, 온도(조후)가 맞지 않으면 그 재물을 온전히 누리기 어렵습니다. 이때는 따뜻하게 녹여줄 화(火)와 토(土)가 조후용신입니다. 반대로 한여름의 뜨거운 사주에는 수(水)와 금(金)이 조후를 조절해 줍니다.</p>
<h3>통관용신(通關用神): 막힌 기운을 뚫는다</h3>
<p>두 기운이 서로 충돌하거나 대립해서 사주 전체가 막혀있을 때, 그 사이를 중재하여 기운이 흐르게 만드는 오행이 통관용신입니다. 예를 들어 목(木)과 금(金)이 심하게 충돌하는 사주라면, 그 사이를 흘러주는 수(水)나 화(火)가 통관의 역할을 할 수 있습니다.</p>
<h3>병약용신(病藥用神): 독을 약으로 다스린다</h3>
<p>사주에 특정 오행이 지나치게 과잉되어 '병(病)'이 되었을 때, 그 과잉을 직접 제어하는 오행이 '약(藥)', 즉 용신이 됩니다. 이 구조를 가진 사주는 병이 있는 만큼 용신이 들어왔을 때의 효과가 극적으로 나타납니다.</p>

<h2 id="practical-usage">3. 용신으로 개운하는 실전법</h2>
<p>용신이 무엇인지 알았다면, 그 에너지를 일상에 녹여 넣는 것이 개운의 시작입니다.</p>
<ul>
  <li><strong>목(木) 용신:</strong> 초록색 옷, 식물이 가득한 공간, 동쪽을 향한 책상. 숲에서 산책하는 것이 최고의 충전법.</li>
  <li><strong>화(火) 용신:</strong> 밝고 따뜻한 조명, 붉은색·주황색 포인트 소품. 사람이 많은 곳에 있는 것이 에너지를 끌어올린다.</li>
  <li><strong>토(土) 용신:</strong> 황토색·베이지 계열, 등산과 텃밭 가꾸기. 안정적이고 규칙적인 생활 루틴이 행운을 부른다.</li>
  <li><strong>금(金) 용신:</strong> 흰색·실버 계열, 금속 소품. 공간 정리와 미니멀 라이프가 기운을 정돈해 준다.</li>
  <li><strong>수(水) 용신:</strong> 검정·네이비 계열, 수族관·분수가 있는 공간. 깊이 사색하는 시간과 충분한 수분 섭취가 도움이 된다.</li>
</ul>
<p>또한 용신 오행을 자연스럽게 지닌 파트너, 친구, 멘토와 가까이 지내는 것도 매우 효과적인 개운법입니다.</p>

<h2 id="conclusion">4. 용신은 찾는 것이 아니라 이미 씨앗으로 존재한다</h2>
<p>용신은 외부에서 수입해 오는 것이 아닙니다. 당신의 사주 원국 안에 이미 그 씨앗이 들어있습니다. 다만 환경이 맞지 않아 발아하지 못하고 있을 뿐입니다. 용신에 맞는 색깔, 방향, 직업, 관계를 선택하는 것은 그 씨앗에 물을 주는 행위입니다.</p>
<p>사주를 공부하는 궁극적인 목적은 운명에 순응하는 것이 아니라, 내가 가진 에너지를 가장 잘 활용하는 방식으로 삶을 설계하는 것입니다. 용신을 안다는 것은 그 설계의 가장 강력한 레버를 손에 쥐는 것입니다.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/saju/day-pillar" style="text-decoration: underline; color: #f9d976;">[관련글] 일주 완전정복 — 나라는 사람의 본질을 읽는 법</a></p>
  <p><a href="/ko/saju/intro" style="text-decoration: underline; color: #f9d976;">[관련글] 사주팔자 입문 — 음양오행과 사주의 구조 완벽 해설</a></p>
</div>
</section>"""

# ════════════════════════════════════════════════════════════
# lucky-element  contentEn  (original)
# ════════════════════════════════════════════════════════════
lucky_en = """<section>
<p>There's a moment in every serious student of Korean astrology when the question shifts from <em>"what does my chart say?"</em> to <em>"what should I do about it?"</em> That's the moment you're ready to understand <strong>Yongshin</strong> (用神)—the beneficial element.</p>

<p>Yongshin is the single element—Wood, Fire, Earth, Metal, or Water—that your chart most needs in order to find balance. Not the element you like, or the one that sounds good to you. The one the chart itself is reaching for. When that element enters your life—through your environment, your career, your relationships, your 10-year luck cycle—things start to work. When the opposing element floods in, things stall.</p>

<h2 id="yongshin-concept">1. Why Balance Matters More Than Strength</h2>
<p>A common misconception: having more of a powerful element makes you luckier. It doesn't. A chart dominated by Metal, with no Water to channel its sharpness or Wood to give it purpose, produces rigidity, conflict, and exhaustion—regardless of how impressive those Metal qualities might look on paper.</p>
<p>What Saju practitioners are actually looking for is <em>Junghwa</em> (中和)—dynamic equilibrium. Not a flat, boring balance, but an active one where each element has room to express itself without suppressing the others. Yongshin is the keystone that holds this equilibrium. When your Yongshin is present and active, everything else in the chart performs better.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">💎 Identify Your Lucky Element Now →</a>
</div>

<h2 id="types-of-yongshin">2. Four Ways to Find Your Beneficial Element</h2>
<h3>Strength Balancing (Eokbu)</h3>
<p>This is the foundational approach. If your chart is strong—packed with elements supporting your Day Master—you need something to drain or control that excess. If your chart is weak—your Day Master is isolated and depleted—you need elements that feed and support you. Simple in principle, nuanced in practice, because strength is measured not just by quantity but by seasonal context, the positions of heavenly stems and earthly branches, and hidden stems within each pillar.</p>

<h3>Temperature Calibration (Johu)</h3>
<p>This approach says: before anything else, a person needs to be thermally comfortable. A chart born in the coldest month of winter, piled with Water and Metal, is functionally frozen—no matter how intelligent or capable the person is, the cold prevents them from fully expressing their potential. Fire and Earth (warmth and dryness) become the priority. A scorching summer chart needs Water and Metal to cool and sharpen it. Temperature calibration often supersedes strength balancing in importance, particularly for charts born in extreme seasonal conditions.</p>

<h3>Bridge Building (Tongwan)</h3>
<p>Some charts are locked in an elemental standoff: Metal and Wood clashing relentlessly, or Fire and Water in perpetual opposition, leaving the Day Master stuck between two warring factions. The Bridge element doesn't take sides—it mediates, connecting the opposing forces and allowing energy to flow again. This is a sophisticated diagnosis and one of the reasons experienced practitioners often recommend professional consultation rather than self-analysis.</p>

<h3>Antidote Approach (Byeongnyak)</h3>
<p>When one element is so dominant that it becomes a <em>disease</em> in the chart—overwhelming everything else—the cure is a targeted antidote. Charts with this structure often have colorful, intense life stories. The disease makes everything more extreme. But when the right antidote enters through a luck cycle or annual influence, the transformation can be dramatic and fast.</p>

<h2 id="practical-usage">3. Living With Your Yongshin: Practical Adjustments</h2>
<p>Once you know your beneficial element, you can make intentional, low-effort shifts that keep your chart's energy aligned:</p>
<ul>
  <li><strong>Wood Yongshin:</strong> Surround yourself with living plants. Spend time in forests. Wear green. Face East. Choose careers in growth industries—startups, education, healthcare, sustainability.</li>
  <li><strong>Fire Yongshin:</strong> Maximize natural light. Cultivate a warm social life. Wear red, orange, and coral. Face South. Gravitate toward visibility—leadership, performance, brand-facing roles.</li>
  <li><strong>Earth Yongshin:</strong> Develop regularity and routine. Spend time in gardens or mountains. Wear earth tones. Choose stable, trust-based industries—real estate, finance, hospitality.</li>
  <li><strong>Metal Yongshin:</strong> Practice minimalism—clear space creates clear thinking. Wear white and silver. Face West. Choose precision-based careers—law, medicine, engineering, finance.</li>
  <li><strong>Water Yongshin:</strong> Protect your thinking time. Be near water—rivers, oceans, rain. Wear navy and black. Face North. Thrive in knowledge-intensive or creative work that rewards depth.</li>
</ul>
<p>Perhaps more powerful than any physical adjustment: surrounding yourself with people who naturally embody your Yongshin element. The right collaborator, partner, or mentor can functionally supply what your chart is missing.</p>

<h2 id="conclusion">4. The Bigger Picture</h2>
<p>Yongshin is not a magic solution. It's a diagnostic framework that helps you understand where your energy wants to go and where it gets blocked. The goal isn't to manufacture luck from scratch. It's to stop unconsciously working against your own chart—choosing environments, relationships, and careers that drain your specific elemental needs rather than feeding them.</p>
<p>When you align your life with your Yongshin, you don't suddenly become invincible. You become more <em>coherent</em>. Your strengths start pointing in the same direction. The right opportunities begin to feel obvious rather than elusive. That's the real promise of understanding your beneficial element.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/saju/day-pillar" style="text-decoration: underline; color: #f9d976;">[Read Next] The Day Pillar Explained — Your Identity, Your Marriage, Your Blueprint</a></p>
  <p><a href="/en/saju/intro" style="text-decoration: underline; color: #f9d976;">[Read Next] Saju-Palja 101 — A Complete Beginner's Guide to Korean Astrology</a></p>
</div>
</section>"""

# Apply all replacements
content = replace_field(content, 'day-pillar', 'contentKo', day_pillar_ko)
content = replace_field(content, 'day-pillar', 'contentEn', day_pillar_en)
content = replace_field(content, 'saju-spirits', 'contentKo', spirits_ko)
content = replace_field(content, 'saju-spirits', 'contentEn', spirits_en)
content = replace_field(content, 'lucky-element', 'contentKo', lucky_ko)
content = replace_field(content, 'lucky-element', 'contentEn', lucky_en)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('All done.')
