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
    strength: `甲木이 子水 위에 떠 있는 구조라 뿌리가 물속에 잠겨 불안정할 수 있으나, 이 위기감이 오히려 지식을 끊임없이 탐구하고 완성을 추구하게 만드는 강력한 원동력이 됩니다.`,
    strengthEn: `The fact that Yang Wood floats on Rat Water creates instability, but this very sense of crisis becomes a powerful driving force for relentlessly seeking knowledge and pursuing perfection.`,
    weakness: `수생목(水生木)으로 끊임없이 에너지를 받지만, 차가운 겨울 물이라 행동으로 옮기는 양분으로는 부족해 생각만 많아지고 실천력이 떨어지는 고질적인 패턴이 있습니다.`,
    weaknessEn: `Although constantly receiving energy through Water generating Wood, the cold winter water is insufficient to convert into action, leading to a chronic pattern of overthinking and lacking execution.`,
    career: `교육자, 연구원, 기획자, 심리상담사, 작가. (깊이 있는 탐구와 지적 능력을 발휘할 수 있는 분야)`,
    careerEn: `Educator, Researcher, Planner, Psychological Counselor, Writer. (Fields where they can utilize deep exploration and intellectual abilities)`,
    love: `水가 木을 생해주는 구조라 타인에게 받는 사랑과 헌신에 익숙하지만, 정작 자신의 감정을 따뜻하게 표현하는 데 서툴러 오해를 사기 쉽습니다. 지적인 교감이 통하는 파트너가 먼저 다가와 주기를 기다리는 수동적인 연애를 지향합니다.`,
    loveEn: `As Water generates Wood, you are used to receiving love and devotion, but you are clumsy at warmly expressing your own feelings, easily causing misunderstandings. You tend to wait passively for an intellectually compatible partner to approach you first.`,
    special: `학당귀인을 품고 있어, 인생의 중반부 이후에 학위나 자격증 등 학문적 성취를 통해 직업적 안정을 찾고 대기만성하는 패턴을 보입니다.`,
    specialEn: `Embracing the Academic Noble, you show a late-blooming pattern of finding professional stability through academic achievements like degrees or certifications in the latter half of your life.`
  },
  '갑인': {
    hanja: `甲寅`,
    nickname: `거목의 개척자`,
    nicknameEn: `Pioneer of the Giant Tree`,
    personality: `甲寅(갑인) 일주는 깊은 숲 속에 굳건히 뿌리내린 거대한 소나무의 형상입니다. 독립심이 매우 강하고 주관이 뚜렷하며, 어떤 역경에도 굴하지 않는 강인한 생명력을 지녔습니다. 타인에게 의지하기보다 스스로 길을 개척하는 것을 선호하며, 정직하고 바른 성품으로 주위의 신뢰를 얻습니다.`,
    personalityEn: `The Gapin (甲寅) pillar represents a giant pine tree firmly rooted in a deep forest. They have very strong independence, clear subjectivity, and resilient vitality that does not yield to any adversity. They prefer to pioneer their own path rather than rely on others, and gain trust with their honest and upright character.`,
    strength: `甲木이 寅木을 만난 간여지동 구조로, 자신과 똑같은 에너지가 겹쳐 타인에게 의지하지 않고 스스로 운명을 개척하는 자립심과 굽히지 않는 자기 확신이 타의 추종을 불허합니다.`,
    strengthEn: `With Yang Wood meeting Tiger Wood in a same-element structure, overlapping identical energies create unmatched independence to pioneer your own destiny without relying on others and unyielding self-assurance.`,
    weakness: `비견(比肩)이 강해 경쟁심이 지나치게 높고, 자신의 옳음을 증명하려다 타인과 불필요한 마찰을 빚어 고립을 자초하는 독단성이 가장 큰 취약점입니다.`,
    weaknessEn: `Strong Friend energy makes you overly competitive, and your dogmatism in trying to prove you are right causes unnecessary friction with others, bringing isolation upon yourself.`,
    career: `사업가, 정치인, 경영자, 독립 프리랜서, 군경. (자신의 주도권을 쥐고 이끌어갈 수 있는 분야)`,
    careerEn: `Entrepreneur, Politician, Manager, Independent Freelancer, Military/Police. (Fields where they can take initiative and lead)`,
    love: `같은 오행끼리 만나 평등하고 친구 같은 관계를 원하면서도, 결국엔 자신이 주도권을 쥐고 상대방을 통제하려 하는 모순된 태도가 갈등의 주된 원인이 됩니다.`,
    loveEn: `Meeting the same element, you desire an equal, friend-like relationship, but your contradictory attitude of ultimately trying to take the lead and control your partner becomes the main cause of conflict.`,
    special: `건록으로 자수성가의 기운이 강해, 부모나 윗사람의 덕보다는 오직 본인의 실력으로 30대 후반부터 이룬 성과가 가장 단단하게 오래 유지됩니다.`,
    specialEn: `With strong self-made energy from the Established Official, achievements built solely by your own skills from your late 30s, rather than relying on parents or superiors, last the longest and strongest.`
  },
  '갑진': {
    hanja: `甲辰`,
    nickname: `푸른 용의 비상`,
    nicknameEn: `Flight of the Blue Dragon`,
    personality: `甲辰(갑진) 일주는 기름지고 비옥한 땅에 뿌리를 내린 튼튼한 나무이자, 봄비 속을 비상하는 푸른 용의 형상입니다. 이상이 높고 스케일이 크며, 포용력과 리더십을 두루 갖추고 있습니다. 현실적인 감각과 진취적인 기상이 조화를 이루어, 목표를 향해 거침없이 나아가는 긍정적 에너지가 넘칩니다.`,
    personalityEn: `The Gapjin (甲辰) pillar is a sturdy tree rooted in fertile land, and a blue dragon soaring in the spring rain. They have high ideals, a large scale, and possess both tolerance and leadership. Realistic sense and progressive spirit harmonize, overflowing with positive energy to advance towards their goals without hesitation.`,
    strength: `甲木이 비옥한 진토(辰土)에 깊이 뿌리를 내리고 극(剋)하는 형국으로, 척박한 환경도 자신이 통제 가능한 현실적인 자산으로 탈바꿈시키는 집요한 장악력과 현실 감각이 탁월합니다.`,
    strengthEn: `As Yang Wood deeply roots in and controls the fertile Dragon Earth, you have an excellent, tenacious grip and realistic sense to transform even barren environments into realistic assets under your control.`,
    weakness: `木이 土를 통제하려는 욕구가 지나쳐 주변 상황이나 사람들을 자신의 뜻대로 휘두르려 하며, 뜻대로 되지 않을 때 욱하는 성미가 폭발해 판을 깨버리기도 합니다.`,
    weaknessEn: `The excessive desire of Wood to control Earth leads to trying to wield surrounding situations or people to your will, and when things don't go your way, your explosive temper can ruin the whole plan.`,
    career: `기업가, 금융업, 무역업, 법조인, 고위 공직자. (큰 스케일과 도전 정신이 필요한 분야)`,
    careerEn: `Entrepreneur, Finance, Trade, Lawyer, High-ranking Public Official. (Fields requiring large scale and challenging spirit)`,
    love: `일간이 일지를 극하는 구조로 연애에서도 상대방을 자신의 품 안에 두고 보호자 역할을 자처하나, 이것이 지나친 간섭과 통제로 변질되어 상대가 숨막혀 떠나는 패턴을 주의해야 합니다.`,
    loveEn: `As the Day Stem controls the Day Branch, you act as a protector keeping your partner in your embrace, but you must beware of this turning into excessive interference and control, causing your partner to feel suffocated and leave.`,
    special: `백호대살을 품어 30대 전후로 직업, 재물, 혹은 건강 면에서 크게 무너지는 위기를 한 번 겪지만, 그것이 오히려 인생 2막을 여는 강력한 도약의 발판이 됩니다.`,
    specialEn: `Embracing the White Tiger, you experience a major crisis in career, wealth, or health around your 30s, but this ironically becomes a powerful stepping stone to open the second act of your life.`
  },
  '갑오': {
    hanja: `甲午`,
    nickname: `불타오르는 나무`,
    nicknameEn: `Burning Tree`,
    personality: `甲午(갑오) 일주는 한여름의 뜨거운 태양 아래 서 있는 나무, 혹은 장작불처럼 타오르는 형상입니다. 에너지가 넘치고 자기표현력이 매우 뛰어나며, 예술적 감수성과 창의력이 풍부합니다. 솔직하고 숨김없는 성격으로 주변을 밝게 만들지만, 감정의 기복이 뚜렷하고 때로는 불같은 성미를 드러냅니다.`,
    personalityEn: `The Gabo (甲午) pillar resembles a tree standing under the hot midsummer sun, or a blazing firewood. They are energetic, highly expressive, and rich in artistic sensibility and creativity. They brighten their surroundings with an honest and open personality, but have distinct emotional swings and sometimes show a fiery temper.`,
    strength: `甲木이 자신을 태워 午火를 생하는 구조로, 자신의 에너지를 아낌없이 쏟아부어 대중을 매료시키는 탁월한 표현력과 폭발적인 창작열을 지니고 있습니다.`,
    strengthEn: `As Yang Wood burns itself to generate Horse Fire, you possess outstanding expressiveness and explosive creative passion, unsparingly pouring out your energy to fascinate the public.`,
    weakness: `일간이 땔감처럼 소진되는 목생화(木生火)의 흐름 때문에 시작할 때는 누구보다 불타오르지만, 금세 체력과 흥미가 고갈되어 용두사미로 끝나는 뒷심 부족이 고질병입니다.`,
    weaknessEn: `Due to the Wood-generating-Fire flow where the Day Stem is consumed like firewood, you burn brighter than anyone at the start, but your stamina and interest quickly deplete, suffering from a chronic lack of follow-through ending anti-climactically.`,
    career: `예술가, 연예인, 방송인, 마케터, 디자이너. (창의력과 표현력을 마음껏 발산할 수 있는 분야)`,
    careerEn: `Artist, Entertainer, Broadcaster, Marketer, Designer. (Fields where creativity and expression can be fully unleashed)`,
    love: `일간이 일지를 무조건적으로 생해주어 본인이 헌신하는 사랑을 하지만, 그만큼 보상 심리가 커지고, 홍염살의 매력으로 인해 의도치 않게 주변에 이성이 꼬여 본의 아니게 어장관리의 오해를 받습니다.`,
    loveEn: `Because the Day Stem unconditionally generates the Day Branch, you give devoted love, but your expectation for reward grows equally, and due to the Red Beauty charm, you unintentionally attract the opposite sex, being misunderstood as leading people on.`,
    special: `홍염살과 강한 표현욕으로 인해 20대 후반에서 30대 사이 이성 문제나 구설수가 커리어와 얽히는 상황이 반복되므로, 공과 사의 경계를 명확히 하는 것이 평생 과제입니다.`,
    specialEn: `Due to the Red Beauty and strong desire for expression, situations where romantic issues or gossip intertwine with your career repeat between your late 20s and 30s, making setting clear boundaries between public and private life a lifelong task.`
  },
  '갑신': {
    hanja: `甲申`,
    nickname: `바위 위의 소나무`,
    nicknameEn: `Pine on a Rock`,
    personality: `甲申(갑신) 일주는 깎아지른 절벽 바위틈에 굳건히 뿌리내린 소나무의 형상입니다. 척박한 환경 속에서도 살아남는 강인한 정신력과 뛰어난 적응력을 지녔습니다. 겉으로는 나무의 부드러움을 지녔지만 속으로는 바위처럼 단단하고 예리하며, 승부욕과 목적의식이 매우 투철합니다.`,
    personalityEn: `The Gapshin (甲申) pillar is a pine tree firmly rooted in the crevices of a sheer cliff rock. They possess a strong mentality and excellent adaptability to survive even in harsh environments. They have the softness of a tree on the outside but are as hard and sharp as a rock inside, with a very strong competitive spirit and sense of purpose.`,
    strength: `申金(바위) 위에 甲木이 위태롭게 선 금극목(金剋木) 구조라 항상 긴장감을 유지하며, 어떤 압박과 고난 속에서도 상황을 예리하게 돌파해 내는 무서운 생존 본능을 갖췄습니다.`,
    strengthEn: `Standing perilously on Monkey Metal (rock) in a Metal-controlling-Wood structure, you always maintain tension and possess a terrifying survival instinct to sharply break through situations amidst any pressure and hardship.`,
    weakness: `일지가 나를 치는 구조적 스트레스 때문에 속으로는 항상 신경이 곤두서 있어, 목적 달성을 위해 수단과 방법을 가리지 않거나 타인에게 지나치게 차갑고 냉혹하게 대할 우려가 있습니다.`,
    weaknessEn: `Because of the structural stress of the Day Branch hitting you, your nerves are always on edge inside, risking resorting to any means to achieve goals or treating others excessively coldly and ruthlessly.`,
    career: `군경, 외과의사, IT 엔지니어, 스포츠 선수, 전문 기술직. (예리한 판단력과 결단력이 필요한 분야)`,
    careerEn: `Military/Police, Surgeon, IT Engineer, Athlete, Specialized Technician. (Fields requiring sharp judgment and decisiveness)`,
    love: `내가 극을 당하는 관계성으로 인해 연애에서도 나를 억압하거나 지나치게 간섭하는 강한 성향의 파트너를 만나 마음고생을 하거나, 반대로 아예 실용적인 조건만 보고 사랑 없는 결합을 택할 수 있습니다.`,
    loveEn: `Due to the relationship of being controlled, in romance you may suffer by meeting a strong-willed partner who suppresses or overly interferes with you, or conversely, you may choose a loveless union based purely on practical conditions.`,
    special: `편관 칠살의 강렬한 억압을 딛고 일어서는 기운으로, 초년의 혹독한 시련을 이겨낸 후 40대 중반 무렵 특수 전문직이나 권력을 쥐는 자리에서 크게 빛을 발합니다.`,
    specialEn: `With the energy of rising above the intense suppression of the Eccentric Official Seven Killings, after overcoming harsh trials in early years, you shine greatly in special professions or positions of power around your mid-40s.`
  },
  '갑술': {
    hanja: `甲戌`,
    nickname: `가을 산의 단풍`,
    nicknameEn: `Autumn Maple on the Mountain`,
    personality: `甲戌(갑술) 일주는 쓸쓸한 가을 산을 붉게 물들이는 단풍나무, 혹은 마른 땅에 심어진 나무의 형상입니다. 책임감이 강하고 현실 감각이 뛰어나며, 무엇이든 자신의 힘으로 이루어내려는 독립심이 돋보입니다. 겉으로는 화려해 보여도 내면에는 고독감과 철학적인 깊이를 간직하고 있습니다.`,
    personalityEn: `The Gapsul (甲戌) pillar resembles a maple tree coloring a lonely autumn mountain red, or a tree planted in dry land. They have a strong sense of responsibility, excellent realistic sense, and stand out for their independence to achieve everything on their own. Although appearing flashy on the outside, they hold a sense of solitude and philosophical depth within.`,
    strength: `甲木이 메마른 戌土를 극하는 형국으로, 척박하고 가치가 없어 보이는 환경이나 대상에서도 쓸모를 찾아내어 기어코 자신의 이익으로 치환해내는 지독한 현실 감각이 강점입니다.`,
    strengthEn: `As Yang Wood controls the dry Dog Earth, your strength is a fierce realistic sense that finds use even in barren, seemingly worthless environments or objects, ultimately converting them into your own profit.`,
    weakness: `토(土)를 지배하려는 계산이 너무 앞서다 보니 모든 인간관계마저 득실로 따지는 경향이 있어, 겉으로는 화려해도 내면을 터놓을 진짜 내 사람이 부족해 지독한 공허함에 시달립니다.`,
    weaknessEn: `Because your calculation to dominate Earth is too forward, you tend to weigh even human relationships by profit and loss, so while looking flashy outside, you suffer from terrible emptiness due to a lack of genuine people to open up to.`,
    career: `금융업, 부동산, 회계사, 종교인, 철학자. (현실적 이익 창출이나 정신적 수양과 관련된 분야)`,
    careerEn: `Finance, Real Estate, Accountant, Religious figure, Philosopher. (Fields related to realistic profit generation or mental cultivation)`,
    love: `내가 상대를 통제(목극토)해야 직성이 풀리므로, 자신을 돋보이게 해 주면서도 경제적 안정을 뒷받침해 줄 현실적인 조건이 완벽한 상대를 찾으려다 연애 시작 자체가 늦어집니다.`,
    loveEn: `Because you only feel satisfied when controlling the partner (Wood controlling Earth), you try to find a partner with perfect realistic conditions who makes you stand out while supporting your economic stability, often delaying the start of dating itself.`,
    special: `戌土 속에 숨겨진 丁火(상관)와 辛金(정관)의 충돌로 인해, 재물을 모으는 탁월한 재주에도 불구하고 특정 시기에 관재구설(법적 문제)에 휘말려 재산이 크게 요동칠 수 있습니다.`,
    specialEn: `Due to the clash between Jeong Fire (Hurt Official) and Sin Metal (Proper Official) hidden in Dog Earth, despite excellent talent for gathering wealth, you may get involved in legal disputes at certain times, causing your assets to fluctuate greatly.`
  },

  // === 을(乙) 일간 ===
  '을축': {
    hanja: `乙丑`,
    nickname: `인내의 잡초`,
    nicknameEn: `Weed of Patience`,
    personality: `乙丑(을축) 일주는 꽁꽁 언 겨울 땅을 뚫고 나오는 강인한 새싹이나 잡초의 형상입니다. 겉보기에는 부드럽고 유순해 보이지만, 어떤 시련에도 꺾이지 않는 무서운 인내심과 생존력을 지니고 있습니다. 목표를 향해 조용히, 그러나 끊임없이 전진하며 끈기로 승부하는 대기만성형입니다.`,
    personalityEn: `The Eulchuk (乙丑) pillar represents a tough sprout or weed breaking through frozen winter ground. While they appear soft and mild on the outside, they possess a fearsome patience and survival instinct that does not yield to any ordeal. They are late bloomers who move towards their goals quietly but constantly, winning through perseverance.`,
    strength: `여린 乙木이 차갑게 얼어붙은 丑土 속으로 끈질기게 파고드는 목극토(木剋土) 구조로, 겉보기엔 한없이 유순하지만 절대 포기하지 않고 가혹한 환경을 끝내 이겨내는 잡초 같은 돌파력이 으뜸입니다.`,
    strengthEn: `With the fragile Yin Wood persistently digging into the coldly frozen Ox Earth in a Wood-controlling-Earth structure, you look infinitely mild on the outside but possess top-notch weed-like breakthrough ability, never giving up and ultimately overcoming harsh environments.`,
    weakness: `차가운 땅을 파고들며 겪는 생존의 고통이 내면에 깊이 쌓여, 타인에 대한 경계심이 지나치게 강해지고 속마음을 절대 드러내지 않아 음침하고 편협하다는 평가를 받을 수 있습니다.`,
    weaknessEn: `The pain of survival experienced while digging into cold ground piles up deeply inside, making your vigilance towards others excessively strong; by never revealing your true feelings, you may be evaluated as gloomy and narrow-minded.`,
    career: `의학, 농업, 건축, 사회복지, 회계. (장기적인 안목과 끈기가 필요한 보수적인 분야)`,
    careerEn: `Medicine, Agriculture, Architecture, Social Welfare, Accounting. (Conservative fields requiring long-term perspective and patience)`,
    love: `차가운 환경 탓에 낭만보다는 생존과 실용을 최우선으로 삼아, 감정적인 교류보다는 나의 얼어붙은 현실을 녹여줄 확실한 경제력과 듬직함을 갖춘 사람에게만 서서히 마음을 엽니다.`,
    loveEn: `Due to the cold environment, prioritizing survival and practicality over romance, you slowly open your heart only to someone equipped with definite economic power and reliability to melt your frozen reality, rather than emotional exchange.`,
    special: `동토에 뿌리를 내리는 험난한 과정으로 인해 20~30대에는 남모를 눈물과 좌절을 겪으나, 이 혹독함을 인내한 대가로 중년 이후 반드시 부동산이나 실물 자산을 크게 움켜쥐는 알부자가 됩니다.`,
    specialEn: `Due to the difficult process of taking root in frozen earth, you experience secret tears and frustration in your 20s and 30s, but as a reward for enduring this harshness, you definitely become a quietly rich person tightly grasping real estate or tangible assets after middle age.`
  },
  '을묘': {
    hanja: `乙卯`,
    nickname: `푸른 초원의 바람`,
    nicknameEn: `Wind of the Green Prairie`,
    personality: `乙卯(을묘) 일주는 봄바람에 일렁이는 푸른 초원이나 무성한 덩굴 식물의 형상입니다. 사교적이고 부드러우며 환경 적응력이 매우 뛰어납니다. 사람들과 어울리기를 좋아하고 분위기 메이커 역할을 톡톡히 하지만, 내면에는 누구에게도 간섭받기 싫어하는 강한 독립심과 끈질긴 고집이 숨어 있습니다.`,
    personalityEn: `The Eulmyo (乙卯) pillar is like a green prairie swaying in the spring breeze or lush vines. They are sociable, gentle, and have excellent environmental adaptability. They love mingling with people and play the role of a mood maker, but hide a strong independence and persistent stubbornness against interference within.`,
    strength: `乙木과 卯木이 만난 간여지동으로 덩굴이 거대한 숲을 이룬 형상이라, 밟혀도 쓰러지지 않는 집요한 생명력과 타인과 엮이고 섞여 세력을 확장해 나가는 무서운 환경 적응력을 자랑합니다.`,
    strengthEn: `With Yin Wood meeting Rabbit Wood in a same-element structure, forming an image of vines creating a massive forest, you boast persistent vitality that doesn't fall even when stepped on, and terrifying environmental adaptability to expand your influence by intertwining and mixing with others.`,
    weakness: `나와 같은 기운(비견)이 너무 강해 남의 간섭을 극도로 혐오하며, 겉으로는 사람들과 잘 어울리면서도 속으로는 끝까지 자신의 고집을 꺾지 않아 결국 인간관계를 단절시켜버리는 극단성을 지닙니다.`,
    weaknessEn: `Because the energy identical to yours (Friend) is too strong, you extremely detest others' interference; while seemingly getting along well with people outwardly, inwardly you never bend your stubbornness to the end, possessing an extremity that ultimately severs relationships.`,
    career: `언론인, 외교관, 패션업, 기획자, 서비스업. (대인관계와 커뮤니케이션 능력을 발휘하는 분야)`,
    careerEn: `Journalist, Diplomat, Fashion, Planner, Service Industry. (Fields utilizing interpersonal and communication skills)`,
    love: `같은 오행끼리의 만남이므로 나뭇가지가 엉키듯 친구에서 연인으로 발전하는 경우가 많지만, 서로 한 치의 양보도 없이 주도권 싸움을 벌이다가 애증이 교차하는 피곤한 연애 패턴을 반복합니다.`,
    loveEn: `As a meeting of the same elements, cases of developing from friends to lovers like tangled branches are common, but you repeat a tiring dating pattern of love and hate crossing paths while fighting for the initiative without an inch of concession.`,
    special: `건록의 자수성가 기운에 유연한 처세술이 더해져, 부모의 유산이 없어도 30대 중반부터 사람들을 활용한 네트워킹이나 서비스 분야에서 스스로 확고한 자립 기반을 마련합니다.`,
    specialEn: `With the flexible diplomatic skill added to the self-made energy of the Established Official, even without parental inheritance, you establish a firm foundation of independence on your own from your mid-30s in networking or service fields utilizing people.`
  },
  '을사': {
    hanja: `乙巳`,
    nickname: `화려한 덩굴꽃`,
    nicknameEn: `Gorgeous Vine Flower`,
    personality: `乙巳(을사) 일주는 초여름 햇살 아래 화려하게 피어난 꽃이나 불을 머금은 나무의 형상입니다. 두뇌 회전이 매우 빠르고 언변이 청산유수처럼 뛰어나며, 예술적 감각과 미적 안목이 탁월합니다. 화려하고 세련된 것을 좋아하며, 자신의 매력을 적극적으로 발산하여 대중의 시선을 사로잡는 능력이 있습니다.`,
    personalityEn: `The Eulsa (乙巳) pillar resembles a gorgeous flower blooming under the early summer sun or a tree holding fire. They have a very quick brain, excellent eloquence, and outstanding artistic sense and aesthetic eye. They like flashy and sophisticated things, and have the ability to captivate the public's attention by actively radiating their charm.`,
    strength: `乙木이 자신을 태워 巳火(태양/불)를 조력하는 형국으로, 두뇌 회전이 비상하게 빠르고 자신의 아이디어나 미적 감각을 세상에 가장 화려하고 매력적으로 포장하여 선보이는 탁월한 재주가 있습니다.`,
    strengthEn: `As Yin Wood burns itself to assist Snake Fire (sun/fire), your brain rotates extraordinarily fast, and you have an excellent talent for packaging and presenting your ideas or aesthetic sense to the world most gorgeously and attractively.`,
    weakness: `일간이 끊임없이 불에 타들어가는 목생화 구조이다 보니, 화려한 겉모습과 달리 내면은 항상 불안하고 초조하며, 쉽게 싫증을 내어 한 가지 일에 진득하게 매달리지 못하고 에너지를 방전시킵니다.`,
    weaknessEn: `Because it's a Wood-generating-Fire structure where the Day Stem constantly burns, unlike the flashy exterior, your inner self is always anxious and nervous; getting bored easily, you cannot stick patiently to one task and discharge your energy.`,
    career: `방송연예, 항공 승무원, 디자인, 미용, 아나운서. (자신의 매력과 재능을 밖으로 표출하는 분야)`,
    careerEn: `Broadcasting/Entertainment, Flight Attendant, Design, Beauty, Announcer. (Fields where they express their charm and talent outwards)`,
    love: `화(火)로 향하는 강한 표현 욕구 덕분에 첫눈에 반하는 불꽃 같은 사랑을 쉽게 시작하지만, 목(木)이 다 타버리면 식어버리듯 감정의 유효기간이 짧고 새로운 자극을 찾아 환승하려는 변덕이 잦습니다.`,
    loveEn: `Thanks to the strong desire for expression directed towards Fire, you easily start spark-like love at first sight, but just as it cools down when Wood burns out, the shelf life of your emotions is short, and you have frequent fickleness trying to transfer looking for new stimuli.`,
    special: `상관(傷官)의 강한 발산 기운과 역마의 기운이 겹쳐, 한 직장에 머물기보다 20대 후반부터 주거지나 직업을 수시로 바꾸며 타고난 끼를 발산할 때 비로소 사회적 명성을 얻습니다.`,
    specialEn: `With the strong radiating energy of the Hurt Official and the Wandering Star overlapping, rather than staying in one job, you finally gain social fame when radiating your innate flair by frequently changing your residence or job from your late 20s.`
  },
  '을미': {
    hanja: `乙未`,
    nickname: `사막의 선인장`,
    nicknameEn: `Cactus in the Desert`,
    personality: `乙未(을미) 일주는 메마른 여름 땅에 뿌리를 내린 강인한 선인장이나 건초의 형상입니다. 겉보기에는 차분하고 온순해 보이지만 속에는 불같은 열정과 메마른 환경에서도 살아남는 지독한 생존력을 감추고 있습니다. 현실 감각이 매우 뛰어나며, 자신에게 이익이 되는 방향으로 영리하게 움직일 줄 압니다.`,
    personalityEn: `The Eulmi (乙未) pillar is like a tough cactus or hay rooted in dry summer land. While appearing calm and mild on the outside, they hide a fiery passion and a fierce survival instinct to survive even in arid environments. They have a very good realistic sense and know how to move cleverly in a direction that benefits them.`,
    strength: `메마른 사막(未土)에 뿌리를 내린 乙木의 맹렬한 극(剋) 구조로, 척박한 환경 속에서도 한 방울의 물을 찾아내어 살아남는 지독한 생존력과 현실에서 손해를 보지 않는 영악한 계산 능력이 무기입니다.`,
    strengthEn: `With the fierce controlling structure of Yin Wood rooted in a dry desert (Sheep Earth), your weapon is a fierce survival instinct to find a drop of water and survive even in barren environments, and a shrewd calculation ability not to take losses in reality.`,
    weakness: `뜨겁고 마른 흙을 지배하려다 보니 가슴 속에 항시 억눌린 분노(화)가 뭉쳐 있으며, 이익 앞에서 지나치게 야박하게 굴어 인심을 잃고, 스트레스가 극에 달하면 누구도 말릴 수 없는 극단적 폭발성을 드러냅니다.`,
    weaknessEn: `Trying to dominate hot and dry earth, suppressed anger (Fire) is always clumped in your chest; acting too heartlessly in the face of profit loses you public favor, and when stress peaks, you reveal an unstoppable extreme explosiveness.`,
    career: `부동산, 요식업, 재무/회계, 보육, 한의학. (현실적인 이익과 안정을 추구하는 실용적인 분야)`,
    careerEn: `Real Estate, Restaurant Business, Finance/Accounting, Childcare, Oriental Medicine. (Practical fields pursuing realistic profit and stability)`,
    love: `연애조차도 내 생존에 도움이 되는지(목극토)를 철저히 따지는 구조라, 낭만적인 환상보다는 철저히 계산된 조건 만남을 선호하며 상대가 자신의 영역을 1mm라도 침범하면 무섭게 밀어냅니다.`,
    loveEn: `Since it's a structure that thoroughly calculates even romance to see if it helps your survival (Wood controlling Earth), you prefer strictly calculated conditional meetings over romantic illusions, and terrifyingly push away the partner if they invade your territory even 1mm.`,
    special: `백호대살의 극단성 때문에 40대 전후로 재정적 파탄이나 육체적 큰 수술 등 생사의 고비를 경험하기 쉬우나, 이 독한 경험을 거름 삼아 50대 이후 범접할 수 없는 거부로 거듭납니다.`,
    specialEn: `Due to the extremity of the White Tiger, you are prone to experiencing life-or-death crises like financial ruin or major surgery around your 40s, but using this harsh experience as fertilizer, you are reborn as an unapproachable wealthy person after your 50s.`
  },
  '을유': {
    hanja: `乙酉`,
    nickname: `바위 위의 난초`,
    nicknameEn: `Orchid on a Rock`,
    personality: `乙酉(을유) 일주는 차갑고 날카로운 바위 틈에서 피어난 가냘프지만 고고한 난초의 형상입니다. 미적 감각이 매우 탁월하고 결단력이 있으며, 맺고 끊음이 확실합니다. 부드러워 보이는 외모와 달리 내면은 칼처럼 예리하고 비판적이며, 원칙에 어긋나는 것을 참지 못하는 대쪽 같은 성품을 지녔습니다.`,
    personalityEn: `The Eulyu (乙酉) pillar represents a fragile but noble orchid blooming in the crevices of cold and sharp rocks. They have an excellent aesthetic sense, decisiveness, and clear cut-offs. Contrary to their soft appearance, their inner self is as sharp as a knife and critical, possessing an upright character that cannot tolerate things going against principles.`,
    strength: `날카로운 낫(酉金)이 여린 화초(乙木)를 무자비하게 치는 금극목 구조에서 살아남기 위해, 본능적으로 맺고 끊음이 칼같이 확실하며 상황을 예리하게 분석하여 핵심만 남기는 탁월한 통찰력과 결단력을 갖추었습니다.`,
    strengthEn: `To survive in the Metal-controlling-Wood structure where a sharp sickle (Rooster Metal) ruthlessly strikes fragile plants (Yin Wood), you instinctively have knife-like clear cut-offs and possess excellent insight and decisiveness to sharply analyze situations and leave only the core.`,
    weakness: `일지가 끊임없이 나를 공격하는 편관 칠살의 구조라 평생 편두통이나 신경쇠약을 달고 살 만큼 신경이 예민하며, 자신과 타인을 향한 잣대가 너무 가혹하여 스스로를 고립시키고 피 말리게 합니다.`,
    weaknessEn: `With the Eccentric Official Seven Killings structure where the Day Branch constantly attacks you, your nerves are sensitive enough to suffer from migraines or nervous breakdowns lifelong, and the standards towards yourself and others are too harsh, isolating and exhausting yourself.`,
    career: `법조인, 군경, 의료인, 정밀 세공, 감정평가사. (날카로운 판단력과 정밀함이 요구되는 분야)`,
    careerEn: `Lawyer, Military/Police, Medical Professional, Precision Crafting, Appraiser. (Fields requiring sharp judgment and precision)`,
    love: `내가 극을 당하는 불안정성 때문에 나를 보호해 줄 완벽한 상대를 찾으려다 기준이 한없이 높아지며, 연애 중에도 상대의 작은 흠집을 가위로 잘라내듯 비판하여 관계를 파탄 내기 십상입니다.`,
    loveEn: `Due to the instability of being controlled, your standards become infinitely high trying to find a perfect partner to protect you, and even during dating, you easily ruin the relationship by criticizing and cutting out the partner's small flaws like with scissors.`,
    special: `편관의 날이 선 살기(殺氣)를 활인업(의료, 법조, 군경)이나 정밀 세공 등 예리한 직업으로 물상대체하지 않으면, 30~40대 사이에 관재구설이나 큰 질병으로 고통받는 뚜렷한 패턴이 있습니다.`,
    specialEn: `If the sharp killing energy of the Eccentric Official is not substituted with sharp jobs like life-saving professions (medical, legal, military/police) or precision crafting, there is a distinct pattern of suffering from legal disputes or major illnesses between your 30s and 40s.`
  },
  '을해': {
    hanja: `乙亥`,
    nickname: `물 위의 수련`,
    nicknameEn: `Water Lily`,
    personality: `乙亥(을해) 일주는 맑고 깊은 호수 위에 떠 있는 청초한 연꽃이나 부평초의 형상입니다. 감수성이 매우 풍부하고 직관력이 뛰어나며, 타인의 아픔에 깊이 공감하는 따뜻한 마음을 지녔습니다. 세속적인 욕심보다는 정신적인 가치와 학문을 중시하며, 어딘가 신비롭고 영적인 분위기를 풍깁니다.`,
    personalityEn: `The Eulhae (乙亥) pillar is like a pure lotus or duckweed floating on a clear and deep lake. They are very rich in sensibility, have excellent intuition, and possess a warm heart that deeply sympathizes with others' pain. They value spiritual values and academics over worldly greed, and exude a somewhat mysterious and spiritual atmosphere.`,
    strength: `깊은 바다(亥水) 위에 둥둥 떠 있는 부평초(乙木)의 수생목 구조로, 어떤 환경 변화나 장애물이 닥쳐도 거스르지 않고 물 흐르듯 유연하게 대처하며 누구와도 적을 두지 않는 완벽한 처세술과 직관력을 타고났습니다.`,
    strengthEn: `With the Water-generating-Wood structure of duckweed (Yin Wood) floating on a deep sea (Pig Water), you are born with perfect diplomatic skills and intuition to flexibly deal with any environmental changes or obstacles like flowing water without going against them, making no enemies with anyone.`,
    weakness: `물이 너무 깊어 뿌리를 내리지 못하는 탓에 현실 감각이 심각하게 결여되기 쉬우며, 작은 풍파에도 이리저리 휩쓸리며 우유부단하게 결정을 미루다 공허함과 깊은 우울감에 빠지는 고질적인 약점이 있습니다.`,
    weaknessEn: `Because the water is too deep to take root, you are prone to severely lacking a realistic sense, and you have a chronic weakness of being swept around by small winds and waves, indecisively postponing decisions, and falling into emptiness and deep depression.`,
    career: `교육자, 종교인, 심리상담, 예술가, 명리학. (정신적인 깊이와 공감 능력을 발휘하는 분야)`,
    careerEn: `Educator, Religious figure, Psychological Counseling, Artist, Myeong-ri (Fortune-telling). (Fields utilizing spiritual depth and empathy)`,
    love: `수생목의 포용력으로 상대의 아픔까지 다 받아주는 무조건적이고 희생적인 사랑을 베풀지만, 정작 자신은 정착할 곳을 찾지 못해 영혼의 안식처를 찾아 끊임없이 방황하는 낭만적이지만 위태로운 연애를 합니다.`,
    loveEn: `With the inclusiveness of Water generating Wood, you give unconditional and sacrificial love accepting even the partner's pain, but failing to find a place to settle yourself, you engage in a romantic yet precarious romance, constantly wandering in search of a spiritual haven.`,
    special: `역마성과 천문의 기운이 겹쳐, 현실의 치열한 경쟁에 뛰어들기보다 20대부터 유학이나 해외 방랑, 혹은 철학과 명리학 등 깊은 영적 탐구를 통해 정신적인 대기만성을 이룹니다.`,
    specialEn: `With the Wandering Star and Heavenly Gate energy overlapping, rather than jumping into the fierce competition of reality, you achieve spiritual late-blooming through deep spiritual exploration like studying abroad, overseas wandering, or philosophy and fortune-telling from your 20s.`
  }
};
