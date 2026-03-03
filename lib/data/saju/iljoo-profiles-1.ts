export interface IljooProfile {
  hanja: string;
  nickname: string;
  nicknameEn: string;
  personality: string;
  personalityEn: string;
  strength: string;
  strengthEn: string;
  weakness: string;
  weaknessEn: string;
  career: string;
  careerEn: string;
  love: string;
  loveEn: string;
  special: string;
  specialEn: string;
}

export const ILJOO_PROFILES_1: Record<string, IljooProfile> = {
  // === 갑(甲) 일간 ===
  '갑자': {
    hanja: `甲子`,
    nickname: `지혜의 씨앗형`,
    nicknameEn: `Seed of Wisdom`,
    personality: `甲子(갑자) 일주는 한겨울의 차가운 물 위에 떠 있는 튼튼한 나무와 같은 형상입니다. 겉으로는 차분하고 이성적으로 보이지만, 내면에는 지식을 향한 끝없는 갈망과 뛰어난 직관력을 품고 있습니다. 차가운 이성과 따뜻한 감성이 공존하며, 깊은 사색을 통해 자신만의 독창적인 철학을 세우는 데 능합니다.`,
    personalityEn: `The Gapja (甲子) pillar resembles a sturdy tree floating on cold winter water. While appearing calm and rational on the outside, it harbors an endless thirst for knowledge and outstanding intuition within. Cold rationality and warm sensibility coexist, making them adept at establishing their own unique philosophy through deep contemplation.`,
    strength: `甲木이 子水 위에 떠 있는 수생목(水生木) 정인 구조로, 뿌리가 물속에 잠겨 불안정한 듯하나 이 결핍감이 오히려 지식을 무한히 흡수하고 학문적 완성을 추구하게 만드는 강력한 지적 원동력으로 작용합니다.`,
    strengthEn: `With a Water-generating-Wood Proper Resource structure where Yang Wood floats on Rat Water, the roots seem unstably submerged, but this very sense of deficiency acts as a powerful intellectual driving force to infinitely absorb knowledge and pursue academic perfection.`,
    weakness: `차가운 겨울 물(子水)이 생해주는 형국이라 머릿속에 구상한 이론은 방대하지만, 이를 불꽃처럼 태워 현실로 옮기는 양분(화기)이 부족해 행동보다는 사색에만 머물며 실천을 미루는 고질적인 정체 현상이 있습니다.`,
    weaknessEn: `As cold winter water (Rat Water) generates it, the theories conceived in the head are vast, but lacking the nourishment (fire energy) to burn them like a flame into reality, there is a chronic stagnation of staying only in contemplation and postponing execution rather than action.`,
    career: `교육자, 연구원, 기획자, 심리상담사, 작가. (깊이 있는 탐구와 지적 능력을 발휘할 수 있는 분야)`,
    careerEn: `Educator, Researcher, Planner, Psychological Counselor, Writer. (Fields where they can utilize deep exploration and intellectual abilities)`,
    love: `일지 정인이 끝없이 나를 보살펴주는 구조라 연애에서도 보호받고 수용되는 데 익숙하지만, 정작 본인은 감정을 능동적으로 표현하는 데 서툴러 파트너가 지쳐 나가떨어질 때까지 수동적인 태도로 일관하기 쉽습니다.`,
    loveEn: `Because the Day Branch Proper Resource endlessly cares for you, you are used to being protected and accepted in romance, but being clumsy at actively expressing emotions yourself, it is easy to consistently maintain a passive attitude until the partner gets exhausted and falls away.`,
    special: `학당귀인(學堂貴人)의 이지적인 기운이 강해, 젊은 시절의 방황을 끊어내고 30대 후반부터 연구소나 교육 기관 같은 정적인 환경에 뿌리를 내릴 때 비로소 특유의 학문적 대기만성을 완성합니다.`,
    specialEn: `With the strong intellectual energy of the Academic Noble, breaking off the wandering of youth and taking root in a static environment like a research institute or educational institution from your late 30s, you finally complete your unique academic late-blooming.`
  },
  '갑인': {
    hanja: `甲寅`,
    nickname: `거목의 개척자`,
    nicknameEn: `Pioneer of the Giant Tree`,
    personality: `甲寅(갑인) 일주는 깊은 숲 속에 굳건히 뿌리내린 거대한 소나무의 형상입니다. 독립심이 매우 강하고 주관이 뚜렷하며, 어떤 역경에도 굴하지 않는 강인한 생명력을 지녔습니다. 타인에게 의지하기보다 스스로 길을 개척하는 것을 선호하며, 정직하고 바른 성품으로 주위의 신뢰를 얻습니다.`,
    personalityEn: `The Gapin (甲寅) pillar represents a giant pine tree firmly rooted in a deep forest. They have very strong independence, clear subjectivity, and resilient vitality that does not yield to any adversity. They prefer to pioneer their own path rather than rely on others, and gain trust with their honest and upright character.`,
    strength: `甲木이 寅木을 만난 완벽한 간여지동 비견 구조로, 자신과 똑같은 거목의 에너지가 겹쳐 타인의 시선이나 조력에 전혀 기대지 않고 오직 자신의 확신만으로 황무지를 숲으로 개척해 내는 자립심이 타의 추종을 불허합니다.`,
    strengthEn: `With a perfect same-element Friend structure where Yang Wood meets Tiger Wood, the identical energy of giant trees overlaps, making your independence unrivaled in pioneering a wasteland into a forest solely with your own conviction without relying on others' gazes or assistance at all.`,
    weakness: `비견의 투쟁심이 극에 달해 '내가 무조건 옳다'는 독선에 빠지기 쉬우며, 누군가 내 권위를 침범하려 하면 조금의 유연성도 발휘하지 않고 들이받아버려 스스로 훌륭한 조력자들을 쳐내고 고립을 자초합니다.`,
    weaknessEn: `With the Friend's fighting spirit reaching its peak, you easily fall into the self-righteousness that 'I am unconditionally right', and if someone tries to invade your authority, you ram into them without exhibiting even a little flexibility, bringing isolation upon yourself by cutting off excellent assistants.`,
    career: `사업가, 정치인, 경영자, 독립 프리랜서, 군경. (자신의 주도권을 쥐고 이끌어갈 수 있는 분야)`,
    careerEn: `Entrepreneur, Politician, Manager, Independent Freelancer, Military/Police. (Fields where they can take initiative and lead)`,
    love: `연애 상대조차 나와 동등하게 맞설 수 있는 강한 비견의 에너지를 원하면서도, 결국엔 그 대등한 관계를 참지 못하고 내가 완벽하게 주도권을 쥐려다 부딪혀 나무가 부러지듯 거칠게 끝나는 패턴을 보입니다.`,
    loveEn: `Wanting an energy of a strong Friend who can stand equally against you even in a romantic partner, but ultimately unable to endure that equal relationship, trying to grasp the initiative perfectly leads to clashing and showing a pattern of ending roughly like a breaking tree.`,
    special: `부모나 상사의 유산(도움)을 물려받지 못하는 건록(建祿)의 숙명을 지녔으나, 이를 발판 삼아 30대 중반 무렵 완전한 독립을 선언하고 자기 이름 석 자를 건 사업체나 조직을 일굴 때 무섭게 뻗어 나갑니다.`,
    specialEn: `Bearing the fate of the Established Official unable to inherit parents' or superiors' legacy (help), but using this as a stepping stone, when declaring complete independence around your mid-30s and building a business or organization under your own name, you expand terrifyingly.`
  },
  '갑진': {
    hanja: `甲辰`,
    nickname: `푸른 용의 비상`,
    nicknameEn: `Flight of the Blue Dragon`,
    personality: `甲辰(갑진) 일주는 기름지고 비옥한 땅에 뿌리를 내린 튼튼한 나무이자, 봄비 속을 비상하는 푸른 용의 형상입니다. 이상이 높고 스케일이 크며, 포용력과 리더십을 두루 갖추고 있습니다. 현실적인 감각과 진취적인 기상이 조화를 이루어, 목표를 향해 거침없이 나아가는 긍정적 에너지가 넘칩니다.`,
    personalityEn: `The Gapjin (甲辰) pillar is a sturdy tree rooted in fertile land, and a blue dragon soaring in the spring rain. They have high ideals, a large scale, and possess both tolerance and leadership. Realistic sense and progressive spirit harmonize, overflowing with positive energy to advance towards their goals without hesitation.`,
    strength: `거목(甲木)이 비옥하고 물기 머금은 편재(辰土)를 꽉 움켜쥐는 목극토 구조로, 어설픈 몽상에 빠지지 않고 자신이 가진 모든 아이디어와 인맥을 동원해 기어코 거대한 현실적 부(富)로 치환해 내는 장악력이 압도적입니다.`,
    strengthEn: `With a Wood-controlling-Earth structure where a giant tree (Yang Wood) tightly grasps the fertile and moisture-laden Eccentric Wealth (Dragon Earth), your grip to inevitably convert into massive realistic wealth mobilizing all your ideas and connections without falling into clumsy daydreams is overwhelming.`,
    weakness: `일지의 辰土(편재/사람/재물)를 내 통제 아래 완벽히 두려는 소유욕이 지나쳐 주변을 숨 막히게 하며, 계산이 틀어지거나 내 구역을 침범당하면 푸른 용이 분노하듯 순식간에 난폭해져 판을 다 깨버립니다.`,
    weaknessEn: `The possessiveness to put the Day Branch's Dragon Earth (Eccentric Wealth/people/wealth) perfectly under your control is so excessive that it suffocates surroundings, and if calculations go wrong or your territory is invaded, you instantly become violent like an angry blue dragon, ruining the whole board.`,
    career: `기업가, 금융업, 무역업, 법조인, 고위 공직자. (큰 스케일과 도전 정신이 필요한 분야)`,
    careerEn: `Entrepreneur, Finance, Trade, Lawyer, High-ranking Public Official. (Fields requiring large scale and challenging spirit)`,
    love: `일간이 일지를 극하며 지배하는 탓에, 연애에서도 상대의 일정과 재무 상태까지 내 손바닥 위에 올려두고 관리하려 들며, 이에 순응하는 유순한 파트너를 만나면 아낌없이 보호하지만 반발하면 가차 없이 쳐냅니다.`,
    loveEn: `Because the Day Stem controls and dominates the Day Branch, even in romance you try to manage the partner's schedule and financial status by putting them on your palm; meeting a compliant partner who submits, you protect them unsparingly, but if they rebel, you ruthlessly cut them off.`,
    special: `편재를 깔고 앉은 백호대살의 파괴력 때문에 30~40대 사이 무리한 투자나 사업 확장으로 큰 재정적 파국을 겪기 쉬우나, 이를 교훈 삼아 보수적인 자산가로 방향을 틀면 50대 이후 범접 불가한 거부로 우뚝 섭니다.`,
    specialEn: `Due to the destructive power of the White Tiger Blade sitting on Eccentric Wealth, you are prone to experiencing a major financial catastrophe through unreasonable investments or business expansion between your 30s and 40s, but learning from this and turning into a conservative capitalist, you stand tall as an unapproachable wealthy person after your 50s.`
  },
  '갑오': {
    hanja: `甲午`,
    nickname: `불타오르는 나무`,
    nicknameEn: `Burning Tree`,
    personality: `甲午(갑오) 일주는 한여름의 뜨거운 태양 아래 서 있는 나무, 혹은 장작불처럼 타오르는 형상입니다. 에너지가 넘치고 자기표현력이 매우 뛰어나며, 예술적 감수성과 창의력이 풍부합니다. 솔직하고 숨김없는 성격으로 주변을 밝게 만들지만, 감정의 기복이 뚜렷하고 때로는 불같은 성미를 드러냅니다.`,
    personalityEn: `The Gabo (甲午) pillar resembles a tree standing under the hot midsummer sun, or a blazing firewood. They are energetic, highly expressive, and rich in artistic sensibility and creativity. They brighten their surroundings with an honest and open personality, but have distinct emotional swings and sometimes show a fiery temper.`,
    strength: `甲木이 자신을 온전히 불태워 午火(상관)를 생해주는 목생화 구조로, 자신의 끼와 예술적 아이디어를 세상에서 가장 매력적이고 폭발적으로 발산하여 대중을 홀려버리는 무서운 표현력과 기획력을 지녔습니다.`,
    strengthEn: `With a Wood-generating-Fire structure where Yang Wood completely burns itself to generate Horse Fire (Hurt Official), you possess terrifying expressiveness and planning ability to fascinate the public by radiating your flair and artistic ideas most attractively and explosively in the world.`,
    weakness: `상관(午火) 쪽으로 에너지가 걷잡을 수 없이 빠져나가다 보니 시작의 불꽃은 화려하나 금세 장작이 동나버리듯 체력과 인내심이 급방전되며, 감정이 끓어오르면 앞뒤 재지 않고 돌직구를 날려 쓸데없는 구설수를 달고 삽니다.`,
    weaknessEn: `As energy drains uncontrollably towards the Hurt Official (Horse Fire), the flame of starting is flashy but stamina and patience rapidly discharge like firewood running out quickly; when emotions boil, you hurl fastballs without calculating, living with useless gossip attached.`,
    career: `예술가, 연예인, 방송인, 마케터, 디자이너. (창의력과 표현력을 마음껏 발산할 수 있는 분야)`,
    careerEn: `Artist, Entertainer, Broadcaster, Marketer, Designer. (Fields where creativity and expression can be fully unleashed)`,
    love: `일지를 맹목적으로 생해주는 구조에 홍염살까지 더해져, 상대에게 첫눈에 반하면 자신의 모든 것을 내어주며 화려하게 구애하지만, 불이 다 타버리면 순식간에 차갑게 식어버려 '환승 연애'의 오해를 자주 받습니다.`,
    loveEn: `Adding Red Beauty to the structure of blindly generating the Day Branch, if you fall in love at first sight, you gorgeously court giving your all, but once the fire burns out, you turn cold in an instant, frequently being misunderstood for 'transfer dating'.`,
    special: `자신을 깎아 먹는 상관의 강한 표출 욕구를 20대 후반부터 무대, 강연, 방송, 혹은 IT 디자인 등 자신만의 확고한 전문 플랫폼으로 끌어들이지 못하면, 30대에 잦은 직장 이동과 관재구설로 심하게 방황하는 패턴이 있습니다.`,
    specialEn: `If you fail to draw the Hurt Official's strong desire for expression that gnaws at yourself into your own firm professional platform like stage, lectures, broadcasting, or IT design from your late 20s, there is a pattern of severely wandering with frequent job changes and legal gossip in your 30s.`
  },
  '갑신': {
    hanja: `甲申`,
    nickname: `바위 위의 소나무`,
    nicknameEn: `Pine on a Rock`,
    personality: `甲申(갑신) 일주는 깎아지른 절벽 바위틈에 굳건히 뿌리내린 소나무의 형상입니다. 척박한 환경 속에서도 살아남는 강인한 정신력과 뛰어난 적응력을 지녔습니다. 겉으로는 나무의 부드러움을 지녔지만 속으로는 바위처럼 단단하고 예리하며, 승부욕과 목적의식이 매우 투철합니다.`,
    personalityEn: `The Gapshin (甲申) pillar is a pine tree firmly rooted in the crevices of a sheer cliff rock. They possess a strong mentality and excellent adaptability to survive even in harsh environments. They have the softness of a tree on the outside but are as hard and sharp as a rock inside, with a very strong competitive spirit and sense of purpose.`,
    strength: `거대한 바위(申金) 위에서 위태롭게 버티는 甲木의 금극목 편관 구조로, 언제 잘릴지 모르는 절박함이 빚어낸 짐승 같은 생존 본능 덕에 어떤 최악의 압박 상황에서도 상황을 예리하게 분석하고 돌파해 내는 능력이 압도적입니다.`,
    strengthEn: `With a Metal-controlling-Wood Eccentric Official structure of Yang Wood holding on perilously over a massive rock (Monkey Metal), thanks to an animal-like survival instinct forged by the desperation of not knowing when you'll be cut, your ability to sharply analyze and break through situations even under any worst-case pressure is overwhelming.`,
    weakness: `일지 칠살이 끊임없이 내 목을 조르는 형국이라 극도의 스트레스와 신경쇠약이 내면에 쌓여 있으며, 이 불안감을 감추기 위해 오히려 타인에게 지나치게 차갑고 냉혹하게 굴거나 무자비한 철권통치를 휘두르려 합니다.`,
    weaknessEn: `Since the Day Branch Seven Killings constantly chokes you, extreme stress and nervous breakdown pile up inside, and to hide this anxiety, you rather act overly cold and ruthless to others or try to wield merciless iron-fisted rule.`,
    career: `군경, 외과의사, IT 엔지니어, 스포츠 선수, 전문 기술직. (예리한 판단력과 결단력이 필요한 분야)`,
    careerEn: `Military/Police, Surgeon, IT Engineer, Athlete, Specialized Technician. (Fields requiring sharp judgment and decisiveness)`,
    love: `일지 편관의 날카로운 극을 받으므로 무의식중에 자신을 휘어잡고 통제하는 강압적인 파트너에게 끌려들어가 속앓이를 하거나, 아예 감정 교류를 차단한 채 철저히 완벽한 스펙만 따지는 숨 막히는 조건 만남을 고집합니다.`,
    loveEn: `Receiving the sharp control of the Day Branch Eccentric Official, you are unconsciously drawn to coercive partners who dominate and control you, agonizing inwardly, or completely blocking emotional exchange, you insist on suffocating conditional meetings strictly weighing only perfect specs.`,
    special: `일지에 편관(칠살)의 살기(殺氣)를 깔고 있어 30대 무렵 뼈를 깎는 사고나 극심한 송사를 피하기 어려우나, 이 칼날 같은 에너지를 수술실(의료), 법정, 혹은 특수 기술의 무기로 전환하면 40대 중반부터 독보적 권위자로 거듭납니다.`,
    specialEn: `Laying the murderous energy of the Eccentric Official (Seven Killings) on the Day Branch, it is hard to avoid bone-cutting accidents or extreme lawsuits around your 30s, but converting this blade-like energy into a weapon of operating rooms (medical), courts, or special skills, you are reborn as an unrivaled authority from your mid-40s.`
  },
  '갑술': {
    hanja: `甲戌`,
    nickname: `가을 산의 단풍`,
    nicknameEn: `Autumn Maple on the Mountain`,
    personality: `甲戌(갑술) 일주는 쓸쓸한 가을 산을 붉게 물들이는 단풍나무, 혹은 마른 땅에 심어진 나무의 형상입니다. 책임감이 강하고 현실 감각이 뛰어나며, 무엇이든 자신의 힘으로 이루어내려는 독립심이 돋보입니다. 겉으로는 화려해 보여도 내면에는 고독감과 철학적인 깊이를 간직하고 있습니다.`,
    personalityEn: `The Gapsul (甲戌) pillar resembles a maple tree coloring a lonely autumn mountain red, or a tree planted in dry land. They have a strong sense of responsibility, excellent realistic sense, and stand out for their independence to achieve everything on their own. Although appearing flashy on the outside, they hold a sense of solitude and philosophical depth within.`,
    strength: `거목(甲木)이 메마른 가을 산(戌土)을 극하며 파고드는 목극토 편재 구조로, 겉보기에 가치 없어 보이는 버려진 땅이나 사업 아이템에서도 귀신같이 돈맥을 찾아내어 기어코 자신의 거대한 이익으로 뽑아내는 집념의 승부사입니다.`,
    strengthEn: `With a Wood-controlling-Earth Eccentric Wealth structure where a giant tree (Yang Wood) controls and digs into a dry autumn mountain (Dog Earth), you are a tenacious competitor who ghostly finds a money vein even in abandoned lands or business items that look worthless outwardly, eventually extracting it as your massive profit.`,
    weakness: `편재를 완전히 지배하려는 계산이 너무 앞서다 보니 모든 인간관계를 철저한 득실 위주로만 따지게 되며, 戌土 안의 불기운(상관) 탓에 내 통제를 벗어난 사람에게는 모진 독설을 퍼부어 화려한 겉모습과 달리 내면은 지독히 고독합니다.`,
    weaknessEn: `As calculations to completely dominate Eccentric Wealth are too forward, you end up weighing all human relationships strictly based on profit and loss, and due to the fire energy (Hurt Official) inside Dog Earth, you hurl harsh toxic remarks at those who escape your control, making your inner self terribly lonely unlike the flashy exterior.`,
    career: `금융업, 부동산, 회계사, 종교인, 철학자. (현실적 이익 창출이나 정신적 수양과 관련된 분야)`,
    careerEn: `Finance, Real Estate, Accountant, Religious figure, Philosopher. (Fields related to realistic profit generation or mental cultivation)`,
    love: `일지를 내가 완벽히 다루고 통제(편재)해야 직성이 풀리므로, 자신을 돋보이게 하는 화려한 트로피이면서 동시에 묵묵히 내조하는 상호 모순된 조건을 파트너에게 요구하다가 정작 진짜 사랑을 시작조차 하지 못하는 패턴이 잦습니다.`,
    loveEn: `Because you are only satisfied when perfectly handling and controlling the Day Branch (Eccentric Wealth), you often show a pattern of failing to even start true love while demanding mutually contradictory conditions from the partner—being a flashy trophy making you stand out while simultaneously silently supporting you.`,
    special: `戌土 안에 정관(辛金)과 상관(丁火)이 충돌하는 위험한 에너지를 품고 있어, 30대 중반 잘 나가던 사업이나 직장에서 예기치 않은 법적 분쟁(관재수)으로 하루아침에 모든 것을 잃는 뼈아픈 롤러코스터를 경험할 확률이 높습니다.`,
    specialEn: `Embracing the dangerous energy of Proper Official (Yin Metal) and Hurt Official (Yin Fire) clashing inside Dog Earth, there is a high probability of experiencing a painful rollercoaster of losing everything overnight in a thriving business or job due to unexpected legal disputes (Gwanjaesu) in your mid-30s.`
  },

  // === 을(乙) 일간 ===
  '을축': {
    hanja: `乙丑`,
    nickname: `인내의 잡초`,
    nicknameEn: `Weed of Patience`,
    personality: `乙丑(을축) 일주는 꽁꽁 언 겨울 땅을 뚫고 나오는 강인한 새싹이나 잡초의 형상입니다. 겉보기에는 부드럽고 유순해 보이지만, 어떤 시련에도 꺾이지 않는 무서운 인내심과 생존력을 지니고 있습니다. 목표를 향해 조용히, 그러나 끊임없이 전진하며 끈기로 승부하는 대기만성형입니다.`,
    personalityEn: `The Eulchuk (乙丑) pillar represents a tough sprout or weed breaking through frozen winter ground. While they appear soft and mild on the outside, they possess a fearsome patience and survival instinct that does not yield to any ordeal. They are late bloomers who move towards their goals quietly but constantly, winning through perseverance.`,
    strength: `여린 화초(乙木)가 차갑게 얼어붙은 진흙(丑土)을 집요하게 파고드는 목극토 편재 구조로, 남들이 모두 포기한 최악의 극한 환경 속에서도 묵묵히 뿌리를 내려 기어코 알짜배기 성과(편재)를 움켜쥐는 상상 초월의 끈기가 무기입니다.`,
    strengthEn: `With a Wood-controlling-Earth Eccentric Wealth structure where a fragile plant (Yin Wood) tenaciously digs into coldly frozen mud (Ox Earth), your weapon is perseverance beyond imagination, silently taking root and eventually grasping prime results (Eccentric Wealth) even in the worst extreme environments where everyone else has given up.`,
    weakness: `동토를 뚫고 생존하느라 내면에 너무 많은 한(恨)과 스트레스가 얼어붙어 있어 타인을 향한 지독한 경계심을 풀지 못하며, 극도로 음침하게 속을 감추다가 이익 앞에서는 피도 눈물도 없는 냉혹한 계산기로 돌변합니다.`,
    weaknessEn: `Surviving by piercing frozen earth, too much resentment (Han) and stress are frozen inside, failing to release terrible vigilance towards others; hiding your inside extremely gloomily, you suddenly turn into a cold-blooded calculator without blood or tears in the face of profit.`,
    career: `의학, 농업, 건축, 사회복지, 회계. (장기적인 안목과 끈기가 필요한 보수적인 분야)`,
    careerEn: `Medicine, Agriculture, Architecture, Social Welfare, Accounting. (Conservative fields requiring long-term perspective and patience)`,
    love: `일지 편재를 극하며 통제하려는 성향과 얼어붙은 환경 탓에 낭만 세포가 말라있어, 설렘보다는 내 팍팍한 삶을 당장 구제해 줄 탄탄한 경제력과 듬직함을 갖춘 사람만을 철저한 조건부로 선별하여 서서히 마음을 엽니다.`,
    loveEn: `Due to the tendency to control the Day Branch Eccentric Wealth and the frozen environment, your romance cells are dried up, so rather than excitement, you slowly open your heart by strictly filtering only those equipped with solid economic power and reliability to immediately rescue your tough life based on harsh conditions.`,
    special: `얼어붙은 땅에 뿌리내리려는 편재의 치열한 고군분투 탓에 20대부터 30대 중반까지는 남모를 눈물과 혹독한 재물적 좌절을 맛보지만, 이 인고의 세월을 견딘 50대 이후 반드시 실물 자산(부동산)을 크게 거머쥔 숨은 알부자가 됩니다.`,
    specialEn: `Due to the fierce struggle of Eccentric Wealth trying to take root in frozen earth, you taste secret tears and severe financial frustration from your 20s to mid-30s, but enduring this time of patience, you surely become a hidden rich person massively holding tangible assets (real estate) after your 50s.`
  },
  '을묘': {
    hanja: `乙卯`,
    nickname: `푸른 초원의 바람`,
    nicknameEn: `Wind of the Green Prairie`,
    personality: `乙卯(을묘) 일주는 봄바람에 일렁이는 푸른 초원이나 무성한 덩굴 식물의 형상입니다. 사교적이고 부드러우며 환경 적응력이 매우 뛰어납니다. 사람들과 어울리기를 좋아하고 분위기 메이커 역할을 톡톡히 하지만, 내면에는 누구에게도 간섭받기 싫어하는 강한 독립심과 끈질긴 고집이 숨어 있습니다.`,
    personalityEn: `The Eulmyo (乙卯) pillar is like a green prairie swaying in the spring breeze or lush vines. They are sociable, gentle, and have excellent environmental adaptability. They love mingling with people and play the role of a mood maker, but hide a strong independence and persistent stubbornness against interference within.`,
    strength: `가녀린 덩굴(乙木)이 서로 단단히 얽혀 거대한 숲(卯木)을 이루는 간여지동 비견 구조로, 아무리 거센 비바람에 짓밟혀도 쓰러지지 않는 집요한 생명력과 타인과 스펀지처럼 얽혀 세력을 불려 나가는 천부적인 환경 친화력이 최고입니다.`,
    strengthEn: `With a same-element Friend structure where fragile vines (Yin Wood) tightly intertwine with each other to form a massive forest (Rabbit Wood), your tenacious vitality not falling even when trampled by strong rain and wind, and innate environmental affinity to swell your forces intertwining with others like a sponge are the best.`,
    weakness: `나와 완벽히 동일한 비견 기운이 너무 강해 겉보기의 유연함과 달리 속으로는 남의 간섭이나 지시를 극도로 혐오하며, 내 뜻이 꺾일 위기에 처하면 차라리 덩굴을 끊어버리듯 인간관계를 단숨에 단절시켜버리는 서늘한 극단성을 품고 있습니다.`,
    weaknessEn: `Because the Friend energy perfectly identical to yours is too strong, unlike the outward flexibility, inwardly you extremely detest others' interference or instructions, harboring a chilling extremity of instantly severing human relationships like cutting vines when your will is on the verge of being broken.`,
    career: `언론인, 외교관, 패션업, 기획자, 서비스업. (대인관계와 커뮤니케이션 능력을 발휘하는 분야)`,
    careerEn: `Journalist, Diplomat, Fashion, Planner, Service Industry. (Fields utilizing interpersonal and communication skills)`,
    love: `일지에 나와 똑같은 비견을 두어 서로 대등한 친구 같은 연애를 지향하지만, 쌍방 모두 주도권을 놓지 않으려는 보이지 않는 기싸움이 치열해져 애정과 증오가 롤러코스터처럼 교차하는 징글징글한 관계 패턴을 반복하기 쉽습니다.`,
    loveEn: `Placing the exact same Friend on the Day Branch, you aim for an equal, friend-like romance, but invisible psychological warfare not wanting to let go of the initiative on both sides becomes fierce, easily repeating a sickening relationship pattern where affection and hatred cross like a rollercoaster.`,
    special: `부모의 든든한 조력 없이 홀로 일어서야 하는 건록(建祿)의 강인한 운명을 타고났으나, 이 타고난 자립심에 무리 짓는 덩굴의 네트워킹 능력이 결합하여 30대 후반부터 서비스나 영업, 기획 분야에서 스스로 거대한 인적 제국을 세웁니다.`,
    specialEn: `Born with the strong fate of the Established Official having to stand alone without parents' solid assistance, but combining this innate independence with the networking ability of clustering vines, you build your own massive human empire in service, sales, or planning fields from your late 30s.`
  },
  '을사': {
    hanja: `乙巳`,
    nickname: `화려한 덩굴꽃`,
    nicknameEn: `Gorgeous Vine Flower`,
    personality: `乙巳(을사) 일주는 초여름 햇살 아래 화려하게 피어난 꽃이나 불을 머금은 나무의 형상입니다. 두뇌 회전이 매우 빠르고 언변이 청산유수처럼 뛰어나며, 예술적 감각과 미적 안목이 탁월합니다. 화려하고 세련된 것을 좋아하며, 자신의 매력을 적극적으로 발산하여 대중의 시선을 사로잡는 능력이 있습니다.`,
    personalityEn: `The Eulsa (乙巳) pillar resembles a gorgeous flower blooming under the early summer sun or a tree holding fire. They have a very quick brain, excellent eloquence, and outstanding artistic sense and aesthetic eye. They like flashy and sophisticated things, and have the ability to captivate the public's attention by actively radiating their charm.`,
    strength: `가녀린 나무(乙木)가 제 한 몸을 불태워 뜨거운 태양(巳火)을 조력하는 목생화 상관 구조로, 번뜩이는 천재적 두뇌 회전과 자신의 치명적인 매력을 세상에 가장 화려하고 언어적으로 완벽하게 포장하여 뿜어내는 능력이 압도적입니다.`,
    strengthEn: `With a Wood-generating-Fire Hurt Official structure where a fragile tree (Yin Wood) burns its own body to assist the hot sun (Snake Fire), your flashing genius brain rotation and ability to spew your fatal charm by packaging it most gorgeously and linguistically perfectly to the world are overwhelming.`,
    weakness: `상관의 발산 욕구를 채우느라 나무가 땔감처럼 쉼 없이 타들어 가는 형국이라, 화려한 겉모습과 달리 체력과 멘탈이 급격히 방전되며, 한 가지 일에 진득하게 집중하지 못하고 쉽게 싫증을 내어 새로운 자극만 좇는 변덕이 심각합니다.`,
    weaknessEn: `Since the tree constantly burns like firewood to fulfill the Hurt Official's radiating desire, unlike the flashy exterior, stamina and mentality rapidly discharge, and you suffer from severe fickleness, unable to focus patiently on one task, getting bored easily and chasing only new stimuli.`,
    career: `방송연예, 항공 승무원, 디자인, 미용, 아나운서. (자신의 매력과 재능을 밖으로 표출하는 분야)`,
    careerEn: `Broadcasting/Entertainment, Flight Attendant, Design, Beauty, Announcer. (Fields where they express their charm and talent outwards)`,
    love: `일지를 무조건 생해주는 희생적 사랑과 상관의 강력한 자기 어필 욕구가 겹쳐, 한눈에 꽂힌 상대에게 거침없이 직진하여 불꽃처럼 연애를 시작하지만 내면의 나무가 다 타버리면 이내 권태를 느끼고 미련 없이 환승해버리는 가벼움이 있습니다.`,
    loveEn: `Overlapping the sacrificial love unconditionally generating the Day Branch and the Hurt Official's strong desire for self-appeal, you go unhesitatingly straight for a partner who catches your eye at first sight, starting romance like a spark, but when your inner tree burns out, you soon feel boredom and have a lightness of transferring without lingering attachment.`,
    special: `상관 특유의 반항아적 기질에 역마살의 이동수가 결합되어 20대에는 조직 생활에 적응하지 못하고 잦은 이직과 방황을 겪지만, 이를 항공, 무역, 방송 등 시공간을 넘나들며 끼를 발산하는 특수직으로 풀면 30대 중반 폭발적인 명성을 얻습니다.`,
    specialEn: `Combining the Hurt Official's unique rebellious temperament with the moving number of the Wandering Star, you fail to adapt to organizational life in your 20s, experiencing frequent job changes and wandering, but if you release this into special jobs radiating flair crossing time and space like aviation, trade, or broadcasting, you gain explosive fame in your mid-30s.`
  },
  '을미': {
    hanja: `乙未`,
    nickname: `사막의 선인장`,
    nicknameEn: `Cactus in the Desert`,
    personality: `乙未(을미) 일주는 메마른 여름 땅에 뿌리를 내린 강인한 선인장이나 건초의 형상입니다. 겉보기에는 차분하고 온순해 보이지만 속에는 불같은 열정과 메마른 환경에서도 살아남는 지독한 생존력을 감추고 있습니다. 현실 감각이 매우 뛰어나며, 자신에게 이익이 되는 방향으로 영리하게 움직일 줄 압니다.`,
    personalityEn: `The Eulmi (乙未) pillar is like a tough cactus or hay rooted in dry summer land. While appearing calm and mild on the outside, they hide a fiery passion and a fierce survival instinct to survive even in arid environments. They have a very good realistic sense and know how to move cleverly in a direction that benefits them.`,
    strength: `여린 풀(乙木)이 바짝 마른 조열한 사막(未土)에 깊숙이 뿌리내려 흙을 파고드는 목극토 편재 구조로, 물 한 방울 없는 최악의 사지에서도 기어코 오아시스를 찾아내어 완벽하게 내 이익으로 치환해 내는 영악하고 지독한 생존력이 으뜸입니다.`,
    strengthEn: `With a Wood-controlling-Earth Eccentric Wealth structure where fragile grass (Yin Wood) deeply takes root and digs into a completely parched hot desert (Sheep Earth), your shrewd and fierce survival power to eventually find an oasis even in the worst death ground without a drop of water and perfectly convert it into your profit is top-notch.`,
    weakness: `뜨겁고 거친 흙을 지배하려 발버둥 치다 보니 가슴 속에 항상 억눌린 울화(화기)가 차 있으며, 극단적인 이해타산 탓에 이익이 되지 않는 사람은 가차 없이 잘라내어 주변 인심을 잃고, 스트레스가 터지는 순간 용암처럼 돌변해 자폭하기 쉽습니다.`,
    weaknessEn: `Struggling to dominate hot and rough earth, your chest is always filled with suppressed pent-up anger (fire energy); due to extreme calculation of interests, you ruthlessly cut off unprofitable people, losing public favor, and the moment stress bursts, you easily turn like lava and self-destruct.`,
    career: `부동산, 요식업, 재무/회계, 보육, 한의학. (현실적인 이익과 안정을 추구하는 실용적인 분야)`,
    careerEn: `Real Estate, Restaurant Business, Finance/Accounting, Childcare, Oriental Medicine. (Practical fields pursuing realistic profit and stability)`,
    love: `일지 편재를 완벽히 통제해야만 안심하는 구조인지라 연애조차도 낭만은 철저히 배제한 채 나의 팍팍한 삶을 윤택하게 해줄 상대의 스펙과 재력을 현미경처럼 검증하며, 파트너가 내 영역에 1mm라도 간섭하려 들면 가시 돋친 선인장처럼 찔러버립니다.`,
    loveEn: `Because you only feel relieved when perfectly controlling the Day Branch Eccentric Wealth, thoroughly excluding romance even in dating, you microscopically verify the partner's specs and wealth that will enrich your tough life, and if the partner tries to interfere with your territory even 1mm, you sting them like a thorny cactus.`,
    special: `메마른 흙 속의 백호대살이라는 폭발적인 기운 탓에 30~40대에 심각한 위장병이나 전 재산을 날리는 파산의 벼랑 끝에 서기도 하지만, 이 뼈아픈 사막의 고통을 딛고 일어나 50대 이후 부동산이나 실물 자산을 움켜쥔 냉혹한 거부로 군림합니다.`,
    specialEn: `Due to the explosive energy of the White Tiger Blade in dry dirt, you may stand on the cliff edge of severe stomach disease or bankruptcy losing all your wealth in your 30s to 40s, but overcoming this painful desert suffering, you reign as a ruthless wealthy person grasping real estate or tangible assets after your 50s.`
  },
  '을유': {
    hanja: `乙酉`,
    nickname: `바위 위의 난초`,
    nicknameEn: `Orchid on a Rock`,
    personality: `乙酉(을유) 일주는 차갑고 날카로운 바위 틈에서 피어난 가냘프지만 고고한 난초의 형상입니다. 미적 감각이 매우 탁월하고 결단력이 있으며, 맺고 끊음이 확실합니다. 부드러워 보이는 외모와 달리 내면은 칼처럼 예리하고 비판적이며, 원칙에 어긋나는 것을 참지 못하는 대쪽 같은 성품을 지녔습니다.`,
    personalityEn: `The Eulyu (乙酉) pillar represents a fragile but noble orchid blooming in the crevices of cold and sharp rocks. They have an excellent aesthetic sense, decisiveness, and clear cut-offs. Contrary to their soft appearance, their inner self is as sharp as a knife and critical, possessing an upright character that cannot tolerate things going against principles.`,
    strength: `가녀린 화초(乙木)를 날이 시퍼런 가위(酉金)가 무자비하게 치고 들어오는 금극목 편관 구조에서 살아남기 위해, 본능적으로 썩은 가지를 칼같이 쳐내고 상황의 핵심만을 냉혹하게 짚어내는 초인적인 직관력과 강단이 압도적입니다.`,
    strengthEn: `To survive in a Metal-controlling-Wood Eccentric Official structure where frosty blue scissors (Rooster Metal) ruthlessly strike fragile plants (Yin Wood), your superhuman intuition and firmness to instinctively cut off rotten branches like a knife and ruthlessly pinpoint only the core of situations are overwhelming.`,
    weakness: `일지 칠살(편관)이 24시간 내 목을 조르고 있는 형국이라 만성적인 두통과 극심한 신경쇠약에 시달리며, 이 억압된 불안감을 감추기 위해 자신은 물론 타인의 작은 결점조차 현미경으로 찾아내 독설로 난도질해버리는 치명적 예민함이 있습니다.`,
    weaknessEn: `With the Day Branch Seven Killings (Eccentric Official) choking you 24 hours a day, you suffer from chronic headaches and extreme nervous breakdown; to hide this suppressed anxiety, you have a fatal sensitivity of finding even tiny flaws of yourself and others with a microscope and slashing them with toxic remarks.`,
    career: `법조인, 군경, 의료인, 정밀 세공, 감정평가사. (날카로운 판단력과 정밀함이 요구되는 분야)`,
    careerEn: `Lawyer, Military/Police, Medical Professional, Precision Crafting, Appraiser. (Fields requiring sharp judgment and precision)`,
    love: `나를 찌르는 편관의 극을 받으므로 무의식중에 나를 강압적으로 통제하는 카리스마(혹은 폭력성) 있는 파트너에게 끌려들어가 속앓이를 하거나, 반대로 방어기제가 발동해 상대의 작은 흠집을 가위로 오려내듯 비판하며 스스로 관계를 파탄 냅니다.`,
    loveEn: `Receiving the control of the Eccentric Official piercing you, you are unconsciously drawn to charismatic (or violent) partners who coercively control you, agonizing inwardly, or conversely, triggering a defense mechanism, you criticize the partner's small flaws as if cutting them out with scissors, ruining the relationship yourself.`,
    special: `편관 칠살의 살기(殺氣)가 극에 달한 절지(絶地)의 기운으로, 30대 중반 직업 단절이나 수술대(메스)에 오르는 극단적 시련을 겪지만, 이를 법조, 의료, 정밀 공학 등 칼을 쥐는 직업으로 완벽히 물상대체하면 40대 이후 생사를 주관하는 독보적 권위자가 됩니다.`,
    specialEn: `With the murderous energy of the Eccentric Official Seven Killings reaching the peak of the severing ground (絶), you experience extreme trials of career severance or lying on the operating table (scalpel) in your mid-30s, but perfectly replacing this with jobs wielding a knife like law, medicine, or precision engineering, you become an unrivaled authority governing life and death after your 40s.`
  },
  '을해': {
    hanja: `乙亥`,
    nickname: `물 위의 수련`,
    nicknameEn: `Water Lily`,
    personality: `乙亥(을해) 일주는 맑고 깊은 호수 위에 떠 있는 청초한 연꽃이나 부평초의 형상입니다. 감수성이 매우 풍부하고 직관력이 뛰어나며, 타인의 아픔에 깊이 공감하는 따뜻한 마음을 지녔습니다. 세속적인 욕심보다는 정신적인 가치와 학문을 중시하며, 어딘가 신비롭고 영적인 분위기를 풍깁니다.`,
    personalityEn: `The Eulhae (乙亥) pillar is like a pure lotus or duckweed floating on a clear and deep lake. They are very rich in sensibility, have excellent intuition, and possess a warm heart that deeply sympathizes with others' pain. They value spiritual values and academics over worldly greed, and exude a somewhat mysterious and spiritual atmosphere.`,
    strength: `거대한 바다(亥水) 위를 떠도는 부평초(乙木)처럼 일지의 전폭적인 생을 받는 수생목 정인 구조로, 어떤 거친 풍파가 닥쳐도 꺾이지 않고 물 흐르듯 흡수해 버리는 천부적인 유연성과 타인의 아픔을 어루만지는 깊은 영적 공감 능력이 으뜸입니다.`,
    strengthEn: `Like duckweed (Yin Wood) wandering over a massive sea (Pig Water), with a Water-generating-Wood Proper Resource structure receiving the Day Branch's full generation, your innate flexibility absorbing any rough storm like flowing water without breaking, and deep spiritual empathetic ability soothing others' pain are top-notch.`,
    weakness: `물이 너무 깊고 차가워 뿌리를 내리지 못하는 부평초의 숙명 탓에 현실 감각이 심각하게 결여되어 속세의 경쟁에서 자꾸 도태되며, 정인의 과잉보호에 취해 작은 시련 앞에서도 결단을 미루다 공허함과 깊은 우울의 늪에 빠져버리는 약점이 뚜렷합니다.`,
    weaknessEn: `Due to the fate of duckweed unable to take root because the water is too deep and cold, your realistic sense is severely lacking, constantly falling behind in worldly competition; intoxicated by the Proper Resource's overprotection, your distinct weakness is postponing decisions even before small trials, falling into a swamp of emptiness and deep depression.`,
    career: `교육자, 종교인, 심리상담, 예술가, 명리학. (정신적인 깊이와 공감 능력을 발휘하는 분야)`,
    careerEn: `Educator, Religious figure, Psychological Counseling, Artist, Myeong-ri (Fortune-telling). (Fields utilizing spiritual depth and empathy)`,
    love: `정인의 포용력으로 파트너의 모든 허물을 어머니처럼 품어주는 희생적인 사랑을 베풀지만, 정작 내 영혼이 정착할 닻을 내리지 못해 끊임없이 정신적 교감을 채워줄 이상형을 찾아 방황하며 안정된 가정을 꾸리기 어려워하는 몽환적인 패턴을 보입니다.`,
    loveEn: `With the Proper Resource's tolerance, you bestow sacrificial love embracing all the partner's faults like a mother, but failing to drop the anchor for your own soul to settle, you show a dreamy pattern of constantly wandering looking for an ideal type to fill your spiritual communion, finding it hard to build a stable family.`,
    special: `현실에 발붙이기 힘든 사지(死地)와 역마, 천문성(지혜)이 얽혀 있어 젊은 시절 주거지와 직장을 전전하는 방황을 겪으나, 이 부유하는 에너지를 문학, IT, 정신 의학 등 형체가 없는 고도의 지적 분야로 돌리면 30대 후반부터 자신만의 독보적인 전문성을 구축합니다.`,
    specialEn: `With the death ground (死) hard to touch down on reality, Wandering Star, and Heavenly Gate (wisdom) intertwined, you experience wandering across residences and workplaces in your youth, but turning this floating energy into formless, highly intellectual fields like literature, IT, or psychiatry, you build your own unrivaled expertise from your late 30s.`
  }
};
