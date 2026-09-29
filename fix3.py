# -*- coding: utf-8 -*-
path = r'c:\Users\홈_메인\Desktop\11  11 실전코딩\sajupalza\lib\blog\saju-posts.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

def replace_field(content, slug, field, new_value):
    slug_idx = content.find(f"slug: '{slug}'")
    if slug_idx < 0:
        print(f"SLUG NOT FOUND: {slug}"); return content
    field_start = content.find(f"    {field}: `", slug_idx)
    if field_start < 0:
        print(f"FIELD NOT FOUND: {field} in {slug}"); return content
    bt_open = content.find('`', field_start + len(f"    {field}: "))
    bt_close = content.find('\n    `', bt_open + 1)
    if bt_close < 0:
        print(f"CLOSING BT NOT FOUND for {field} in {slug}"); return content
    old = content[bt_open+1:bt_close]
    content = content[:bt_open+1] + '\n' + new_value + '\n' + content[bt_close:]
    print(f"OK: {slug}.{field} ({len(old)} -> {len(new_value)})")
    return content

# ── void-luck contentKo ──────────────────────────────────────
void_ko = """<section>
<p>사주 상담에서 가장 많은 관심을 받는 개념 중 하나가 공망(空亡)입니다. "재물궁이 공망이라 돈을 못 번대요", "배우자 자리가 공망이어서 결혼이 힘들대요"—이런 말들이 사람들을 불안하게 만들곤 합니다. 그런데 정말 그럴까요? 공망은 저주가 아닙니다. 오히려 제대로 이해하면 인생에서 가장 강력한 에너지원이 될 수 있습니다.</p>

<h2 id="gongmang-concept">1. 공망이란 무엇인가 — 수학적 여백, 철학적 의미</h2>
<p>공망은 수학적으로 간단합니다. 천간(天干) 10개와 지지(地支) 12개가 짝을 지을 때, 남는 두 지지가 바로 공망입니다. 갑자(甲子)에서 시작되는 갑자순(甲子旬)에서는 술(戌)과 해(亥)가 남아 공망이 됩니다. 이 짝 없는 두 글자가 사주의 어느 자리에 있느냐에 따라 해석이 달라집니다.</p>
<p>공망의 핵심 성질은 두 가지입니다. 첫째, 해당 글자가 제 힘을 100% 발휘하지 못한다. 둘째, 그 자리에 대한 갈망과 집착이 강해진다. 재성(財星)이 공망이면 돈을 갈망하지만 손에 잡히지 않는 느낌이 들고, 관성이 공망이면 명예와 직위에 집착하지만 조직 안에서 답답함을 느낍니다. 이 역설이 공망의 본질입니다.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">🔍 내 사주의 공망 위치 무료 확인 →</a>
</div>

<h2 id="types-of-gongmang">2. 자리별 공망 해석 — 어디가 비어 있는가</h2>
<h3>재성공망 — 돈보다 의미를 쫓는 삶</h3>
<p>재성이 공망인 사람은 돈 자체를 목표로 할 때 오히려 돈이 빠져나갑니다. 이들에게 가장 효과적인 재물 축적 방식은 돈을 쫓는 것이 아니라 재능과 가치를 쏟아붓는 것입니다. 예술가, 철학자, 사회적 기업가 중 재성공망을 가진 사람이 많은 것도 이 때문입니다. 방향을 바꾸면 오히려 풍요가 따라옵니다.</p>
<h3>관성공망 — 조직보다 자유를 선택해야 할 운명</h3>
<p>관성이 공망인 사람은 일반적인 직장 체계에서 답답함과 무력감을 느끼기 쉽습니다. 승진 경쟁이 치열한 대기업보다는 독립적인 전문직, 창업, 혹은 예술적 활동에서 진가를 발휘합니다. 회사가 나를 안 알아준다고 좌절하지 마세요—시스템 밖에서 더 빛나는 사람이 있습니다.</p>
<h3>인성공망 — 학벌보다 실전 경험으로 성장</h3>
<p>인성(기초 학습 능력, 어머니)이 공망인 사람은 정규 교육보다 현장 경험을 통해 더 빠르게 성장합니다. 학교 성적이 잠재력의 전부가 아님을 인식하고, 일찍부터 실전에 뛰어드는 전략을 선택하세요.</p>

<h2 id="remedies">3. 공망을 복으로 바꾸는 실전 개운법</h2>
<p>공망을 다스리는 가장 강력한 방법은 역설적입니다: <strong>채우려 하지 말고 비워라.</strong></p>
<p>재성공망이라면 일정 소득을 의도적으로 기부하거나 봉사에 씁니다. 관성공망이라면 명예와 직위에 대한 집착을 내려놓고 실력 자체를 쌓습니다. 비움의 실천이 역설적으로 해당 영역을 채워주는 원리가 공망의 핵심입니다.</p>
<p>또한 공망은 대운에서 합(合)이 들어올 때 해소됩니다. 이 시기에는 공망 자리가 살아나며 그간 막혀있던 운이 폭발적으로 열립니다. 이 시기를 미리 알고 대비하는 것이 명리학 공부의 실질적 가치입니다.</p>

<h2 id="philosophy">4. 공망의 철학 — 비어 있음이 가능성이다</h2>
<p>노자는 말했습니다. "당(當) — 그릇의 쓸모는 그 비어 있음에 있다." 공망은 채워지지 않는 저주가 아니라, 남들이 갖지 못한 특별한 여백입니다. 그 공간이 있기에 더 깊은 갈망이 생기고, 더 치열한 탐구가 이루어집니다. 역사상 위대한 예술가·철학자·영적 지도자 중 공망을 가진 사람이 유독 많은 것은 우연이 아닙니다.</p>
<p>당신의 공망 자리는 평생의 숙제인 동시에, 가장 깊은 재능이 숨은 곳입니다.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/saju/lucky-element" style="text-decoration: underline; color: #f9d976;">[관련글] 사주 용신 찾기 — 부족한 기운을 채우는 실전법</a></p>
  <p><a href="/ko/saju/day-pillar" style="text-decoration: underline; color: #f9d976;">[관련글] 일주 완전정복 — 일간과 일지로 읽는 나의 본질</a></p>
</div>
</section>"""

# ── void-luck contentEn ──────────────────────────────────────
void_en = """<section>
<p>Of all the concepts in Korean astrology that unsettle people, few generate more anxiety than Gongmang—the Void. Tell someone their wealth sector is in Gongmang and watch them pale. Tell them their marriage palace is voided and they'll ask if they're destined to be alone. The dramatic framing isn't entirely wrong, but it's missing the most important part of the story.</p>

<h2 id="gongmang-concept">1. The Void, Mathematically and Philosophically</h2>
<p>The mechanics are elegant. Ten Heavenly Stems pair with twelve Earthly Branches in rotating cycles of sixty. But ten doesn't divide evenly into twelve—which means in every sixty-year cycle, two Earthly Branches are left without a partner. Those two branches become Gongmang. Their positions within your chart determine which area of life feels perpetually just out of reach.</p>
<p>The psychological signature of Gongmang is consistent: an intense longing for the voided domain, combined with a persistent feeling that no matter how much you pursue it, something fundamental remains missing. Wealth Gongmang doesn't prevent earning money—it creates a particular relationship with money where satisfaction proves elusive. Career Gongmang doesn't prevent professional achievement—it makes conventional organizational structures feel like ill-fitting clothes.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">🔍 Find Your Gongmang & What It Means →</a>
</div>

<h2 id="types-of-gongmang">2. Reading the Void by Position</h2>
<h3>Wealth Gongmang — Meaning Over Money</h3>
<p>People with voided Wealth tend to experience a paradox: the harder they chase money as a primary goal, the more it eludes them. But when they redirect their energy toward meaningful work—creating genuine value, solving real problems, building things that matter—financial reward follows almost as a byproduct. Many of history's most celebrated artists, social entrepreneurs, and philanthropists show Wealth Gongmang in their charts. The pattern isn't poverty; it's a particular pathway to prosperity.</p>
<h3>Career Gongmang — Freedom Over Status</h3>
<p>Conventional career structures often feel airless to someone with Career (Gwanseong) Gongmang. The pursuit of promotions within rigid hierarchies produces frustration rather than fulfillment. The more natural path points toward independence: specialized expertise, entrepreneurship, or creative fields where the rules can be rewritten. This isn't a limitation—it's a signal about the environment where you'll actually thrive.</p>

<h2 id="remedies">3. Working With the Void</h2>
<p>The counterintuitive insight at the heart of Gongmang practice: <strong>the void fills when you stop trying to fill it.</strong> Deliberately releasing attachment to the voided domain—giving money away, relinquishing status ambitions, letting go of the need for external validation in that specific area—paradoxically creates the conditions for that domain to flourish.</p>
<p>There's also a timing dimension. When a harmonizing element (Hap) enters through a major or annual luck cycle, the Gongmang is temporarily lifted. These windows are among the most consequential periods in a person's life—opportunities that were previously blocked suddenly become accessible. Identifying these windows in advance is one of the most practically useful things a Saju reading can offer.</p>

<h2 id="philosophy">4. The Philosophical Reframe</h2>
<p>Laozi observed that the usefulness of a vessel comes from its emptiness. Gongmang might be the Saju system's most direct expression of this principle. The void isn't a defect in the design—it is the design. It creates a hunger that drives exploration, a gap that invites depth, an absence that becomes the source of something genuinely original.</p>
<p>The people who achieve something lasting in the domain of their Gongmang are often those who stopped fighting the void and started understanding what it was asking them to become.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/saju/lucky-element" style="text-decoration: underline; color: #f9d976;">[Read Next] Finding Your Yongshin — Filling the Real Gaps in Your Chart</a></p>
  <p><a href="/en/saju/day-pillar" style="text-decoration: underline; color: #f9d976;">[Read Next] The Day Pillar — Your Core Identity in Korean Astrology</a></p>
</div>
</section>"""

# ── career-star contentKo ────────────────────────────────────
career_ko = """<section>
<p>"내가 이 일을 계속해야 할까?", "언제쯤 더 좋은 기회가 올까?"—인생을 살면서 누구나 한 번쯤 이런 질문을 합니다. 사주 명리학은 이 질문에 놀랍도록 구체적인 답을 줄 수 있습니다. 관성(官星)이라는 개념을 통해 내가 어떤 형태의 일에서 두각을 나타내는지, 그리고 언제 커리어의 전환점이 찾아오는지를 읽어낼 수 있기 때문입니다.</p>

<h2 id="gwanseong-meaning">1. 관성(官星)이란 — 직업운의 핵심 코드</h2>
<p>관성은 나를 제어하는 기운이자, 사회가 나를 인정하는 방식입니다. 일간(나)을 극(剋)하는 오행이 관성이 되며, 이것이 음양에 따라 정관(正官)과 편관(偏官)으로 나뉩니다.</p>
<h3>정관(正官) — 신뢰와 원칙의 리더</h3>
<p>정관은 규칙과 질서를 중시하는 기운입니다. 정관이 발달한 사람은 공무원, 대기업 간부, 법조인, 교사처럼 사회적으로 인정받는 안정된 구조 안에서 탁월한 능력을 발휘합니다. 신뢰를 기반으로 천천히 그러나 확실하게 올라가는 커리어 패턴을 가집니다. 이 사람들에게 '정도(正道)'를 걷는 것은 원칙이 아니라 본능입니다.</p>
<h3>편관(偏官) — 도전과 카리스마의 전문가</h3>
<p>편관은 강렬하고 날카롭습니다. 경찰·군인·소방관·외과의사·특수 엔지니어처럼 긴장감 높고 결단력이 필요한 직군에서 자신의 진가를 발휘합니다. 또한 CEO, 프리랜서, 선구적인 창업가처럼 자신만의 규칙을 만드는 역할에서도 두각을 나타냅니다. 편관이 강한 사람이 일반 사무직에 배치되면 이 에너지가 어긋나 조직 내 마찰을 일으킬 수 있습니다.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">💼 내 사주로 천직 무료 분석받기 →</a>
</div>

<h2 id="ohaeng-career">2. 오행별 천직 가이드</h2>
<p>관성만이 아니라 일간의 오행 자체도 직업 적성을 결정합니다.</p>
<ul>
  <li><strong>목(木) 기운:</strong> 성장·교육·의료·환경·스타트업. 무언가를 키우고 자라게 하는 일이 천직입니다.</li>
  <li><strong>화(火) 기운:</strong> IT·미디어·마케팅·엔터테인먼트·강연. 에너지와 전파력을 직업으로 삼습니다.</li>
  <li><strong>토(土) 기운:</strong> 부동산·금융·요식업·농업·인사관리. 안정과 신뢰를 기반으로 한 분야에서 진가를 발휘합니다.</li>
  <li><strong>금(金) 기운:</strong> 법조·경찰·군대·제조·금융분석·외과. 날카로운 판단력이 빛나는 곳이 최적입니다.</li>
  <li><strong>수(水) 기운:</strong> 기획·연구·철학·예술·컨설팅·IT 개발. 깊은 사유와 아이디어가 무기입니다.</li>
</ul>

<h2 id="success-timing">3. 취업·승진·이직의 최적 타이밍</h2>
<p>실력은 준비이고, 타이밍은 기회입니다. 아무리 능력이 있어도 운의 흐름이 닫혀 있을 때 억지로 나서면 소진됩니다. 반대로 운이 열리는 시기에는 작은 시도도 큰 결과로 이어집니다.</p>
<p>관성이 용신(用神)인 사람은 10년 대운에서 관성 운이 들어올 때 커리어의 최전성기를 맞습니다. 또한 매년 세운(歲運)에서 일간과 합(合)을 이루는 해에는 이직·승진·인정의 기회가 찾아옵니다. 이 시기를 미리 파악하고 역량을 집중 준비하는 것이 성공 확률을 극적으로 높입니다.</p>

<h2 id="conclusion">4. 결론 — 나에게 맞는 무대를 선택하라</h2>
<p>가장 고통스러운 직장생활은 내 에너지와 전혀 맞지 않는 환경에서 억지로 버티는 것입니다. 사주는 단순히 어떤 직업이 좋다고 지정해 주는 도구가 아닙니다. 내가 어떤 환경에서 자연스럽게 빛나는지, 어떤 방식으로 일할 때 지속 가능한 에너지가 나오는지를 알려주는 나침반입니다. 그 나침반이 가리키는 방향으로 한 발 내딛어 보세요.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/saju/day-pillar" style="text-decoration: underline; color: #f9d976;">[관련글] 일주 완전정복 — 일간 기질로 보는 나의 핵심 재능</a></p>
  <p><a href="/ko/saju/lucky-element" style="text-decoration: underline; color: #f9d976;">[관련글] 사주 용신 찾기 — 성공 시기를 앞당기는 행운의 에너지</a></p>
</div>
</section>"""

# ── career-star contentEn ────────────────────────────────────
career_en = """<section>
<p>Most career advice is generic because it has to be. "Follow your passion." "Play to your strengths." "Network relentlessly." These aren't wrong—they're just incomplete. They don't account for the specific energetic configuration you were born with, or the particular timing windows when your effort is most likely to compound into results.</p>
<p>Korean astrology offers a more precise lens: the <strong>Gwanseong</strong> (官星), or Career Star. Understanding it doesn't tell you exactly which job to take. It tells you something considerably more useful—the shape of work that naturally suits your energy, and when the universe is most likely to respond to your moves.</p>

<h2 id="gwanseong-meaning">1. What Gwanseong Actually Means</h2>
<p>Gwanseong is the elemental force that regulates your Day Master. It represents external authority, social recognition, and the structures through which the world acknowledges your contribution. It divides into two expressions:</p>
<h3>Direct Officer (Jeonggwan) — The Institutional Builder</h3>
<p>Jeonggwan people are natural insiders. They understand and respect the logic of institutions—why rules exist, how hierarchies function, what it takes to build durable organizations. Government service, law, education, corporate management: these environments reward the Jeonggwan temperament because they value exactly what Jeonggwan does well: consistency, principle, and the long game. Their career arcs are usually slower but more stable—each step earned, each position held.</p>
<h3>Seven Killings (Pyeongwan) — The Edge Specialist</h3>
<p>Pyeongwan energy is more combustible. It doesn't do well within rigid structures that weren't designed with its intensity in mind. But in the right context—high-stakes, high-consequence, results-oriented environments—it's extraordinary. Elite surgeons, military officers, prosecutors, emergency responders, and certain categories of founders all frequently show strong Pyeongwan. The energy doesn't tolerate mediocrity in itself or others, which is both its power and its friction point.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">💼 Get Your Career Path Analysis →</a>
</div>

<h2 id="ohaeng-career">2. Career Fit by Five Elements</h2>
<p>Beyond Gwanseong, your Day Master's element points toward industries where your energy is most likely to find its natural expression:</p>
<ul>
  <li><strong>Wood:</strong> Education, healthcare, sustainability, early-stage startups, coaching. You grow things.</li>
  <li><strong>Fire:</strong> Media, marketing, entertainment, technology, public speaking. You energize and illuminate.</li>
  <li><strong>Earth:</strong> Real estate, finance, hospitality, supply chain, human resources. You stabilize and sustain.</li>
  <li><strong>Metal:</strong> Law, engineering, quality assurance, surgery, finance. You cut through complexity with precision.</li>
  <li><strong>Water:</strong> Research, strategy, writing, consulting, software development. You think in depth and generate flow.</li>
</ul>

<h2 id="success-timing">3. When to Make Your Move</h2>
<p>Timing in career, as in most things, is underrated. The same action taken at different points in a luck cycle produces dramatically different results. In Saju, the 10-year major cycles (Daewun) and annual luck years (Saewun) create windows when career opportunities become unusually accessible—and other periods when pushing hard against a closed door only depletes you.</p>
<p>If Gwanseong is your beneficial element, the years when that element dominates your chart are the ones to act boldly: apply for the ambitious role, launch the project, make the ask. If Gwanseong is your pressure point rather than your ally, those same years require careful navigation—being strategic rather than aggressive, building foundations rather than seeking immediate recognition.</p>

<h2 id="conclusion">4. The Right Stage for Your Energy</h2>
<p>The worst professional suffering usually comes not from lack of ability but from fundamental misalignment—when someone with Pyeongwan energy has been trapped in a Jeonggwan world for a decade, or when a genuinely institutional person has been pressured into the chaos of entrepreneurship before they were ready.</p>
<p>Understanding your Gwanseong and elemental profile doesn't guarantee career success. But it dramatically improves your odds of choosing environments where your specific kind of effort is actually rewarded—which is the closest thing to a genuine career advantage that self-knowledge provides.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/saju/day-pillar" style="text-decoration: underline; color: #f9d976;">[Read Next] The Day Pillar — Understanding Your Core Talent and Energy</a></p>
  <p><a href="/en/saju/lucky-element" style="text-decoration: underline; color: #f9d976;">[Read Next] Finding Your Yongshin — Timing Your Career Peak</a></p>
</div>
</section>"""

content = replace_field(content, 'void-luck', 'contentKo', void_ko)
content = replace_field(content, 'void-luck', 'contentEn', void_en)
content = replace_field(content, 'career-star', 'contentKo', career_ko)
content = replace_field(content, 'career-star', 'contentEn', career_en)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done.')
