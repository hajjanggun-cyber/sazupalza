# -*- coding: utf-8 -*-
path = r'c:\Users\홈_메인\Desktop\11  11 실전코딩\sajupalza\lib\blog\seongmyeong-posts.ts'
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

# ── name-change contentKo ────────────────────────────────────
change_ko = """<section>
<p>살다 보면 '내 이름이 나를 막고 있는 건 아닐까?'라는 생각이 드는 순간이 있습니다. 하는 일마다 꼬이고, 건강이 예전 같지 않고, 좋은 기회가 왔다 싶으면 놓치고—이런 패턴이 반복될 때 개명(改名)은 한 번쯤 진지하게 고려할 만한 선택입니다. 성명학적으로 잘못 설계된 이름은 사주의 좋은 기운을 억누르고, 불필요한 장애물을 만들어냅니다. 반대로 올바른 이름으로 개명하면 심리적 자신감이 높아지고, 에너지의 흐름이 달라집니다.</p>

<h2 id="when-to-change">1. 개명을 진지하게 고려해야 할 3가지 징후</h2>
<p>모든 불운이 이름 때문은 아닙니다. 하지만 성명학 분석에서 다음 세 가지가 확인된다면 개명을 통한 개운(開運)이 실질적으로 도움이 됩니다.</p>
<h3>① 이름이 사주의 용신을 극(剋)하고 있을 때</h3>
<p>사주에서 가장 필요한 기운인 용신이 이름의 소리오행이나 한자 자원오행에 의해 억눌리고 있다면, 아무리 노력해도 결실이 반감됩니다. 예를 들어 용신이 목(木)인데 이름에 금(金) 기운이 강하면 금극목(金剋木)의 구조가 되어 이름이 운을 막는 형국이 됩니다.</p>
<h3>② 수리81수에서 핵심 격(格)이 흉수일 때</h3>
<p>이름의 핵심인 형격(亨格, 사회적 성공의 토대)이나 총운인 정격(貞格)이 지속적인 좌절이나 건강 문제를 상징하는 흉수라면, 이름 자체가 삶의 흐름에 저항을 만들어내고 있을 가능성이 높습니다. 9, 10, 19, 20, 34 등은 특히 주의가 필요한 수리입니다.</p>
<h3>③ 심리적·사회적으로 이름이 걸림돌이 될 때</h3>
<p>이름으로 인해 무의식적으로 자신감이 낮아지거나, 첫인상에서 손해를 보거나, 발음이 어려워 자꾸 틀리게 불리는 경우—이름이 심리적으로 에너지를 위축시킵니다. 자신감과 첫인상은 성공의 핵심 요소이므로, 이 부분을 가볍게 봐서는 안 됩니다.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">💎 개명 전 이름 정밀 진단받기 →</a>
</div>

<h2 id="naming-process">2. 운을 바꾸는 개명 — 어떻게 준비해야 할까</h2>
<p>개명은 단순히 마음에 드는 이름을 선택하는 것이 아닙니다. 현재 사주에서 부족한 기운을 정밀 분석한 뒤, 소리오행·수리획수·자원오행이 모두 사주와 조화를 이루는 이름을 새롭게 설계하는 과정입니다.</p>
<h3>전문가 분석 → 후보 이름 선정 → 검증</h3>
<p>먼저 사주 분석으로 용신과 희신을 확정합니다. 그 기운을 소리와 획수와 한자 의미로 동시에 담아낼 후보군을 만들고, 최종적으로 소리오행 상생, 4격 길수, 의미의 깊이를 모두 검증한 이름을 확정합니다.</p>
<h3>내면 정착 기간</h3>
<p>새 이름의 기운이 내 몸과 마음에 스며드는 데는 시간이 필요합니다. 법적 개명 전이라도 새 이름으로 불리는 연습을 하고, 스스로도 새 이름으로 부르는 환경을 만드세요. 이름에 익숙해질수록 그 진동이 실제 운에 미치는 영향은 커집니다.</p>

<h2 id="after-change">3. 개명 후 운을 내 것으로 만드는 법</h2>
<p>개명 후 운이 바뀌기를 수동적으로 기다리는 것은 반쪽짜리 개운입니다. 새 이름의 기운과 일치하는 삶의 방식을 능동적으로 선택해야 합니다.</p>
<ul>
  <li>새 이름이 목(木) 기운을 담고 있다면 — 성장·교육·창의적 활동에 에너지를 투자하세요.</li>
  <li>화(火) 기운의 이름이라면 — 사람들과 적극적으로 소통하고 자신을 표현하는 기회를 늘리세요.</li>
  <li>금(金) 기운의 이름이라면 — 원칙과 기준을 명확히 하고, 전문성을 쌓는 데 집중하세요.</li>
</ul>
<p>이름의 기운과 삶의 방향이 일치할 때, 개명의 효과는 두 배 이상으로 증폭됩니다.</p>

<h2 id="conclusion">4. 결론 — 이름은 바꿀 수 있는 운명이다</h2>
<p>사주는 바꿀 수 없지만 이름은 선택할 수 있습니다. 개명은 당신이 자신의 삶을 더 적극적으로 설계하겠다는 선언입니다. 단 충동적인 결정보다는 사주 분석과 성명학 전문 진단을 바탕으로 한 신중한 결정을 권합니다. 제대로 지어진 새 이름은 당신 인생의 2막을 여는 가장 강력한 도구가 될 수 있습니다.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/seongmyeong/numerology-81" style="text-decoration: underline; color: #f9d976;">[관련글] 개명 전 필독! 수리81수 총정리 — 이름의 길수와 흉수</a></p>
  <p><a href="/ko/seongmyeong/name-creation" style="text-decoration: underline; color: #f9d976;">[관련글] 작명의 기술 — 사주 용신을 이름에 담는 전문 작명법</a></p>
</div>
</section>"""

# ── name-change contentEn ────────────────────────────────────
change_en = """<section>
<p>There's a particular kind of professional frustration that's hard to explain. You're competent. You work hard. The opportunities come and somehow don't quite materialize. The connections feel slightly more effortful than they should. You can't point to a single cause, but the pattern is consistent. Korean name analysis (Seongmyeonghak) offers one possible explanation that most Western frameworks don't consider: your name itself might be generating friction.</p>
<p>This isn't superstition. It's a systematic analysis of whether the elemental energies embedded in your name's sounds and stroke counts are aligned with—or actively working against—the elemental configuration you were born with. When they're misaligned, the result is a constant low-level headwind that compounds over years. A well-executed name change removes that headwind.</p>

<h2 id="when-to-change">1. Three Indicators That a Name Change Is Worth Considering</h2>
<h3>Your Name Suppresses Your Beneficial Element</h3>
<p>Every Saju chart has a Yongshin—the specific elemental force that most powerfully tips the chart toward favorable outcomes. If the sound elements in your name carry energy that controls or exhausts your Yongshin, the name is actively working against your chart's potential. The metaphor practitioners use: wings attached backward. The effort goes in, but the lift doesn't come. This is the most important contraindication in name analysis.</p>
<h3>Core Numerological Patterns Are Inauspicious</h3>
<p>The Hyeong-gyeok (the stroke total governing your primary success period) and Jeong-gyeok (your overall life total) are the two most significant numerological positions. Numbers like 9, 10, 19, 20, and 34 in these positions are associated—across generations of statistical observation—with patterns of frustrated effort, health disruptions, and recurring loss just before completion. If these appear in both positions simultaneously, the name's structural foundation warrants serious examination.</p>
<h3>Psychological and Social Friction</h3>
<p>Names affect how we feel about ourselves and how others respond to us. Research is clear on this. A name that creates persistent mispronunciation, carries unwanted associations, or simply doesn't feel like an accurate representation of who you've become erodes confidence at the margins—in every introduction, every professional context. That marginal erosion accumulates. It's not a small thing.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">💎 Get a Detailed Name Change Consultation →</a>
</div>

<h2 id="naming-process">2. Designing a Better Name</h2>
<p>A name change done carelessly is no better than the original problem. The process should follow the same rigorous analysis as a birth naming: start with the Saju chart, identify the Yongshin and supporting elements, then design a name that embeds those energies across all three channels—sound, stroke count, and character meaning—simultaneously.</p>
<p>The benchmark: after analysis, you should be able to explain precisely why each character was chosen, what elemental energy it contributes, which numerological pattern it creates, and how the sound sequence flows. If the practitioner can't explain this in specific terms, the naming hasn't been done rigorously.</p>

<h2 id="after-change">3. Making the New Name Work</h2>
<p>The energy of a new name doesn't activate instantly. It needs to be inhabited. Start using the new name in informal contexts before legal registration—introduce yourself with it, sign emails with it, ask close friends to use it. The more frequently the new name is spoken and heard, the faster its energetic pattern becomes your energetic pattern. Passively waiting for luck to change after a name change is a fundamental misunderstanding of how this works.</p>
<p>Align your choices with the name's energy. If the new name carries Wood energy, invest in growth-oriented activities—education, new projects, mentoring. If it carries Metal, work on developing precision and technical mastery. You're not just changing a label; you're committing to a direction.</p>

<h2 id="conclusion">4. The Name You Choose, the Life You Build</h2>
<p>You didn't choose the name you were given at birth. But you can choose what you carry forward. A thoughtfully executed name change, grounded in rigorous Saju and Seongmyeonghak analysis, is one of the most deliberate acts of self-determination available. It won't fix everything—no name can do that. But it removes a specific category of friction that has no business being there. That's worth a great deal.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/seongmyeong/numerology-81" style="text-decoration: underline; color: #f9d976;">[Read Next] Numerology 81 — Understanding the Stroke Count System Before Your Name Change</a></p>
  <p><a href="/en/seongmyeong/name-creation" style="text-decoration: underline; color: #f9d976;">[Read Next] The Art of Naming — How to Design a Name That Works</a></p>
</div>
</section>"""

# ── baby-naming contentKo ────────────────────────────────────
baby_ko = """<section>
<p>아이가 태어나는 순간, 부모의 마음속에서 가장 중요한 일 중 하나가 시작됩니다. 바로 이름 짓기입니다. 이름은 평생 동안 아이와 함께하며, 아이의 자아 인식, 사회적 인상, 그리고 명리학적 기운의 흐름에 영향을 미칩니다. 좋은 이름 하나가 사주의 약점을 보완하고, 아이가 자신의 잠재력을 최대한 발휘하도록 돕습니다. 사랑하는 아이에게 줄 수 있는 최고의 첫 번째 선물, 작명의 모든 것을 알려드립니다.</p>

<h2 id="saju-first">1. 아이의 사주 분석 — 이름보다 사주를 먼저 읽어라</h2>
<p>좋은 이름은 아이의 사주를 정밀하게 이해하는 것에서 시작됩니다. 태어난 연·월·일·시(사주팔자)를 기반으로 아이가 타고난 기운의 강점과 약점을 먼저 파악해야 합니다.</p>
<h3>계절별 조후(調候) — 온도가 맞아야 아이가 산다</h3>
<p>겨울(10~12월)에 태어난 아이는 사주가 차갑고 습한 경향이 있습니다. 이 아이의 이름에는 따뜻한 화(火)나 목(木)의 기운을 넣어 사주의 온도를 높여주어야 합니다. 반대로 여름 한더위(6~8월)에 태어난 아이는 사주가 뜨거운 경우가 많아, 시원한 수(水)와 금(金)의 기운으로 균형을 잡아주어야 합니다. 이 조후가 맞지 않으면 아이가 잘 아프거나 예민해지는 경향이 나타날 수 있습니다.</p>
<h3>용신(用神) 파악 — 아이의 성공을 이끄는 핵심 기운</h3>
<p>사주에서 가장 필요하고 도움이 되는 기운인 용신을 이름의 중심에 두어야 합니다. 용신이 이름에 담긴 아이는 자신의 강점이 자연스럽게 발휘되는 환경 속에서 성장합니다. 용신을 이름에 배치하는 것은 아이에게 평생의 나침반을 선물하는 것과 같습니다.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">👶 우리 아이의 이름 기운 분석하기 →</a>
</div>

<h2 id="numerology-check">2. 수리81수와 소리오행 — 이름의 뼈대를 견고하게</h2>
<p>사주 분석이 끝나면 이름의 구조적 뼈대를 설계합니다.</p>
<h3>수리 4격을 모두 길수로</h3>
<p>원격(초년운)·형격(청년~사회운)·이격(중년운)·정격(총운/말년운) 네 가지 모두 길수(吉數)여야 합니다. 특히 사회적 성공을 결정하는 형격이 가장 중요합니다. 11(갱신격)·15(통솔격)·21(두령격)·24(입신격)·31(성덕격) 등이 대표적인 길수입니다.</p>
<h3>소리오행 상생 흐름 확인</h3>
<p>성(姓)부터 이름 끝 글자까지 소리오행이 상생(相生)의 흐름을 이루도록 합니다. 상생 구조의 이름은 아이가 커서 사회에 나갔을 때 인복(人福)이 풍성해집니다. 주변 사람들이 자연스럽게 도와주고 싶어지는 이름이 됩니다.</p>

<h2 id="meaning-and-style">3. 의미의 깊이와 현대적 세련미</h2>
<p>성명학 원칙을 다 충족했더라도, 이름 자체가 아름다워야 완성입니다.</p>
<ul>
  <li><strong>뜻의 아름다움:</strong> 아이가 커서 자신의 이름 뜻을 들었을 때 자랑스러움과 감동을 느끼는 이름이어야 합니다.</li>
  <li><strong>발음의 자연스러움:</strong> 성과 이름이 함께 불렸을 때 리듬이 있고, 발음하기 편해야 합니다.</li>
  <li><strong>글로벌 통용:</strong> 외국인도 발음할 수 있는 이름은 글로벌 시대에 경쟁력입니다. 2~3음절의 명확한 발음이 이상적입니다.</li>
  <li><strong>돌림자와의 조화:</strong> 돌림자가 있다면 그것을 중심으로 나머지 기운을 조율합니다. 돌림자가 사주와 충돌한다면 전문가 상담을 통해 유연하게 해법을 찾는 것이 좋습니다.</li>
</ul>

<h2 id="conclusion">4. 결론 — 이름은 평생의 수호신이다</h2>
<p>정성 들여 지은 이름은 아이와 평생을 함께합니다. 매일 수십 번 불리며 아이의 잠재의식에 긍정적인 파동을 보내고, 만나는 사람들에게 좋은 첫인상을 남기며, 사주의 부족한 기운을 채워줍니다. 부모님의 사랑과 철학이 담긴 이름—그것이 아이에게 줄 수 있는 가장 오래가는 선물입니다.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/seongmyeong/numerology-81" style="text-decoration: underline; color: #f9d976;">[관련글] 수리81수 완전정복 — 이름 획수로 보는 인생의 굴곡</a></p>
  <p><a href="/ko/seongmyeong/name-five-elements" style="text-decoration: underline; color: #f9d976;">[관련글] 소리오행 분석 — 이름 자음이 만드는 기운의 흐름</a></p>
</div>
</section>"""

# ── baby-naming contentEn ────────────────────────────────────
baby_en = """<section>
<p>The most important naming decision you'll ever make happens within days of a momentous event, when you're sleep-deprived, overwhelmed with emotion, and navigating a hundred practical concerns simultaneously. No wonder so many parents later wonder whether they chose well. In Korean naming culture, the weight given to this decision reflects its genuine importance: a name crafted with care and rigor is one of the most meaningful things you can give a child. A name chosen carelessly is a gift that causes quiet friction for decades.</p>
<p>This guide walks through the complete Seongmyeonghak approach to baby naming—from birth chart analysis through sound harmony, numerological structure, character selection, and the modern considerations that matter in a connected world.</p>

<h2 id="saju-first">1. Why the Birth Chart Comes Before the Name</h2>
<p>The foundational principle of Saju-integrated naming: the name serves the chart, not the other way around. A name that sounds beautiful and carries auspicious numerology can still work against a child if it amplifies energies already excessive in their chart, or suppresses the elemental force they most need.</p>
<h3>Seasonal Calibration (Johu)</h3>
<p>A child born on the coldest day of January has a chart weighted heavily toward Water and Metal. That chart needs warmth—Fire and Wood energies introduced through the name's sounds and characters. A child born at the height of summer heat needs the opposite: cooling Water and grounding Earth. Getting this temperature calibration right is the non-negotiable first step. When it's wrong, children often show patterns of physical sensitivity, emotional volatility, or persistent restlessness that are hard to trace to a single source.</p>
<h3>The Beneficial Element (Yongshin)</h3>
<p>Beyond temperature, every chart has a pivotal element—the Yongshin—that most powerfully tips the balance toward favorable outcomes. When this element is embedded in the name's sound energy, stroke count patterns, and character radicals simultaneously, each utterance of the name reinforces the child's most important energetic advantage. This is the craft at its most precise.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">👶 Get Personalized Baby Name Recommendations →</a>
</div>

<h2 id="numerology-check">2. Building a Structurally Sound Name</h2>
<p>Once the chart is analyzed, attention turns to the name's numerical architecture.</p>
<p>The Four Stages system (Won-gyeok, Hyeong-gyeok, I-gyeok, Jeong-gyeok) maps the stroke count totals to four periods of life: early childhood, primary working life, middle age, and overall trajectory. Ideally, all four stages hit auspicious numbers. In practice, the Hyeong-gyeok (primary social success) and Jeong-gyeok (overall life total) are prioritized when optimization requires trade-offs. Classic lucky numbers include 11 (renewal), 15 (leadership), 21 (authority), 24 (achievement), and 31 (virtue).</p>
<p>Sound harmony runs parallel to this: the sequence of consonant elements across the family name and both syllables of the given name should flow generatively. This isn't just about luck—it's about the social quality the name projects. Names with harmonious sound element sequences tend to read as warm, approachable, and trustworthy to people encountering them for the first time.</p>

<h2 id="meaning-and-style">3. Beauty That Doesn't Compromise Substance</h2>
<p>A name that satisfies every classical criterion but sounds clunky or carries unavoidable negative associations isn't a complete success. The final layer of good contemporary naming combines elemental rigor with aesthetic intelligence:</p>
<ul>
  <li><strong>Meaning depth:</strong> The child will someday ask what their name means. The answer should create pride, not embarrassment.</li>
  <li><strong>Phonetic flow:</strong> The full name—family name plus given name—should have natural rhythm when spoken aloud.</li>
  <li><strong>Global accessibility:</strong> Names that are pronounceable in English and other major languages carry practical advantages in an interconnected world. Two to three syllables with clear consonant-vowel structure is generally ideal.</li>
  <li><strong>Generational name integration:</strong> Many Korean families use generational characters (Dolimja). If the generational character clashes with the child's elemental needs, the solution isn't to discard family tradition—it's to build the remaining characters in ways that compensate for the conflict.</li>
</ul>

<h2 id="conclusion">4. The First Gift That Lasts a Lifetime</h2>
<p>Parents give children many things over the years—education, experiences, love, resources. All of these matter. But few gifts are quite as persistent as the name. It goes everywhere. It opens every introduction. It shapes the first impression before personality has a chance to fill in the gaps.</p>
<p>A name crafted with rigor and love is a quiet act of advocacy for your child—a declaration of who you believe they have the potential to become, encoded in the most durable form available. Take the time to get it right.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/seongmyeong/numerology-81" style="text-decoration: underline; color: #f9d976;">[Read Next] Numerology 81 — Understanding Lucky and Unlucky Stroke Counts</a></p>
  <p><a href="/en/seongmyeong/name-five-elements" style="text-decoration: underline; color: #f9d976;">[Read Next] Sound Elements — How Your Baby's Name Consonants Shape Their Energy</a></p>
</div>
</section>"""

# ── numerology-81 contentKo ──────────────────────────────────
num_ko = """<section>
<p>성명학의 세 가지 핵심 원리 중에서 가장 수치적이고 통계적인 분야가 바로 수리81수(數理81數)입니다. 이름을 구성하는 한자의 획수를 합산한 수치가 1부터 81까지 각각 고유한 기운과 길흉 패턴을 가진다는 이 이론은, 수천 년간 수많은 인생 사례를 통해 통계적으로 검증되어 온 동양의 수리 체계입니다. 이름의 어떤 숫자가 성공을 불러오고, 어떤 숫자가 조심을 요구하는지 상세히 알아봅니다.</p>

<h2 id="four-stages">1. 인생의 4개 시기 — 원·형·이·정격</h2>
<p>수리81수는 이름을 단순히 전체 획수 하나로 보는 것이 아니라, 성과 이름의 조합 방식에 따라 네 가지 격(格)으로 인생 시기를 나누어 분석합니다.</p>
<ul>
  <li><strong>원격(元格) — 초년운 (0~20세):</strong> 이름의 두 번째 글자와 세 번째 글자의 획수 합. 유년기와 청소년기의 성장 환경, 선천적 재능과 성향을 나타냅니다. 원격이 좋으면 유년기에 건강하고 학습 능력이 뛰어납니다.</li>
  <li><strong>형격(亨格) — 청년운/핵심운 (20~40세):</strong> 성(姓)의 획수와 이름 첫 글자의 획수 합. 인생에서 가장 왕성하게 사회적 성취를 이루는 시기의 운세를 결정합니다. 성명학에서 가장 중요하게 보는 격으로, 직장운·사업운·명예운이 여기에 집약됩니다.</li>
  <li><strong>이격(利格) — 중년운 (40~60세):</strong> 성(姓)의 획수와 이름 마지막 글자의 획수 합. 가정을 이루고 사회적 지위를 굳히는 시기의 운세입니다. 재물 성취와 가정의 안정이 이격에 담겨 있습니다.</li>
  <li><strong>정격(貞格) — 총운/말년운 (60세~):</strong> 이름 전체(성+이름) 획수의 합. 인생 전체의 결실와 노년의 안락함을 상징합니다. 정격이 좋으면 노년에 주변의 존경을 받고 편안한 삶을 누립니다.</li>
</ul>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">📊 내 이름의 수리 4격 분석하기 →</a>
</div>

<h2 id="lucky-numbers">2. 대표적인 길수(吉數) 상세 분석</h2>
<p>81가지 수리 중 특히 강력한 성공과 행복의 기운을 가진 길수들입니다.</p>
<ul>
  <li><strong>1획 — 태초격(太初格):</strong> 만물의 시작을 상징. 강한 리더십과 개척 정신. 새로운 분야를 열어가는 힘이 있습니다.</li>
  <li><strong>11획 — 갱신격(更新格):</strong> 봄의 새싹처럼 끊임없이 새로운 가능성이 열립니다. 사업 확장, 새로운 시작에 최고의 수리. 창의적인 직군에 특히 좋습니다.</li>
  <li><strong>15획 — 통솔격(統率格):</strong> 덕망 있는 리더를 상징. 많은 사람의 존경을 받으며 원만한 대인관계를 구축합니다. 조직의 리더나 공직에 어울리는 수리입니다.</li>
  <li><strong>21획 — 두령격(頭領格):</strong> 집단을 이끄는 위에 서는 수리. 사업가·정치인·전문직 리더에게 이상적인 수리로, 권위와 성취를 동시에 상징합니다.</li>
  <li><strong>24획 — 입신격(立身格):</strong> 자수성가의 상징. 타고난 재능과 노력으로 사회적 성공을 쟁취하는 강한 수리. 재물과 명예를 함께 누립니다.</li>
  <li><strong>31획 — 성덕격(盛德格):</strong> 덕망으로 사람을 이끄는 군자의 수리. 학문과 예술에서 탁월한 성취를 이루며 후대에 이름을 남깁니다.</li>
  <li><strong>32획 — 요행격(僥倖格):</strong> 뜻밖의 행운이 찾아오는 수리. 귀인의 도움을 자주 받아 순풍에 돛을 단 듯 인생이 흘러갑니다.</li>
</ul>

<h2 id="caution-numbers">3. 주의해야 할 흉수(凶數)와 대처법</h2>
<p>아래 수리들이 형격이나 정격에 등장한다면, 전문가와 상담하여 개명 등의 대안을 검토하는 것이 좋습니다.</p>
<ul>
  <li><strong>4획 — 파괴격(破壞格):</strong> 노력에 비해 결실이 부족. 건강 문제와 갑작스러운 손실을 조심해야 합니다.</li>
  <li><strong>9획 — 궁박격(窮迫格):</strong> 재능은 뛰어나지만 인정받기 어렵고 고독한 삶의 경향이 있습니다.</li>
  <li><strong>10획 — 공허격(空虛格):</strong> 아무리 쌓아도 무너지는 사상누각. 재물이 손에 잡히지 않는 경향이 있습니다.</li>
  <li><strong>19획 — 고난격(苦難格):</strong> 건강 문제와 환경적 어려움이 반복되기 쉽습니다. 의지와 끈기가 특히 필요한 수리입니다.</li>
  <li><strong>34획 — 파란격(波瀾格):</strong> 인생의 굴곡이 심하고 갑작스러운 변화가 많습니다.</li>
</ul>

<h2 id="conclusion">4. 결론 — 이름 속 숫자는 인생의 리듬이다</h2>
<p>수리81수는 이름 아래에 깔린 보이지 않는 구조입니다. 좋은 수리 조합을 가진 이름은 주인이 노력할 때 그 노력이 배가 되도록 받쳐주고, 어려운 시기엔 버팀목이 됩니다. 자신의 이름이 어떤 수리 구조를 갖고 있는지 이해하는 것—그것이 자신의 인생 리듬을 이해하는 첫걸음입니다.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/seongmyeong/name-creation" style="text-decoration: underline; color: #f9d976;">[관련글] 작명의 기술 — 수리와 소리와 한자의 삼위일체 작명법</a></p>
  <p><a href="/ko/seongmyeong/name-change" style="text-decoration: underline; color: #f9d976;">[관련글] 개명 가이드 — 흉수 이름을 바꿔 운을 리셋하는 법</a></p>
</div>
</section>"""

# ── numerology-81 contentEn ──────────────────────────────────
num_en = """<section>
<p>Numbers are perhaps the most universal human symbol system—present in every culture, every era, every domain of inquiry. The Seongmyeonghak approach to numbers isn't numerology in the Western sense, though the surface similarities might suggest otherwise. It's a pattern-recognition system built from centuries of observational data: specific stroke count totals in names correlate, across large populations, with specific patterns in career, relationships, health, and longevity.</p>
<p>The system—known as Suri 81-Su (數理81數)—maps every number from 1 to 81 and assigns each a characteristic energetic signature based on this accumulated statistical observation. Combined with Saju analysis and sound element assessment, it provides the structural numeric foundation for a complete name analysis.</p>

<h2 id="four-stages">1. The Four Stages: Reading a Name's Architecture</h2>
<p>The cleverness of the system is in how it analyzes the same name across multiple time windows simultaneously. Rather than looking at a single total, practitioners calculate four distinct stroke count combinations that map to four periods of life.</p>
<ul>
  <li><strong>Won-gyeok (元格) — Early Life (birth to ~20):</strong> The sum of the given name's two characters. Governs childhood environment, innate temperament, and early educational trajectory. A strong Won-gyeok creates a stable, curious foundation for development.</li>
  <li><strong>Hyeong-gyeok (亨格) — Primary Success Period (~20 to 40):</strong> Family name plus first character of given name. This is the most important stage—it governs career launch, social recognition, and the primary working-life arc. Most practitioners prioritize this number above all others when optimization requires trade-offs.</li>
  <li><strong>I-gyeok (利格) — Middle Life (~40 to 60):</strong> Family name plus last character of given name. Governs family stability, wealth consolidation, and the deepening of professional reputation.</li>
  <li><strong>Jeong-gyeok (貞格) — Overall and Later Life (60+):</strong> The total of all characters. Represents the net trajectory—the overall quality of the life arc, and the conditions of the later years. A strong Jeong-gyeok suggests a respected, comfortable later life with meaningful legacy.</li>
</ul>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">📊 Analyze Your Name's Four Stages →</a>
</div>

<h2 id="lucky-numbers">2. The Most Powerful Auspicious Numbers</h2>
<p>Across the 81 possible totals, certain numbers have consistently demonstrated favorable patterns. The most prized include:</p>
<ul>
  <li><strong>1 — Origin:</strong> Leadership, independence, the pioneer's spirit. First in everything.</li>
  <li><strong>11 — Renewal:</strong> Continuous new beginnings, expanding creative possibility, entrepreneurial success. One of the most sought-after numbers for Hyeong-gyeok.</li>
  <li><strong>15 — Leadership through Virtue:</strong> The number of the admired leader—not through force but through character. Excellent for social harmony and sustained professional respect.</li>
  <li><strong>21 — Authority:</strong> The number of the person whom groups naturally look to. Ideal for executives, political leaders, senior professionals, and anyone whose work involves directing others.</li>
  <li><strong>24 — Self-Made Achievement:</strong> The self-made success archetype. Combines innate talent with disciplined effort to produce outcomes that often surprise even the bearer. Strong for both financial and reputational success.</li>
  <li><strong>31 — Virtuous Success:</strong> The scholar-leader's number. Associated with academic and artistic distinction, wisdom that earns lasting respect, and legacy that outlasts the individual.</li>
  <li><strong>32 — Fortunate Assistance:</strong> The number of the person who seems to always find help when needed. Characterized by timely encounters with supportive figures and opportunities that appear unexpectedly.</li>
</ul>

<h2 id="caution-numbers">3. Numbers That Warrant Careful Attention</h2>
<p>These numbers appearing in core positions—particularly Hyeong-gyeok or Jeong-gyeok—suggest patterns worth examining through professional consultation:</p>
<ul>
  <li><strong>4, 9, 10:</strong> Patterns of frustrated effort, difficulty gaining recognition despite capability, a sense that results consistently disappoint expectations.</li>
  <li><strong>19, 20:</strong> Health sensitivities and environmental adversity as recurrent themes; periods of apparent progress followed by significant setbacks.</li>
  <li><strong>34:</strong> High volatility—dramatic swings in fortune that make stability difficult to maintain. Significant capability alongside persistent instability.</li>
</ul>
<p>An important caveat: no number should be read in isolation. A chart with a strong Saju that provides elemental support can partially compensate for an inauspicious numerological position. The system is always integrative, never deterministic.</p>

<h2 id="conclusion">4. What the Numbers Can and Can't Tell You</h2>
<p>Numerology 81 is a structural lens—it reveals the underlying architecture that a name imposes on the life it accompanies. Like the foundation of a building, you can't usually see it, but it shapes everything that happens above it. When the foundation is solid, everything built on top of it is easier. When it has structural weaknesses, they show up in patterns that are hard to explain by surface-level factors alone.</p>
<p>What it can't tell you: how hard you'll work, what choices you'll make, what you'll encounter. Those layers of agency remain genuinely open. What it does tell you: the energetic pattern your name contributes to every day of your life, and whether that contribution is working for you or asking you to compensate for it constantly. That's worth knowing.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/seongmyeong/name-creation" style="text-decoration: underline; color: #f9d976;">[Read Next] The Art of Naming — Sound, Numerology, and Character Energy Combined</a></p>
  <p><a href="/en/seongmyeong/name-change" style="text-decoration: underline; color: #f9d976;">[Read Next] Name Change Guide — When and How to Reset Your Luck</a></p>
</div>
</section>"""

content = replace_field(content, 'name-change', 'contentKo', change_ko)
content = replace_field(content, 'name-change', 'contentEn', change_en)
content = replace_field(content, 'baby-naming', 'contentKo', baby_ko)
content = replace_field(content, 'baby-naming', 'contentEn', baby_en)
content = replace_field(content, 'numerology-81', 'contentKo', num_ko)
content = replace_field(content, 'numerology-81', 'contentEn', num_en)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done.')
