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

# ── intro contentKo ──────────────────────────────────────────
intro_ko = """<section>
<p>우리는 태어나면서 부모님으로부터 첫 번째 선물을 받습니다. 바로 이름입니다. 동양 철학에서 이름은 단순한 호칭이 아닙니다. 그 사람의 에너지를 담는 그릇이고, 평생 수천 번 불리며 주인의 무의식에 파동을 보내는 일종의 만트라(mantra)입니다. 성명학(姓名學)은 이 이름의 소리와 글자 구조가 가진 기운을 체계적으로 분석하여, 사주팔자가 가진 불균형을 보완하고 삶의 흐름을 더 유리한 방향으로 설계하는 학문입니다.</p>

<p>많은 사람들이 성명학을 미신이라고 생각합니다. 그러나 한글은 세종대왕이 음양오행의 원리를 담아 창제한 문자이며, 발음 기관의 위치에 따라 오행이 분류된다는 점은 철학적으로 정교한 체계입니다. 수천 년간 통계적으로 검증된 수리81수 역시 단순한 미신이 아닌, 이름과 삶의 패턴을 연결하는 동양적 데이터 과학입니다.</p>

<h2 id="concept-of-name">1. 성명학의 정의 — 이름은 왜 운명에 영향을 미치는가</h2>
<p>성명학의 핵심 전제는 하나입니다: <strong>소리와 수(數)는 에너지를 가진다.</strong> 이름이 불릴 때마다 발생하는 소리의 파동(발음오행)과 한자를 구성하는 획수의 에너지(수리81수)가 그 사람의 기운 장(場)에 지속적으로 영향을 준다고 봅니다.</p>
<p>사주팔자가 타고나는 '선천운(先天運)'이라면, 이름은 후천적으로 그 운을 보완하는 '후천운(後天運)'입니다. 즉 사주에 화(火) 기운이 부족하다면 이름에 화의 발음과 한자를 넣어 균형을 맞추는 것이 가능합니다. 이는 마치 비타민이 결핍된 식단을 영양제로 보완하는 것과 같은 원리입니다.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">✨ 나의 이름 점수 무료로 확인하기 →</a>
</div>

<h2 id="core-principles">2. 성명학의 3대 핵심 원리</h2>
<p>좋은 이름 한 글자에는 최소 세 가지 원리가 조화를 이루어야 합니다. 이 세 원리 중 하나라도 어긋나면 이름의 기운이 온전히 발휘되지 못합니다.</p>
<h3>① 소리오행(발음오행) — 부르는 소리의 기운</h3>
<p>한글 자음은 각각 목·화·토·금·수 오행의 기운을 품고 있습니다. 성(姓)과 이름 첫 글자, 끝 글자의 발음이 서로 상생하는 흐름을 이룰 때 인복(人福)이 트이고 사회적 발복이 빨라집니다. 반대로 상극 구조라면 재능은 있어도 결실이 늦고 인간관계에서 마찰이 잦아집니다. '<strong>ㄱ·ㅋ(목)</strong>→<strong>ㄴ·ㄷ·ㄹ·ㅌ(화)</strong>→<strong>ㅁ·ㅂ·ㅍ(토)</strong>→<strong>ㅅ·ㅈ·ㅊ(금)</strong>→<strong>ㅇ·ㅎ(수)</strong>'의 순환이 상생의 기본 축입니다.</p>
<h3>② 수리81수(획수) — 숫자에 담긴 운명의 리듬</h3>
<p>한자의 획수를 합산하여 원격(元格)·형격(亨格)·이격(利格)·정격(貞格) 네 가지 시기로 인생을 분석합니다. 초년·청년·중년·말년 각각의 운세가 길수(吉數)로 구성될 때 삶의 굴곡이 줄어들고 성취가 단단해집니다.</p>
<h3>③ 자원오행(한자의 부수와 의미) — 글자가 담는 에너지</h3>
<p>한자의 부수와 의미가 사주에 부족한 오행을 직접 보충합니다. 수(水)가 필요한 사주라면 삼수변(氵)이나 비 우(雨)처럼 물의 기운이 담긴 글자를 선택합니다. 이름을 쓸 때마다 그 에너지가 활성화됩니다.</p>

<h2 id="impact-of-name">3. 이름이 인생에 미치는 실증적 영향</h2>
<p>좋은 이름의 효과는 단순히 철학적 주장에 그치지 않습니다. 심리학 연구에서도 이름이 사회적 첫인상, 직업 선택, 심지어 연봉에까지 영향을 미친다는 결과가 반복적으로 도출되고 있습니다. 발음하기 편하고 뜻이 좋은 이름을 가진 사람이 취업 면접에서 더 높은 평가를 받는 현상, 이름의 어감이 브랜드 인식에 영향을 주는 현상은 이미 마케팅 분야에서도 검증된 사실입니다.</p>
<p>성명학은 여기에 더해 소리의 파동과 획수의 수리적 에너지가 무의식과 환경에 영향을 준다는 동양 철학적 관점을 더합니다. 자신의 이름을 부를 때마다 자신감이 생기고, 상대방이 부를 때마다 긍정적인 인상을 남기는 이름—그것이 성명학이 추구하는 '명품 이름'입니다.</p>

<h2 id="conclusion">4. 결론 — 이름을 이해하는 것이 자기 이해의 시작</h2>
<p>성명학을 공부하는 것은 단순히 이름의 길흉을 판단하는 것이 아닙니다. 내 이름이 가진 에너지 구조를 이해하고, 그것이 나의 기질 및 사주와 어떻게 상호작용하는지를 파악하는 과정입니다. 이름이 나를 설명하고, 나는 이름을 완성합니다. 오늘 자신의 이름을 한번 다시 들여다보세요. 그 안에 숨겨진 운명의 코드가 보일 것입니다.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/seongmyeong/name-five-elements" style="text-decoration: underline; color: #f9d976;">[관련글] 소리오행 완전정복 — 이름 자음의 오행 상생상극 분석</a></p>
  <p><a href="/ko/seongmyeong/numerology-81" style="text-decoration: underline; color: #f9d976;">[관련글] 수리81수 총정리 — 획수로 읽는 인생의 길흉화복</a></p>
</div>
</section>"""

# ── intro contentEn ──────────────────────────────────────────
intro_en = """<section>
<p>Every culture has naming traditions. Korean naming culture—rooted in a discipline called <strong>Seongmyeonghak</strong> (姓名學, the study of names)—is one of the most systematically developed in the world. It's built on a foundational premise that most Westerners initially find surprising: the sounds and structural composition of your name carry energy that interacts with your personal cosmic configuration (Saju) over the course of your entire life.</p>

<p>This isn't mysticism for its own sake. Hangul, the Korean alphabet, was deliberately constructed around the principles of Yin-Yang and the Five Elements—its consonants organized by the position in the mouth they're produced, each position corresponding to a specific elemental energy. Layer onto this a numerological system (the 81-pattern stroke count) with centuries of observational data, and you have something that deserves to be taken seriously, even by skeptics.</p>

<h2 id="concept-of-name">1. The Core Claim: Your Name is a Living Vibration</h2>
<p>In Seongmyeonghak, your name is called dozens of times every day—by colleagues, family, strangers. Each utterance sends a specific vibrational pattern into your environment. The consonant sounds of your name map to the Five Elements (Wood, Fire, Earth, Metal, Water), and the elemental relationships between those sounds—whether they support or conflict with each other—shape the social and energetic atmosphere around you.</p>
<p>Beyond sound, the stroke counts of the Chinese characters (Hanja) in your name carry numerical energy. Specific totals correlate with patterns of success, challenge, wealth, and longevity observed across generations of practice. The name you carry isn't neutral. It's actively shaping the field around you.</p>
<p>Think of your birth chart (Saju) as your hardware—fixed at birth, unchangeable. Your name is software that runs on that hardware. A well-designed name doesn't override your nature; it amplifies your strengths and compensates for your gaps. A poorly constructed one adds friction that doesn't need to be there.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">✨ Analyze Your Name for Free →</a>
</div>

<h2 id="core-principles">2. The Three Pillars of a Great Name</h2>
<h3>Sound Elements (Paleum Ohaeng)</h3>
<p>The initial consonant of each syllable in your name carries an elemental energy: ㄱ/ㅋ = Wood, ㄴ/ㄷ/ㄹ/ㅌ = Fire, ㅁ/ㅂ/ㅍ = Earth, ㅅ/ㅈ/ㅊ = Metal, ㅇ/ㅎ = Water. When these flow in a generative sequence—Wood feeding Fire, Fire feeding Earth—your name supports social harmony and accelerating fortune. When they conflict, friction quietly accumulates in relationships and opportunities.</p>
<h3>Stroke Count Numerology (Suri 81-Su)</h3>
<p>The total stroke counts of the Chinese characters forming your name are analyzed across four life stages: early life (Won-gyeok), primary success period (Hyeong-gyeok), middle age (I-gyeok), and overall/later life (Jeong-gyeok). When auspicious numbers align across all four stages, the name provides structural support for lifelong development. Inauspicious combinations don't doom a person—but they do create unnecessary headwinds.</p>
<h3>Character Resource Energy (Jawon Ohaeng)</h3>
<p>The radical (root component) and meaning of each Chinese character in your name carries elemental energy that directly supplements your Saju. Someone whose birth chart runs cold and dry benefits from characters containing water radicals (氵) or wood elements (木). This layer is the most direct form of elemental supplementation a name can provide.</p>

<h2 id="impact-of-name">3. Does This Actually Work?</h2>
<p>The question worth asking directly. The practice rests on observable patterns across large populations over centuries—a form of pre-modern empiricism. Modern behavioral science corroborates some of the mechanisms: research consistently shows that name sounds affect social perception, job interview outcomes, brand recognition, and even academic assessment. The elements of a name that Seongmyeonghak focuses on—sound, rhythm, meaning—are precisely the elements that behavioral research confirms matter.</p>
<p>Whether you accept the metaphysical framework or not, designing a name with intentional attention to sound harmony, numerical balance, and meaningful characters produces a name that works better in the world. That much is not in dispute.</p>

<h2 id="conclusion">4. Understanding Your Name Is Understanding Yourself</h2>
<p>You didn't choose your name. But now that you understand what it carries, you have a choice about how to use that knowledge. Whether you're considering a name for a new child, contemplating a change for yourself, or simply curious about the energy structure of the name you've been living with—Seongmyeonghak offers a precise, considered framework for these questions.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/seongmyeong/name-five-elements" style="text-decoration: underline; color: #f9d976;">[Read Next] Sound Elements in Names — How Your Name's Consonants Shape Your Luck</a></p>
  <p><a href="/en/seongmyeong/numerology-81" style="text-decoration: underline; color: #f9d976;">[Read Next] Numerology 81 — Reading Life's Rhythm Through Stroke Counts</a></p>
</div>
</section>"""

# ── name-creation contentKo ──────────────────────────────────
creation_ko = """<section>
<p>이름을 짓는다는 것은 단순히 글자를 조합하는 일이 아닙니다. 한 사람의 기운 지도를 설계하고, 그 사람이 살아갈 환경에서 가장 잘 기능할 수 있도록 에너지를 배치하는 고도의 작업입니다. 특히 사주 명리학과 성명학을 함께 활용하는 '사주 보완 작명'은 타고난 운명의 약점을 이름으로 채우는 가장 강력한 개운법 중 하나입니다.</p>

<h2 id="saju-analysis">1. 작명의 출발점 — 사주 분석이 먼저다</h2>
<p>성명학 전문가들이 이름을 짓기 전에 반드시 하는 일이 있습니다. 바로 사주팔자 분석입니다. 아무리 소리오행이 좋고 수리가 길해도, 사주와 충돌하는 이름은 오히려 역효과를 냅니다.</p>
<h3>계절과 조후(調候) — 온도가 맞아야 살아난다</h3>
<p>12월 한겨울에 태어난 아이의 사주는 얼어붙은 강과 같습니다. 이 아이에게는 이름에 따뜻한 햇빛과 같은 화(火)의 기운이 절실합니다. 반대로 한여름 불볕 더위 속에 태어난 아이에게는 시원한 수(水)와 금(金)의 기운이 필요합니다. 이를 '조후(調候)를 맞춘다'고 하며, 이름에 조후를 담는 것이 건강과 정서적 안정의 기초를 놓는 일입니다.</p>
<h3>용신(用神) 파악 — 나를 성공으로 이끄는 핵심 에너지</h3>
<p>사주에서 가장 필요한 기운, 즉 용신을 이름의 중심 에너지로 삼아야 합니다. 용신이 이름에 녹아든 사람은 부르는 것만으로도 그 기운이 증폭됩니다. 반대로 용신을 극(剋)하는 기운이 이름에 있다면, 날개를 달고도 날지 못하는 형국이 됩니다.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">🍀 나에게 필요한 작명 기운 분석받기 →</a>
</div>

<h2 id="element-balancing">2. 오행을 담는 실전 기법 — 소리와 글자로 기운을 설계한다</h2>
<p>사주 분석이 끝나면 실제로 어떤 오행을 이름에 넣을지 결정합니다. 오행을 이름에 담는 방법은 크게 세 가지입니다.</p>
<h3>소리오행으로 담기</h3>
<p>이름의 자음 발음을 활용합니다. 화(火)가 필요하다면 'ㄴ·ㄷ·ㄹ·ㅌ' 계열 자음이 들어간 이름을 선택합니다. 예를 들어 '다은', '나연', '도윤' 등은 화의 기운을 소리로 담는 이름들입니다.</p>
<h3>자원오행으로 담기</h3>
<p>한자의 부수와 뜻을 통해 오행을 직접 보충합니다. 목(木)이 필요하다면 나무 목(木) 변이 들어간 글자, 예를 들어 林·森·桂·楠 등을 활용합니다. 수(水)가 필요하다면 삼수변(氵)이 들어간 글자—澤·洙·沁·浩 등이 좋은 선택입니다.</p>
<h3>수리오행으로 담기</h3>
<p>특정 획수는 특정 오행의 기운을 상징합니다. 길한 획수와 필요한 오행의 획수가 겹치는 한자를 선택하면 두 가지 효과를 동시에 얻을 수 있습니다.</p>

<h2 id="modern-naming">3. 현대 작명의 핵심 — 성명학 원칙 + 세련된 감각</h2>
<p>아무리 성명학적으로 완벽해도 불리기 어색하거나, 학교에서 놀림받을 수 있는 이름은 좋은 이름이 아닙니다. 현대 작명은 전통 내공에 현대적 감각을 더해야 합니다.</p>
<ul>
  <li><strong>발음의 명확성:</strong> 한 번에 알아들을 수 있고, 기억에 남는 이름이 좋습니다.</li>
  <li><strong>글로벌 발음:</strong> 외국인도 발음하기 쉬운 이름은 글로벌 시대에 경쟁력이 됩니다.</li>
  <li><strong>의미의 깊이:</strong> 이름의 뜻을 들었을 때 감동을 주는 멋진 의미가 담겨야 합니다.</li>
  <li><strong>성(姓)과의 조화:</strong> 성과 이름이 함께 불렸을 때 리듬이 자연스러워야 합니다.</li>
</ul>

<h2 id="conclusion">4. 결론 — 이름 한 글자에 인생의 집을 짓는다</h2>
<p>좋은 작명가가 이름을 지을 때는 적어도 수백 개의 후보를 검토하고, 소리·수리·자원·의미 네 가지 축에서 모두 균형이 맞는 이름을 엄선합니다. 그 정성이 담긴 이름은 주인의 평생 동안 조용히 그러나 확실하게 기운의 물길을 터주게 됩니다. 작명은 이름을 짓는 것이 아니라 인생의 집을 짓는 것입니다.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/seongmyeong/intro" style="text-decoration: underline; color: #f9d976;">[관련글] 성명학이란 무엇인가 — 이름과 운명의 관계 입문</a></p>
  <p><a href="/ko/seongmyeong/numerology-81" style="text-decoration: underline; color: #f9d976;">[관련글] 수리81수 완전정복 — 획수로 보는 인생의 굴곡</a></p>
</div>
</section>"""

# ── name-creation contentEn ──────────────────────────────────
creation_en = """<section>
<p>When I explain Korean name-crafting to non-Korean friends, I usually start with this: imagine if every time someone called your name, they were sending a specific frequency of energy toward you. And imagine if the structural composition of that name—the numbers encoded in its characters, the elemental forces in its sounds—was either reinforcing or undermining the particular kind of energy you were born with. That's the operating premise of Saju-integrated naming, and it's considerably more sophisticated than it might initially appear.</p>

<h2 id="saju-analysis">1. Why Saju Analysis Must Come First</h2>
<p>Professional name practitioners in Korea won't begin the actual naming process until they've analyzed the child's or client's birth chart in detail. The reason is fundamental: a name that sounds beautiful and carries auspicious numerology can still work against someone if it amplifies energies that are already excessive in their chart—or suppresses the specific elemental force that's their missing key.</p>
<h3>Seasonal Temperature (Johu)</h3>
<p>A child born in the coldest week of January has a chart saturated with Water and Metal—a frozen landscape. Their name needs to introduce warmth: Fire elements in the sound and character selection to bring their internal environment into a livable temperature range. A child born in the peak of summer heat needs the opposite—cooling Water and grounding Earth. This calibration, called Johu, is the non-negotiable first step before any other consideration.</p>
<h3>The Beneficial Element (Yongshin)</h3>
<p>Beyond temperature, every Saju chart has a specific element—the Yongshin—that most powerfully tips the balance toward favorable outcomes. Identifying it correctly is the difference between a name that passively avoids harm and one that actively creates opportunity. When your Yongshin is embedded in your name's sound and character energy, every time your name is spoken, that beneficial frequency gets activated.</p>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">🍀 Find Your Naming Energy →</a>
</div>

<h2 id="element-balancing">2. Three Techniques for Embedding Elements in a Name</h2>
<h3>Via Sound (Paleum Ohaeng)</h3>
<p>The initial consonants of each syllable carry elemental energy. If your chart needs Fire energy, names containing ㄴ, ㄷ, ㄹ, or ㅌ consonants (all Fire sounds) are prioritized. The practitioner looks for sound sequences where elemental energies flow generatively: Wood syllable → Fire syllable, or Earth syllable → Metal syllable.</p>
<h3>Via Character Radicals (Jawon Ohaeng)</h3>
<p>Chinese characters have root components (radicals) that carry elemental meaning. Characters with the water radical (氵)—such as 浩, 澤, 洙—contribute Water energy. Characters featuring the wood radical (木)—like 林, 楠, 桂—contribute Wood energy. The practitioner selects characters whose radicals directly supplement the client's elemental needs.</p>
<h3>Via Stroke Count Numerology (Suri Ohaeng)</h3>
<p>Certain stroke totals correlate with specific elemental forces as well as auspicious life patterns. When a specialist can find a character whose stroke count hits a lucky number AND whose radical contributes the needed element AND whose sound carries the right consonant energy, that's considered a near-perfect selection.</p>

<h2 id="modern-naming">3. Tradition Meets Contemporary</h2>
<p>A name that satisfies every classical principle but sounds awkward in a kindergarten classroom or a job interview isn't a good name. Modern name-crafting must honor both dimensions. The best names are easy to say in both Korean and English, carry layered meaning that makes people pause when they hear it explained, flow naturally after the family name, and don't invite unintended nicknames. Elemental balance achieved through beautiful, contemporary sound design—that's the craft.</p>

<h2 id="conclusion">4. A Name as Architecture</h2>
<p>A skilled practitioner examines hundreds of candidates for a single name. They're testing each one against multiple dimensions simultaneously—sound harmony, numerological balance, elemental supplementation, character meaning, global pronunciation viability. The name that survives all of these tests isn't just a name. It's an engineered energetic structure that will accompany its bearer through every introduction, every document, every moment of being called for the rest of their life. That's worth taking seriously.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/seongmyeong/intro" style="text-decoration: underline; color: #f9d976;">[Read Next] Introduction to Seongmyeonghak — Names and Destiny</a></p>
  <p><a href="/en/seongmyeong/numerology-81" style="text-decoration: underline; color: #f9d976;">[Read Next] Numerology 81 — The Stroke Count System Explained</a></p>
</div>
</section>"""

# ── name-five-elements contentKo ─────────────────────────────
five_ko = """<section>
<p>누군가 당신의 이름을 부를 때, 그 소리는 단순한 공기의 진동이 아닙니다. 성명학에서는 이름을 구성하는 자음 하나하나가 고유한 오행의 기운을 담고 있으며, 그 기운이 부르는 사람과 불리는 사람 사이에 흐른다고 봅니다. 이름이 하루에 수십 번 불린다고 생각해보면, 그 총량이 얼마나 강력한 에너지인지 실감할 수 있습니다. 이것이 성명학에서 소리오행을 가장 중요한 원리 중 하나로 꼽는 이유입니다.</p>

<h2 id="consonant-elements">1. 한글 자음별 오행 — 내 이름은 어떤 기운을 품고 있나</h2>
<p>세종대왕이 한글을 창제할 때 발음 기관의 위치를 오행에 대응시켰습니다. 어금니·혀·입술·이·목구멍이라는 다섯 가지 발음 기관이 각각 목·화·토·금·수에 대응됩니다.</p>
<ul>
  <li><strong>목(木) — 어금닛소리: ㄱ, ㅋ</strong><br>성장·창의·인자함의 에너지. 시작과 개척을 상징합니다. 'ㄱ'이 들어간 이름은 리더십과 추진력의 기운을 띱니다.</li>
  <li><strong>화(火) — 혓소리: ㄴ, ㄷ, ㄹ, ㅌ</strong><br>열정·발산·예의의 에너지. 따뜻하고 활동적인 기운을 상징합니다. 사교성이 좋고 밝은 이미지의 이름들이 이 계열에 속합니다.</li>
  <li><strong>토(土) — 입술소리: ㅁ, ㅂ, ㅍ</strong><br>안정·신뢰·포용의 에너지. 묵직하고 믿음직스러운 이미지를 줍니다. 경영·행정·사회복지 분야에 어울립니다.</li>
  <li><strong>금(金) — 잇소리: ㅅ, ㅈ, ㅊ</strong><br>결단·정의·날카로움의 에너지. 명확하고 직선적인 이미지를 줍니다. 법조·경찰·의료 분야에 잘 어울립니다.</li>
  <li><strong>수(水) — 목구멍소리: ㅇ, ㅎ</strong><br>지혜·유연함·저장의 에너지. 깊고 사색적인 이미지를 줍니다. 연구·기획·예술 분야에 강합니다.</li>
</ul>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/ko" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">📣 내 이름의 소리 기운 분석하기 →</a>
</div>

<h2 id="harmony-check">2. 상생과 상극 — 이름의 소리가 만드는 흐름</h2>
<p>오행의 기본 원리는 상생(相生)과 상극(相剋)입니다. 이름의 성(姓)부터 끝 글자까지 소리오행이 상생의 흐름을 타면, 이름이 불릴 때마다 긍정적인 에너지가 증폭됩니다.</p>
<h3>길(吉)한 상생 조합 예시</h3>
<p><strong>목→화→토 흐름:</strong> 예를 들어 '강(목)나(화)영(수)' 또는 '김(목)다(화)은(수)'처럼 목이 화를 生하고 화가 에너지를 발산하는 구조는 사교적이고 활발한 기운을 형성합니다. 목→화: 성장 에너지가 열정으로 점화됩니다.</p>
<p><strong>수→목→화 흐름:</strong> 깊은 사색(수)에서 아이디어(목)가 자라고, 그것이 세상에 발산(화)되는 흐름. 창의적인 분야의 여성 이름에서 자주 나타납니다.</p>
<h3>주의해야 할 상극 조합</h3>
<p>수(水)와 화(火), 금(金)과 목(木)처럼 서로 부딪히는 조합이 이름의 핵심 자리(성과 이름 첫 자)에 오면 내면의 갈등과 주변 환경과의 마찰이 잦아질 수 있습니다. 단 사주에서 해당 기운이 절실히 필요한 경우라면 전략적으로 활용하기도 합니다.</p>

<h2 id="modern-application">3. 글로벌 시대의 소리오행 — 외국인도 부르기 쉬운 이름</h2>
<p>최근 성명학 트렌드에서 주목받는 것이 바로 '글로벌 발음 가능성'입니다. 소리오행이 좋은 이름이면서 동시에 외국인이 발음하기 쉬운 이름을 선호하는 부모들이 늘고 있습니다. '다은·지안·서연·하림'처럼 2~3음절로 명확하고 세련된 이름들이 소리오행도 좋고 글로벌하게도 통하는 이름들입니다.</p>
<p>또한 연예인이나 유튜버처럼 이름이 수백만 번 불리는 직업이라면 소리오행의 파급력이 일반인보다 훨씬 큽니다. 이름이 브랜드가 되는 시대에 소리오행은 그 자체로 마케팅 자산입니다.</p>

<h2 id="conclusion">4. 결론 — 이름의 소리가 만드는 인생의 파동</h2>
<p>당신의 이름은 매일 당신을 위한 만트라입니다. 소리오행이 상생의 흐름을 이룰 때, 그 이름은 부르는 사람에게도 불리는 사람에게도 긍정적인 에너지의 파동을 퍼뜨립니다. 지금 자신의 이름을 소리 내어 불러보세요. 어떤 오행의 기운이 흐르고 있나요?</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/ko/seongmyeong/intro" style="text-decoration: underline; color: #f9d976;">[관련글] 성명학이란 무엇인가 — 이름이 운명에 미치는 영향</a></p>
  <p><a href="/ko/seongmyeong/name-creation" style="text-decoration: underline; color: #f9d976;">[관련글] 작명의 기술 — 사주에 맞는 이름 짓기 완전 가이드</a></p>
</div>
</section>"""

# ── name-five-elements contentEn ─────────────────────────────
five_en = """<section>
<p>Most people think of their name as a label—a convenient tag for identification. In Korean naming science, it's something closer to a frequency you broadcast. Every time your name is spoken, the consonants that compose it vibrate at specific elemental frequencies, and those frequencies interact with the elemental composition of the listener, the speaker, and the atmosphere between them.</p>
<p>This might sound abstract until you understand the elegance of the system. Hangul's consonants were deliberately organized—by King Sejong's scholars—according to the part of the mouth that produces them, each position corresponding to one of the Five Elements. The result is a phonetic alphabet that doubles as an elemental map.</p>

<h2 id="consonant-elements">1. Mapping Korean Consonants to the Five Elements</h2>
<p>Here's the core correspondence table that Seongmyeonghak practitioners work from:</p>
<ul>
  <li><strong>Wood (木) — Velar sounds: ㄱ, ㅋ</strong><br>Energy: growth, initiative, leadership, creativity. Names heavy in Wood consonants project a pioneering, ambitious quality—people tend to perceive the bearer as a starter, a builder, a natural leader.</li>
  <li><strong>Fire (火) — Lingual sounds: ㄴ, ㄷ, ㄹ, ㅌ</strong><br>Energy: passion, warmth, expressiveness, social magnetism. Fire-dominant names feel bright and approachable. The bearer tends to make strong first impressions and attract people easily.</li>
  <li><strong>Earth (土) — Labial sounds: ㅁ, ㅂ, ㅍ</strong><br>Energy: stability, reliability, inclusivity, endurance. Earth names project trustworthiness. They work particularly well for people in roles that require being depended upon—administrators, managers, caregivers.</li>
  <li><strong>Metal (金) — Dental sounds: ㅅ, ㅈ, ㅊ</strong><br>Energy: decisiveness, clarity, precision, justice. Metal-consonant names have a crisp, direct quality. They suit people in law, medicine, engineering, or any field where precision and authority matter.</li>
  <li><strong>Water (水) — Glottal sounds: ㅇ, ㅎ</strong><br>Energy: wisdom, adaptability, depth, intuition. Water names feel reflective and intelligent. They suit researchers, artists, strategists, and anyone whose work requires sustained internal depth.</li>
</ul>

<div class="cta-container" style="text-align: center; margin: 40px 0;">
  <a href="/en" style="display: inline-block; background: linear-gradient(135deg, #d4af37 0%, #f9d976 100%); color: #1a1a1a; font-weight: bold; padding: 15px 30px; border-radius: 8px; text-decoration: none; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">📣 Analyze Your Name's Sound Energy →</a>
</div>

<h2 id="harmony-check">2. Generative Flow vs. Controlling Conflict</h2>
<p>The Five Elements don't exist in isolation—they interact through generative (상생, Sang-saeng) and controlling (상극, Sang-geuk) relationships. The generative cycle: Wood feeds Fire → Fire creates Earth → Earth contains Metal → Metal collects Water → Water nourishes Wood. The controlling cycle: Wood breaks Earth → Earth blocks Water → Water extinguishes Fire → Fire melts Metal → Metal cuts Wood.</p>
<p>In name analysis, the practitioner maps the elemental sequence from family name through the first and last characters of the given name. When the flow is generative, energy amplifies with each repetition of the name. When it's controlling, the friction is subtle but cumulative—relationships that feel slightly harder than they should, opportunities that arrive but somehow don't quite land.</p>
<p>A word of nuance: a controlling sequence isn't automatically disqualifying. If someone's birth chart has a severe excess of one element, a name that introduces a controlling force for that element can be exactly right. The name isn't read in isolation—it's always read against the chart it's meant to serve.</p>

<h2 id="modern-application">3. Sound Elements in the Modern World</h2>
<p>An interesting development in contemporary Korean naming: the growing consideration of global phonetic accessibility. A name with perfect elemental harmony that a non-Korean speaker can't begin to pronounce has a practical limitation in an increasingly connected world. Practitioners now frequently factor in names that satisfy elemental principles while also being comfortable in English and other major languages.</p>
<p>This matters particularly for people whose names will be broadcast at scale—performers, entrepreneurs, public figures, content creators. When your name is said millions of times, the sound frequency it broadcasts isn't trivial. In a real sense, sound element analysis is a form of personal brand acoustics.</p>

<h2 id="conclusion">4. Your Name as Your Daily Mantra</h2>
<p>A mantra, in traditional practice, is a sound repeated to generate a specific energetic state. Your name is called dozens of times every day. That makes it, functionally, the most frequently repeated mantra in your life—whether you intended it or not. Understanding what frequency it broadcasts, and whether that frequency is working with or against your natural energy, is genuinely useful information.</p>
<p>Say your name aloud as you finish reading this. What consonants does it open with? Which elements are strong, which absent? You're not just reading—you're beginning to hear your own energy signature.</p>

<div style="margin-top: 30px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 10px;">
  <p><a href="/en/seongmyeong/intro" style="text-decoration: underline; color: #f9d976;">[Read Next] What Is Seongmyeonghak? — The Complete Beginner's Guide</a></p>
  <p><a href="/en/seongmyeong/name-creation" style="text-decoration: underline; color: #f9d976;">[Read Next] The Art of Naming — Practical Techniques for Elemental Balance</a></p>
</div>
</section>"""

content = replace_field(content, 'intro', 'contentKo', intro_ko)
content = replace_field(content, 'intro', 'contentEn', intro_en)
content = replace_field(content, 'name-creation', 'contentKo', creation_ko)
content = replace_field(content, 'name-creation', 'contentEn', creation_en)
content = replace_field(content, 'name-five-elements', 'contentKo', five_ko)
content = replace_field(content, 'name-five-elements', 'contentEn', five_en)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done.')
