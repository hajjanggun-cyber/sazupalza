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
    strength: `비상한 두뇌와 뛰어난 학구열. 상황을 객관적으로 분석하고 본질을 꿰뚫어보는 탁월한 통찰력.`,
    strengthEn: `Exceptional intelligence and a strong passion for learning. Outstanding insight to objectively analyze situations and penetrate to the core.`,
    weakness: `생각이 너무 많아 실천력이 떨어질 때가 있음. 타인에게 속마음을 잘 드러내지 않아 차갑게 오해받기도 함.`,
    weaknessEn: `Can lack execution due to overthinking. May be misunderstood as cold because they rarely reveal their true feelings.`,
    career: `교육자, 연구원, 기획자, 심리상담사, 작가. (깊이 있는 탐구와 지적 능력을 발휘할 수 있는 분야)`,
    careerEn: `Educator, Researcher, Planner, Psychological Counselor, Writer. (Fields where they can utilize deep exploration and intellectual abilities)`,
    love: `지적인 대화가 통하는 상대에게 깊이 끌립니다. 한번 마음을 열면 헌신적이지만, 그 과정까지 오랜 시간이 걸립니다.`,
    loveEn: `Deeply attracted to partners who can engage in intellectual conversations. Once they open their heart, they are devoted, but it takes a long time.`,
    special: `학문과 철학적 사고를 통해 대기만성하는 학당귀인의 기운입니다.`,
    specialEn: `An energy that achieves late but great success through academic and philosophical thinking.`
  },
  '갑인': {
    hanja: `甲寅`,
    nickname: `거목의 개척자`,
    nicknameEn: `Pioneer of the Giant Tree`,
    personality: `甲寅(갑인) 일주는 깊은 숲 속에 굳건히 뿌리내린 거대한 소나무의 형상입니다. 독립심이 매우 강하고 주관이 뚜렷하며, 어떤 역경에도 굴하지 않는 강인한 생명력을 지녔습니다. 타인에게 의지하기보다 스스로 길을 개척하는 것을 선호하며, 정직하고 바른 성품으로 주위의 신뢰를 얻습니다.`,
    personalityEn: `The Gapin (甲寅) pillar represents a giant pine tree firmly rooted in a deep forest. They have very strong independence, clear subjectivity, and resilient vitality that does not yield to any adversity. They prefer to pioneer their own path rather than rely on others, and gain trust with their honest and upright character.`,
    strength: `강력한 추진력과 자립심. 한번 결심한 일은 끝까지 밀고 나가는 불굴의 의지와 리더십.`,
    strengthEn: `Strong drive and independence. Indomitable will and leadership to push through once a decision is made.`,
    weakness: `자존심이 지나치게 강해 타협을 모름. 남의 밑에서 일하기 어려워하며 독단적인 결정을 내리기 쉬움.`,
    weaknessEn: `Excessive pride leads to a lack of compromise. Difficult to work under others and prone to making dogmatic decisions.`,
    career: `사업가, 정치인, 경영자, 독립 프리랜서, 군경. (자신의 주도권을 쥐고 이끌어갈 수 있는 분야)`,
    careerEn: `Entrepreneur, Politician, Manager, Independent Freelancer, Military/Police. (Fields where they can take initiative and lead)`,
    love: `자신의 독립성을 존중해주는 듬직한 상대를 원합니다. 연애에서도 주도권을 쥐려 하며 거짓 없는 솔직함을 중시합니다.`,
    loveEn: `Desires a reliable partner who respects their independence. Tends to take the lead in romance and values unfeigned honesty.`,
    special: `스스로의 힘으로 자수성가하여 큰 뜻을 이루는 강력한 기운입니다.`,
    specialEn: `A powerful energy that achieves great aspirations through self-made success.`
  },
  '갑진': {
    hanja: `甲辰`,
    nickname: `푸른 용의 비상`,
    nicknameEn: `Flight of the Blue Dragon`,
    personality: `甲辰(갑진) 일주는 기름지고 비옥한 땅에 뿌리를 내린 튼튼한 나무이자, 봄비 속을 비상하는 푸른 용의 형상입니다. 이상이 높고 스케일이 크며, 포용력과 리더십을 두루 갖추고 있습니다. 현실적인 감각과 진취적인 기상이 조화를 이루어, 목표를 향해 거침없이 나아가는 긍정적 에너지가 넘칩니다.`,
    personalityEn: `The Gapjin (甲辰) pillar is a sturdy tree rooted in fertile land, and a blue dragon soaring in the spring rain. They have high ideals, a large scale, and possess both tolerance and leadership. Realistic sense and progressive spirit harmonize, overflowing with positive energy to advance towards their goals without hesitation.`,
    strength: `탁월한 위기 대처 능력과 배짱. 이상을 현실로 만들어내는 실행력과 사람들을 아우르는 카리스마.`,
    strengthEn: `Excellent crisis management skills and boldness. Execution ability to turn ideals into reality and charisma to embrace people.`,
    weakness: `성격이 급하고 승부욕이 지나쳐 갈등을 초래할 수 있음. 자신감이 자만심으로 변질되지 않도록 주의 필요.`,
    weaknessEn: `Impatient and overly competitive, which can cause conflicts. Needs to be careful that confidence does not turn into arrogance.`,
    career: `기업가, 금융업, 무역업, 법조인, 고위 공직자. (큰 스케일과 도전 정신이 필요한 분야)`,
    careerEn: `Entrepreneur, Finance, Trade, Lawyer, High-ranking Public Official. (Fields requiring large scale and challenging spirit)`,
    love: `함께 성장하고 발전할 수 있는 동반자를 찾습니다. 열정적이고 다이내믹한 연애를 선호합니다.`,
    loveEn: `Seeks a companion to grow and develop with. Prefers passionate and dynamic romance.`,
    special: `큰 재물과 명예를 모두 거머쥘 수 있는 백호대살의 강렬한 기운입니다.`,
    specialEn: `An intense energy capable of grasping both great wealth and honor.`
  },
  '갑오': {
    hanja: `甲午`,
    nickname: `불타오르는 나무`,
    nicknameEn: `Burning Tree`,
    personality: `甲午(갑오) 일주는 한여름의 뜨거운 태양 아래 서 있는 나무, 혹은 장작불처럼 타오르는 형상입니다. 에너지가 넘치고 자기표현력이 매우 뛰어나며, 예술적 감수성과 창의력이 풍부합니다. 솔직하고 숨김없는 성격으로 주변을 밝게 만들지만, 감정의 기복이 뚜렷하고 때로는 불같은 성미를 드러냅니다.`,
    personalityEn: `The Gabo (甲午) pillar resembles a tree standing under the hot midsummer sun, or a blazing firewood. They are energetic, highly expressive, and rich in artistic sensibility and creativity. They brighten their surroundings with an honest and open personality, but have distinct emotional swings and sometimes show a fiery temper.`,
    strength: `뛰어난 언변과 예술적 재능. 어떤 상황에서도 기죽지 않는 당당함과 번뜩이는 아이디어.`,
    strengthEn: `Excellent eloquence and artistic talent. Confidence that does not shrink in any situation and brilliant ideas.`,
    weakness: `인내심이 부족하여 마무리가 약할 수 있음. 감정 조절이 어려워 순간적인 욱하는 성질로 손해를 보기도 함.`,
    weaknessEn: `Lack of patience can lead to weak finishing. Difficulty in emotion control can cause losses due to momentary anger.`,
    career: `예술가, 연예인, 방송인, 마케터, 디자이너. (창의력과 표현력을 마음껏 발산할 수 있는 분야)`,
    careerEn: `Artist, Entertainer, Broadcaster, Marketer, Designer. (Fields where creativity and expression can be fully unleashed)`,
    love: `불꽃처럼 강렬하고 로맨틱한 사랑을 추구합니다. 시각적인 매력과 감정적 교감을 매우 중요시합니다.`,
    loveEn: `Pursues intense and romantic love like a flame. Highly values visual appeal and emotional connection.`,
    special: `문학과 예술 분야에서 큰 재능을 발휘하는 홍염살의 매력적인 기운입니다.`,
    specialEn: `An attractive energy that shows great talent in literature and art.`
  },
  '갑신': {
    hanja: `甲申`,
    nickname: `바위 위의 소나무`,
    nicknameEn: `Pine on a Rock`,
    personality: `甲申(갑신) 일주는 깎아지른 절벽 바위틈에 굳건히 뿌리내린 소나무의 형상입니다. 척박한 환경 속에서도 살아남는 강인한 정신력과 뛰어난 적응력을 지녔습니다. 겉으로는 나무의 부드러움을 지녔지만 속으로는 바위처럼 단단하고 예리하며, 승부욕과 목적의식이 매우 투철합니다.`,
    personalityEn: `The Gapshin (甲申) pillar is a pine tree firmly rooted in the crevices of a sheer cliff rock. They possess a strong mentality and excellent adaptability to survive even in harsh environments. They have the softness of a tree on the outside but are as hard and sharp as a rock inside, with a very strong competitive spirit and sense of purpose.`,
    strength: `어떤 난관도 뚫고 나가는 강한 돌파력. 상황 판단이 빠르고 다방면에서 재주가 많은 다재다능함.`,
    strengthEn: `Strong breakthrough ability to overcome any difficulty. Quick situation judgment and versatility in many fields.`,
    weakness: `목적 달성을 위해 다소 냉혹해질 수 있음. 내면의 긴장감이 높아 스트레스와 두통에 시달리기 쉬움.`,
    weaknessEn: `Can become somewhat ruthless to achieve goals. High inner tension makes them prone to stress and headaches.`,
    career: `군경, 외과의사, IT 엔지니어, 스포츠 선수, 전문 기술직. (예리한 판단력과 결단력이 필요한 분야)`,
    careerEn: `Military/Police, Surgeon, IT Engineer, Athlete, Specialized Technician. (Fields requiring sharp judgment and decisiveness)`,
    love: `자신을 통제하려 하지 않는, 포용력 있고 따뜻한 상대에게 매력을 느낍니다. 연애에서도 실용성을 중시합니다.`,
    loveEn: `Attracted to tolerant and warm partners who do not try to control them. Values practicality even in romance.`,
    special: `역경을 딛고 일어나 마침내 큰 성취를 이루는 칠살의 강렬한 기운입니다.`,
    specialEn: `An intense energy that overcomes adversity to finally achieve great success.`
  },
  '갑술': {
    hanja: `甲戌`,
    nickname: `가을 산의 단풍`,
    nicknameEn: `Autumn Maple on the Mountain`,
    personality: `甲戌(갑술) 일주는 쓸쓸한 가을 산을 붉게 물들이는 단풍나무, 혹은 마른 땅에 심어진 나무의 형상입니다. 책임감이 강하고 현실 감각이 뛰어나며, 무엇이든 자신의 힘으로 이루어내려는 독립심이 돋보입니다. 겉으로는 화려해 보여도 내면에는 고독감과 철학적인 깊이를 간직하고 있습니다.`,
    personalityEn: `The Gapsul (甲戌) pillar resembles a maple tree coloring a lonely autumn mountain red, or a tree planted in dry land. They have a strong sense of responsibility, excellent realistic sense, and stand out for their independence to achieve everything on their own. Although appearing flashy on the outside, they hold a sense of solitude and philosophical depth within.`,
    strength: `탁월한 재테크 감각과 성실함. 남에게 피해를 주지 않으려 노력하며 맡은 바 책임을 다하는 신뢰감.`,
    strengthEn: `Excellent financial sense and diligence. Trustworthiness in fulfilling responsibilities while trying not to harm others.`,
    weakness: `가슴 속에 채워지지 않는 외로움과 공허함이 있음. 때로는 지나친 계산으로 인해 인간미가 부족해 보일 수 있음.`,
    weaknessEn: `Harbors an unfulfilled loneliness and emptiness in the heart. Sometimes appears lacking in humanity due to excessive calculation.`,
    career: `금융업, 부동산, 회계사, 종교인, 철학자. (현실적 이익 창출이나 정신적 수양과 관련된 분야)`,
    careerEn: `Finance, Real Estate, Accountant, Religious figure, Philosopher. (Fields related to realistic profit generation or mental cultivation)`,
    love: `안정적이고 편안함을 주는 상대방을 찾습니다. 화려함보다는 현실적인 조건을 꼼꼼히 따지는 편입니다.`,
    loveEn: `Seeks a partner who provides stability and comfort. Tends to carefully consider realistic conditions over flashiness.`,
    special: `재물을 모으는 탁월한 능력과 함께 깊은 영성을 동시에 지닌 기운입니다.`,
    specialEn: `An energy that possesses both an outstanding ability to accumulate wealth and deep spirituality.`
  },

  // === 을(乙) 일간 ===
  '을축': {
    hanja: `乙丑`,
    nickname: `인내의 잡초`,
    nicknameEn: `Weed of Patience`,
    personality: `乙丑(을축) 일주는 꽁꽁 언 겨울 땅을 뚫고 나오는 강인한 새싹이나 잡초의 형상입니다. 겉보기에는 부드럽고 유순해 보이지만, 어떤 시련에도 꺾이지 않는 무서운 인내심과 생존력을 지니고 있습니다. 목표를 향해 조용히, 그러나 끊임없이 전진하며 끈기로 승부하는 대기만성형입니다.`,
    personalityEn: `The Eulchuk (乙丑) pillar represents a tough sprout or weed breaking through frozen winter ground. While they appear soft and mild on the outside, they possess a fearsome patience and survival instinct that does not yield to any ordeal. They are late bloomers who move towards their goals quietly but constantly, winning through perseverance.`,
    strength: `상상 이상의 끈기와 성실함. 어떤 열악한 환경에서도 살아남아 결국 결실을 맺는 잡초 같은 근성.`,
    strengthEn: `Unimaginable perseverance and diligence. Weed-like tenacity to survive in any harsh environment and eventually bear fruit.`,
    weakness: `고집이 세고 변화를 두려워하는 보수적인 성향. 속마음을 너무 숨겨 음침하거나 이기적이라는 오해를 살 수 있음.`,
    weaknessEn: `Stubborn and conservative tendency to fear change. Hiding true feelings too much can lead to misunderstandings of being gloomy or selfish.`,
    career: `의학, 농업, 건축, 사회복지, 회계. (장기적인 안목과 끈기가 필요한 보수적인 분야)`,
    careerEn: `Medicine, Agriculture, Architecture, Social Welfare, Accounting. (Conservative fields requiring long-term perspective and patience)`,
    love: `쉽게 마음을 열지 않지만, 한번 맺은 인연은 끝까지 지키려는 지고지순함이 있습니다. 안정감을 가장 중시합니다.`,
    loveEn: `Not easy to open their heart, but has a pure devotion to keep the bond to the end once formed. Values stability the most.`,
    special: `은근과 끈기로 험난한 과정을 이겨내고 마침내 재물을 거머쥐는 기운입니다.`,
    specialEn: `An energy that overcomes difficult processes with hidden perseverance to finally grasp wealth.`
  },
  '을묘': {
    hanja: `乙卯`,
    nickname: `푸른 초원의 바람`,
    nicknameEn: `Wind of the Green Prairie`,
    personality: `乙卯(을묘) 일주는 봄바람에 일렁이는 푸른 초원이나 무성한 덩굴 식물의 형상입니다. 사교적이고 부드러우며 환경 적응력이 매우 뛰어납니다. 사람들과 어울리기를 좋아하고 분위기 메이커 역할을 톡톡히 하지만, 내면에는 누구에게도 간섭받기 싫어하는 강한 독립심과 끈질긴 고집이 숨어 있습니다.`,
    personalityEn: `The Eulmyo (乙卯) pillar is like a green prairie swaying in the spring breeze or lush vines. They are sociable, gentle, and have excellent environmental adaptability. They love mingling with people and play the role of a mood maker, but hide a strong independence and persistent stubbornness against interference within.`,
    strength: `탁월한 친화력과 융통성. 덩굴이 벽을 타고 오르듯 주변 상황을 영리하게 활용하여 위기를 극복하는 능력.`,
    strengthEn: `Excellent sociability and flexibility. Ability to cleverly use surrounding situations to overcome crises, like vines climbing a wall.`,
    weakness: `귀가 얇아 주위의 말에 쉽게 흔들릴 수 있음. 고집을 부릴 때는 끝을 보려 하여 관계를 단절하기도 함.`,
    weaknessEn: `Gullible and easily swayed by surrounding opinions. When stubborn, they try to see it to the end, sometimes severing relationships.`,
    career: `언론인, 외교관, 패션업, 기획자, 서비스업. (대인관계와 커뮤니케이션 능력을 발휘하는 분야)`,
    careerEn: `Journalist, Diplomat, Fashion, Planner, Service Industry. (Fields utilizing interpersonal and communication skills)`,
    love: `친구처럼 편안하고 소통이 잘 되는 연애를 추구합니다. 상대의 속박을 매우 싫어하며 자유로운 관계를 원합니다.`,
    loveEn: `Pursues a comfortable and communicative romance like friends. Strongly dislikes being restrained by a partner and desires a free relationship.`,
    special: `사람과의 인연을 통해 기회를 창출하고 위기를 넘기는 끈질긴 생명력의 기운입니다.`,
    specialEn: `An energy of persistent vitality that creates opportunities and overcomes crises through human connections.`
  },
  '을사': {
    hanja: `乙巳`,
    nickname: `화려한 덩굴꽃`,
    nicknameEn: `Gorgeous Vine Flower`,
    personality: `乙巳(을사) 일주는 초여름 햇살 아래 화려하게 피어난 꽃이나 불을 머금은 나무의 형상입니다. 두뇌 회전이 매우 빠르고 언변이 청산유수처럼 뛰어나며, 예술적 감각과 미적 안목이 탁월합니다. 화려하고 세련된 것을 좋아하며, 자신의 매력을 적극적으로 발산하여 대중의 시선을 사로잡는 능력이 있습니다.`,
    personalityEn: `The Eulsa (乙巳) pillar resembles a gorgeous flower blooming under the early summer sun or a tree holding fire. They have a very quick brain, excellent eloquence, and outstanding artistic sense and aesthetic eye. They like flashy and sophisticated things, and have the ability to captivate the public's attention by actively radiating their charm.`,
    strength: `뛰어난 화술과 순발력. 타인의 마음을 사로잡는 강력한 매력과 타고난 예술적, 창의적 재능.`,
    strengthEn: `Excellent conversational skills and quick wit. Strong charm that captivates others' hearts and innate artistic and creative talent.`,
    weakness: `감정 기복이 심하고 싫증을 빨리 내는 경향. 화려함 뒤에 숨겨진 신경질적이고 예민한 성향.`,
    weaknessEn: `Severe emotional swings and a tendency to get bored quickly. Nervous and sensitive disposition hidden behind flashiness.`,
    career: `방송연예, 항공 승무원, 디자인, 미용, 아나운서. (자신의 매력과 재능을 밖으로 표출하는 분야)`,
    careerEn: `Broadcasting/Entertainment, Flight Attendant, Design, Beauty, Announcer. (Fields where they express their charm and talent outwards)`,
    love: `로맨틱하고 열정적인 연애의 달인입니다. 시각적으로 매력적이고 센스 있는 상대에게 끌리며 금방 사랑에 빠지기도 합니다.`,
    loveEn: `A master of romantic and passionate dating. Attracted to visually appealing and sensible partners, and can fall in love quickly.`,
    special: `타고난 끼와 화술로 대중의 사랑을 받으며 큰 성취를 이루는 기운입니다.`,
    specialEn: `An energy that achieves great success by receiving the public's love through innate flair and eloquence.`
  },
  '을미': {
    hanja: `乙未`,
    nickname: `사막의 선인장`,
    nicknameEn: `Cactus in the Desert`,
    personality: `乙未(을미) 일주는 메마른 여름 땅에 뿌리를 내린 강인한 선인장이나 건초의 형상입니다. 겉보기에는 차분하고 온순해 보이지만 속에는 불같은 열정과 메마른 환경에서도 살아남는 지독한 생존력을 감추고 있습니다. 현실 감각이 매우 뛰어나며, 자신에게 이익이 되는 방향으로 영리하게 움직일 줄 압니다.`,
    personalityEn: `The Eulmi (乙未) pillar is like a tough cactus or hay rooted in dry summer land. While appearing calm and mild on the outside, they hide a fiery passion and a fierce survival instinct to survive even in arid environments. They have a very good realistic sense and know how to move cleverly in a direction that benefits them.`,
    strength: `탁월한 현실 적응력과 생활력. 어떤 상황에서도 손해를 보지 않는 계산 능력과 놀라운 인내심.`,
    strengthEn: `Excellent realistic adaptability and vitality. Calculation ability not to lose in any situation and amazing patience.`,
    weakness: `이해타산이 너무 밝아 야박하다는 평가를 받을 수 있음. 내면에 화(火)가 쌓여 있어 한 번 폭발하면 무서움.`,
    weaknessEn: `Can be evaluated as heartless due to being too calculating. Has inner anger built up, which is terrifying when it explodes once.`,
    career: `부동산, 요식업, 재무/회계, 보육, 한의학. (현실적인 이익과 안정을 추구하는 실용적인 분야)`,
    careerEn: `Real Estate, Restaurant Business, Finance/Accounting, Childcare, Oriental Medicine. (Practical fields pursuing realistic profit and stability)`,
    love: `안정적인 미래를 함께 그릴 수 있는 현실적인 파트너를 원합니다. 감정보다는 조건과 생활력을 깐깐하게 봅니다.`,
    loveEn: `Desires a realistic partner to draw a stable future with. Strictly looks at conditions and vitality rather than emotions.`,
    special: `고난을 묵묵히 견뎌내어 마침내 경제적인 안정을 쟁취하는 끈기의 기운입니다.`,
    specialEn: `An energy of perseverance that silently endures hardships to finally win economic stability.`
  },
  '을유': {
    hanja: `乙酉`,
    nickname: `바위 위의 난초`,
    nicknameEn: `Orchid on a Rock`,
    personality: `乙酉(을유) 일주는 차갑고 날카로운 바위 틈에서 피어난 가냘프지만 고고한 난초의 형상입니다. 미적 감각이 매우 탁월하고 결단력이 있으며, 맺고 끊음이 확실합니다. 부드러워 보이는 외모와 달리 내면은 칼처럼 예리하고 비판적이며, 원칙에 어긋나는 것을 참지 못하는 대쪽 같은 성품을 지녔습니다.`,
    personalityEn: `The Eulyu (乙酉) pillar represents a fragile but noble orchid blooming in the crevices of cold and sharp rocks. They have an excellent aesthetic sense, decisiveness, and clear cut-offs. Contrary to their soft appearance, their inner self is as sharp as a knife and critical, possessing an upright character that cannot tolerate things going against principles.`,
    strength: `날카로운 분석력과 과감한 결단력. 주변 환경에 휩쓸리지 않고 자신의 원칙을 지키는 소신.`,
    strengthEn: `Sharp analytical skills and bold decisiveness. Conviction to keep their principles without being swayed by the surrounding environment.`,
    weakness: `타인에 대한 비판이 매섭고 완벽주의가 심해 피곤함을 자초함. 신경이 예민하여 스트레스에 취약함.`,
    weaknessEn: `Harsh criticism of others and severe perfectionism bring fatigue upon themselves. Vulnerable to stress due to sensitive nerves.`,
    career: `법조인, 군경, 의료인, 정밀 세공, 감정평가사. (날카로운 판단력과 정밀함이 요구되는 분야)`,
    careerEn: `Lawyer, Military/Police, Medical Professional, Precision Crafting, Appraiser. (Fields requiring sharp judgment and precision)`,
    love: `자신의 예민함을 감싸줄 수 있는 포용력 넓은 상대를 찾습니다. 연애 과정에서도 호불호와 선이 매우 명확합니다.`,
    loveEn: `Seeks a widely tolerant partner who can embrace their sensitivity. Likes, dislikes, and boundaries are very clear even in the dating process.`,
    special: `가위로 가지치기를 하듯 불필요한 것을 잘라내고 핵심만 남기는 예리한 편관의 기운입니다.`,
    specialEn: `A sharp energy that cuts off unnecessary things and leaves only the core, like pruning with scissors.`
  },
  '을해': {
    hanja: `乙亥`,
    nickname: `물 위의 수련`,
    nicknameEn: `Water Lily`,
    personality: `乙亥(을해) 일주는 맑고 깊은 호수 위에 떠 있는 청초한 연꽃이나 부평초의 형상입니다. 감수성이 매우 풍부하고 직관력이 뛰어나며, 타인의 아픔에 깊이 공감하는 따뜻한 마음을 지녔습니다. 세속적인 욕심보다는 정신적인 가치와 학문을 중시하며, 어딘가 신비롭고 영적인 분위기를 풍깁니다.`,
    personalityEn: `The Eulhae (乙亥) pillar is like a pure lotus or duckweed floating on a clear and deep lake. They are very rich in sensibility, have excellent intuition, and possess a warm heart that deeply sympathizes with others' pain. They value spiritual values and academics over worldly greed, and exude a somewhat mysterious and spiritual atmosphere.`,
    strength: `깊은 지혜와 뛰어난 직관력, 영감. 누구와도 적을 두지 않고 물 흐르듯 유연하게 대처하는 처세술.`,
    strengthEn: `Deep wisdom, excellent intuition, and inspiration. A diplomatic skill to adapt smoothly like flowing water without making enemies.`,
    weakness: `현실 감각이 다소 떨어지고 우울증이나 공허함에 빠지기 쉬움. 결단력이 부족하여 결정을 미루는 경향.`,
    weaknessEn: `Somewhat lacking in realistic sense and prone to depression or emptiness. Tendency to postpone decisions due to lack of decisiveness.`,
    career: `교육자, 종교인, 심리상담, 예술가, 명리학. (정신적인 깊이와 공감 능력을 발휘하는 분야)`,
    careerEn: `Educator, Religious figure, Psychological Counseling, Artist, Myeong-ri (Fortune-telling). (Fields utilizing spiritual depth and empathy)`,
    love: `영혼이 통하는 소울메이트를 갈망합니다. 조건보다는 정신적인 교감을 최우선으로 여기며 희생적인 사랑을 하기도 합니다.`,
    loveEn: `Longs for a soulmate with whom their soul connects. Puts spiritual communion above conditions and sometimes engages in sacrificial love.`,
    special: `바다를 떠도는 배처럼 해외 진출이나 방랑을 통해 큰 깨달음을 얻는 역마와 천문의 기운입니다.`,
    specialEn: `An energy of wandering and heavenly gate that gains great enlightenment through overseas advancement or wandering like a ship roaming the sea.`
  }
};
