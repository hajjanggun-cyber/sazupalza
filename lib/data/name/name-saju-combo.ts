export interface NameSajuCombo {
  relation: '상생' | '상극' | '비화';
  title: string;
  titleEn: string;
  effect: string;
  effectEn: string;
  advice: string;
  adviceEn: string;
}

export const NAME_SAJU_COMBO: Record<string, Record<string, NameSajuCombo>> = {
  '목': {
    '목': {
    relation: `비화`,
    title: `거대한 숲을 이루는 구조`,
    titleEn: `Forming a Massive Forest`,
    effect: `사주의 목(木) 기운과 이름의 목(木) 기운이 만나 에너지가 크게 증폭됩니다. 독립심과 추진력이 매우 강해지며, 시작하는 힘과 창의력이 배가되어 새로운 일을 벌이는 데 탁월한 능력을 발휘합니다. 다만 고집이 세지고 유연성이 떨어져 인간관계에서 굽힐 줄 모르는 단점이 부각될 수 있습니다.`,
    effectEn: `The Wood energy of Saju and Name meet, greatly amplifying the energy. Independence and drive become very strong, and the power to start and creativity are doubled, showing excellent ability to initiate new things. However, stubbornness increases and flexibility decreases, highlighting the disadvantage of not knowing how to bend in interpersonal relationships.`,
    advice: `강한 추진력을 바탕으로 나아가되, 타인의 의견을 수용하는 연습을 하세요.`,
    adviceEn: `Move forward based on strong drive, but practice accepting others' opinions.`
    },
    '화': {
    relation: `상생`,
    title: `잠재력을 활활 피우는 구조`,
    titleEn: `Blazing Potential`,
    effect: `사주의 목(木) 기운이 이름의 화(火) 기운을 생조(목생화)하여 재능을 밖으로 화려하게 표출합니다. 표현력, 사교성, 예술적 재능이 극대화되어 대중의 인기를 끌고 명예를 얻기 쉬운 이상적인 조합입니다. 내면의 에너지가 원활하게 분출되어 정신적인 만족도도 높습니다.`,
    effectEn: `The Wood energy of Saju nurtures the Fire energy of the Name (Wood nurtures Fire), gorgeously expressing talents outward. Expressiveness, sociability, and artistic talent are maximized, making it an ideal combination to attract public popularity and gain honor. Inner energy erupts smoothly, leading to high mental satisfaction.`,
    advice: `자신의 재능을 아낌없이 세상에 드러내고 활발히 소통하세요.`,
    adviceEn: `Unsparingly reveal your talents to the world and communicate actively.`
    },
    '토': {
    relation: `상극`,
    title: `개척과 책임의 구조`,
    titleEn: `Pioneering and Responsibility`,
    effect: `사주의 목(木)이 이름의 토(土)를 극(목극토)하는 형국으로, 이름이 사주에 재물이자 목표가 됩니다. 현실적인 목표를 향해 치열하게 나아가며 큰 성취를 이룰 수 있는 잠재력이 있지만, 삶의 과정이 순탄치 않고 피로와 책임감이 가중될 수 있습니다. 위장이나 소화기 계통의 건강에 주의가 필요합니다.`,
    effectEn: `A situation where Saju's Wood controls the Name's Earth (Wood controls Earth), making the name wealth and a goal for the Saju. There is potential to achieve great success by fiercely moving towards realistic goals, but the life process may not be smooth, adding fatigue and responsibility. Attention to stomach and digestive health is needed.`,
    advice: `목표 달성도 중요하지만, 충분한 휴식과 건강 관리를 최우선으로 하세요.`,
    adviceEn: `Achieving goals is important, but make sufficient rest and health management a top priority.`
    },
    '금': {
    relation: `상극`,
    title: `단련과 통제의 구조`,
    titleEn: `Training and Control`,
    effect: `이름의 금(金) 기운이 사주의 목(木)을 극(금극목)하여 타고난 기운을 제어하고 다듬어줍니다. 사주가 너무 강할 경우 훌륭한 통제 장치가 되어 리더십과 규율을 갖추게 하지만, 사주가 약할 때는 억압과 스트레스로 작용하여 신경이 예민해지고 두통이나 간 건강에 무리가 올 수 있습니다.`,
    effectEn: `The Name's Metal energy controls Saju's Wood (Metal controls Wood), controlling and refining the innate energy. If Saju is too strong, it becomes an excellent control mechanism providing leadership and discipline, but if Saju is weak, it acts as suppression and stress, making nerves sensitive and causing strain on headaches or liver health.`,
    advice: `스스로에 대한 엄격한 잣대를 조금 늦추고 마음의 여유를 가지세요.`,
    adviceEn: `Slightly loosen the strict standards on yourself and have peace of mind.`
    },
    '수': {
    relation: `상생`,
    title: `이름이 사주를 키우는 구조`,
    titleEn: `Name Nurtures Destiny`,
    effect: `이름의 수(水) 기운이 사주의 목(木)을 생조(수생목)하여 든든한 후원자 역할을 합니다. 학업 운과 지혜가 상승하며, 어려움에 처했을 때 귀인의 도움을 받아 위기를 순조롭게 넘길 수 있습니다. 내면이 평온해지고 꾸준히 성장할 수 있는 매우 길한 에너지 흐름입니다.`,
    effectEn: `The Name's Water energy nurtures Saju's Wood (Water nurtures Wood), acting as a solid supporter. Academic luck and wisdom rise, and when faced with difficulties, you can smoothly overcome crises with the help of noble people. It is a very auspicious energy flow where the inner self becomes peaceful and steady growth is possible.`,
    advice: `배움과 내적 수양을 꾸준히 지속하면 더 큰 성취를 이룰 수 있습니다.`,
    adviceEn: `If you continue learning and inner cultivation steadily, you can achieve greater success.`
    }
  },
  '화': {
    '목': {
    relation: `상생`,
    title: `이름이 사주를 키우는 구조`,
    titleEn: `Name Nurtures Destiny`,
    effect: `이름의 목(木) 기운이 사주의 화(火)를 생조(목생화)하여 화르르 타오르게 만듭니다. 주변의 도움과 지원이 끊이지 않으며, 에너지가 충만해져 어떤 일이든 열정적으로 밀어붙일 수 있습니다. 학문과 문서를 통해 인정받으며, 창의적인 분야에서 두각을 나타내는 좋은 조합입니다.`,
    effectEn: `The Name's Wood energy nurtures Saju's Fire (Wood nurtures Fire), making it blaze brightly. Help and support from surroundings are constant, and filled with energy, you can passionately push forward with any task. It is a good combination that gets recognized through academics and documents and stands out in creative fields.`,
    advice: `넘치는 에너지를 생산적인 활동에 집중하여 확실한 결과물을 만들어내세요.`,
    adviceEn: `Focus your overflowing energy on productive activities to create clear results.`
    },
    '화': {
    relation: `비화`,
    title: `뜨거운 열정과 불꽃의 구조`,
    titleEn: `Hot Passion and Flame`,
    effect: `사주와 이름 모두 화(火)의 기운으로 가득 차 에너지가 폭발적입니다. 엄청난 추진력과 화려한 매력으로 대중을 사로잡고 단숨에 정상에 오를 수 있는 힘이 있습니다. 하지만 감정 기복이 매우 심해지고 성격이 급해지며, 욱하는 기질로 인해 인간관계에서 구설수에 오르기 쉽습니다.`,
    effectEn: `Both Saju and Name are filled with Fire energy, making the energy explosive. You have the power to captivate the public and reach the top at once with tremendous drive and gorgeous charm. However, emotional swings become very severe, impatience grows, and hot-tempered traits make you prone to gossip in human relationships.`,
    advice: `중요한 결정을 내릴 때는 반드시 한 템포 쉬고 냉정하게 판단하세요.`,
    adviceEn: `When making important decisions, be sure to take a breath and judge cool-headedly.`
    },
    '토': {
    relation: `상생`,
    title: `열정이 결실을 맺는 구조`,
    titleEn: `Passion Bearing Fruit`,
    effect: `사주의 화(火) 기운이 이름의 토(土) 기운을 생조(화생토)하여, 넘치는 열정이 현실적인 안정으로 굳어집니다. 행동과 노력이 실질적인 재물과 성과로 연결되며, 변덕스럽던 마음이 차분하게 가라앉아 끈기를 갖게 됩니다. 표현력이 안정되어 타인에게 신뢰감을 주는 구조입니다.`,
    effectEn: `Saju's Fire energy nurtures the Name's Earth energy (Fire nurtures Earth), solidifying overflowing passion into realistic stability. Actions and efforts connect to practical wealth and results, and the fickle mind calms down to gain perseverance. It is a structure where expressiveness stabilizes, giving trust to others.`,
    advice: `재물 운이 좋으니 장기적인 관점에서 자산 관리와 투자에 신경 쓰세요.`,
    adviceEn: `Wealth luck is good, so pay attention to asset management and investment from a long-term perspective.`
    },
    '금': {
    relation: `상극`,
    title: `목표 달성을 위한 제련의 구조`,
    titleEn: `Smelting for Goal Achievement`,
    effect: `사주의 화(火)가 이름의 금(金)을 극(화극금)하는 형국입니다. 이름이 사주에게 재물과 결실이 되어, 치열한 노력 끝에 확실한 부와 성공을 거머쥘 수 있는 능력을 부여합니다. 다만 이 과정에서 끊임없는 경쟁과 긴장감이 동반되며, 심혈관이나 호흡기 쪽의 건강을 해칠 우려가 있습니다.`,
    effectEn: `A situation where Saju's Fire controls the Name's Metal (Fire controls Metal). The name becomes wealth and fruit for the Saju, granting the ability to grasp definite wealth and success after fierce efforts. However, this process is accompanied by constant competition and tension, with concerns about damaging cardiovascular or respiratory health.`,
    advice: `목표 달성 과정에서 지나친 스트레스를 받지 않도록 마음 챙김이 필요합니다.`,
    adviceEn: `Mindfulness is needed so as not to receive excessive stress during the goal achievement process.`
    },
    '수': {
    relation: `상극`,
    title: `수화상쟁(水火相爭)의 통제 구조`,
    titleEn: `Control of Water and Fire Conflict`,
    effect: `이름의 수(水) 기운이 사주의 화(火)를 극(수극화)하여 불길을 제어합니다. 명예를 중시하고 원칙과 규율을 지키려는 성향이 강해져 공직이나 조직 생활에 유리할 수 있습니다. 하지만 사주가 약할 경우 이름이 사주를 지나치게 억압하여 매사에 위축되고 불안감과 우울감을 느낄 수 있습니다.`,
    effectEn: `The Name's Water energy controls Saju's Fire (Water controls Fire), controlling the flames. The tendency to value honor and observe principles and discipline strengthens, which can be advantageous in public service or organizational life. However, if Saju is weak, the name excessively suppresses Saju, making you shrink in everything and feel anxiety and depression.`,
    advice: `스트레스 관리가 필수적이며, 물과 불이 조화를 이루도록 유연성을 기르세요.`,
    adviceEn: `Stress management is essential, and develop flexibility so that water and fire harmonize.`
    }
  },
  '토': {
    '목': {
    relation: `상극`,
    title: `책임감과 압박의 구조`,
    titleEn: `Responsibility and Pressure`,
    effect: `이름의 목(木) 기운이 사주의 토(土)를 극(목극토)하여 땅에 뿌리를 내리는 형국입니다. 책임감이 부여되고 명예와 승진에 대한 욕구가 커져 사회적으로 인정받기 위해 고군분투하게 됩니다. 관운(직장운, 남편운)이 강해지지만, 그만큼 심리적 압박과 스트레스가 흙처럼 무겁게 짓누를 수 있습니다.`,
    effectEn: `A situation where the Name's Wood energy controls Saju's Earth (Wood controls Earth), taking root in the ground. Responsibility is assigned, and the desire for honor and promotion grows, leading to struggles for social recognition. Official luck (job luck, husband luck) strengthens, but psychological pressure and stress can press down heavily like earth.`,
    advice: `지나친 책임감을 내려놓고, 주변 사람들과 짐을 나누어 지는 지혜가 필요합니다.`,
    adviceEn: `Put down excessive responsibility and need the wisdom to share the burden with people around you.`
    },
    '화': {
    relation: `상생`,
    title: `이름이 사주를 키우는 구조`,
    titleEn: `Name Nurtures Destiny`,
    effect: `이름의 화(火) 기운이 사주의 토(土)를 생조(화생토)하여 따뜻한 햇살이 대지를 비추는 격입니다. 인덕과 학업 운이 좋아지며, 위기 상황에서도 돕는 손길이 나타나 평탄한 삶을 유도합니다. 정서적으로 안정감이 커지고, 부동산이나 문서를 통한 재산 증식에 유리한 흐름을 만듭니다.`,
    effectEn: `The Name's Fire energy nurtures Saju's Earth (Fire nurtures Earth), like warm sunlight shining on the earth. Human virtue and academic luck improve, and helping hands appear even in crisis situations, inducing a smooth life. Emotional stability grows, creating a favorable flow for asset multiplication through real estate or documents.`,
    advice: `주변의 도움을 당연히 여기지 말고, 꾸준한 학문과 자격 취득에 힘쓰세요.`,
    adviceEn: `Do not take help from surroundings for granted, and strive for steady learning and acquiring qualifications.`
    },
    '토': {
    relation: `비화`,
    title: `거대한 태산의 구조`,
    titleEn: `Massive Mountain`,
    effect: `사주와 이름 모두 토(土)의 기운으로 겹쳐 웅장한 산이나 넓은 대지를 이룹니다. 흔들리지 않는 뚝심과 안정감, 신용이 극대화되어 타인에게 깊은 신뢰를 줍니다. 하지만 자기 주관이 지나치게 강해져 타협을 모르는 고집쟁이가 되기 쉬우며, 변화를 싫어하여 발전이 정체될 우려가 있습니다.`,
    effectEn: `Both Saju and Name overlap with Earth energy, forming a grand mountain or broad land. Unshakable perseverance, stability, and credibility are maximized, giving deep trust to others. However, self-subjectivity becomes excessively strong, making it easy to become an uncompromising stubborn person, with concerns of stagnant development due to disliking change.`,
    advice: `고집을 버리고 다른 사람의 의견에 귀 기울이며 유연하게 사고하세요.`,
    adviceEn: `Discard stubbornness, listen to others' opinions, and think flexibly.`
    },
    '금': {
    relation: `상생`,
    title: `재능을 광맥으로 캐내는 구조`,
    titleEn: `Mining Talent as a Gold Vein`,
    effect: `사주의 토(土) 기운이 이름의 금(金) 기운을 생조(토생금)하여, 흙 속에서 보석을 캐내듯 능력이 발현됩니다. 언변과 창의력이 뛰어나며, 자신의 아이디어를 현실적인 결과물로 만들어내는 재주가 탁월합니다. 식복(먹을 복)이 따르고 대인관계가 유연해져 활동 범위가 크게 넓어집니다.`,
    effectEn: `Saju's Earth energy nurtures the Name's Metal energy (Earth nurtures Metal), expressing abilities like mining jewels from dirt. Eloquence and creativity are excellent, with superb talent to turn ideas into realistic results. Food blessings follow, and interpersonal relationships become flexible, greatly widening the scope of activity.`,
    advice: `자신의 능력을 믿고 다방면으로 활동 영역을 넓혀 적극적으로 도전하세요.`,
    adviceEn: `Believe in your abilities, broaden your activity area in various directions, and actively take on challenges.`
    },
    '수': {
    relation: `상극`,
    title: `재물을 가두어 축적하는 구조`,
    titleEn: `Damming to Accumulate Wealth`,
    effect: `사주의 토(土)가 이름의 수(水)를 극(토극수)하는 형국으로, 제방을 쌓아 물을 가두듯 재물을 내 것으로 만드는 조합입니다. 경제적 관념이 뛰어나고 재물에 대한 욕구가 강해 실질적인 부를 축적할 수 있습니다. 단, 돈에 대한 집착이 강해져 인간관계가 삭막해질 수 있으니 주의해야 합니다.`,
    effectEn: `A situation where Saju's Earth controls the Name's Water (Earth controls Water), a combination of making wealth your own like building a dike to trap water. Excellent economic concept and strong desire for wealth allow for accumulating practical wealth. However, caution is needed as obsession with money can make human relationships bleak.`,
    advice: `재물을 모으는 것만큼 베푸는 것의 중요성을 깨닫고 실천하세요.`,
    adviceEn: `Realize the importance of giving as much as gathering wealth and practice it.`
    }
  },
  '금': {
    '목': {
    relation: `상극`,
    title: `결실을 수확하는 제련의 구조`,
    titleEn: `Smelting to Harvest Fruits`,
    effect: `사주의 금(金)이 이름의 목(木)을 극(금극목)하여 도끼로 나무를 다듬는 형국입니다. 이름이 사주에게 재물과 결과를 의미하여, 정확한 판단력과 과감한 실행력으로 실질적인 성과를 거두는 데 매우 유리합니다. 다만 성취 지향적인 태도로 인해 주변과의 갈등이 생기거나 신경이 예민해질 수 있습니다.`,
    effectEn: `A situation where Saju's Metal controls the Name's Wood (Metal controls Wood), shaping wood with an ax. The name means wealth and results for the Saju, which is very advantageous for reaping practical results with accurate judgment and bold execution. However, an achievement-oriented attitude can cause conflicts with surroundings or sensitive nerves.`,
    advice: `과감하게 추진하되, 타인과 마찰이 생기지 않도록 부드러운 화술을 구사하세요.`,
    adviceEn: `Push forward boldly, but use soft conversational skills to avoid friction with others.`
    },
    '화': {
    relation: `상극`,
    title: `규율과 단련의 구조`,
    titleEn: `Discipline and Training`,
    effect: `이름의 화(火) 기운이 사주의 금(金)을 극(화극금)하여 불로 쇠를 달궈 명검을 만드는 조합입니다. 철저한 자기 관리와 규율을 통해 조직 내에서 승진하고 명예를 얻는 데 강점을 보입니다. 그러나 사주가 약할 경우 스트레스와 압박감이 심하여 만성 피로나 호흡기 질환에 시달릴 우려가 있습니다.`,
    effectEn: `A combination where the Name's Fire energy controls Saju's Metal (Fire controls Metal), heating iron with fire to make a fine sword. Shows strength in getting promoted and gaining honor within an organization through thorough self-management and discipline. However, if Saju is weak, severe stress and pressure may lead to concerns about chronic fatigue or respiratory diseases.`,
    advice: `원칙을 지키는 것도 좋지만, 때로는 긴장을 풀고 스스로에게 휴식을 선물하세요.`,
    adviceEn: `Keeping principles is good, but sometimes relax and gift yourself some rest.`
    },
    '토': {
    relation: `상생`,
    title: `이름이 사주를 키우는 구조`,
    titleEn: `Name Nurtures Destiny`,
    effect: `이름의 토(土) 기운이 사주의 금(金)을 생조(토생금)하여 흙 속에서 보석이 빛을 발하도록 돕습니다. 학문, 자격증, 문서 등을 통한 성취가 빠르며, 윗사람이나 조력자의 든든한 후원을 받습니다. 안정적이고 편안한 삶을 살 수 있으나, 때로는 지나친 보호 속에 안주하여 나태해질 위험이 있습니다.`,
    effectEn: `The Name's Earth energy nurtures Saju's Metal (Earth nurtures Metal), helping a jewel shine in the dirt. Achievements through academics, certifications, documents, etc., are fast, and you receive solid support from seniors or assistants. You can live a stable and comfortable life, but sometimes there is a risk of becoming lazy by settling into excessive protection.`,
    advice: `안정된 기반 위에서 안주하지 말고, 새로운 목표를 향해 끊임없이 도전하세요.`,
    adviceEn: `Do not settle on a stable foundation, but constantly challenge yourself towards new goals.`
    },
    '금': {
    relation: `비화`,
    title: `단단한 강철과 날카로움의 구조`,
    titleEn: `Solid Steel and Sharpness`,
    effect: `사주와 이름 모두 금(金)의 기운으로 이루어져 쇠와 쇠가 부딪히는 강력한 형상입니다. 의리와 결단력이 탁월하며, 돌파력과 승부욕이 최고조에 달합니다. 하지만 융통성이 전혀 없어 타협을 모르며, 차갑고 냉혹한 기질로 인해 대인관계에서 큰 마찰과 고립을 초래할 수 있습니다.`,
    effectEn: `Both Saju and Name consist of Metal energy, a powerful image of iron clashing with iron. Loyalty and decisiveness are outstanding, and breakthrough ability and competitive spirit reach their peak. However, with absolutely no flexibility, you know no compromise, and cold and ruthless traits can cause major friction and isolation in interpersonal relationships.`,
    advice: `시비와 논쟁을 피하고, 타인의 실수를 너그럽게 포용하는 연습이 절실합니다.`,
    adviceEn: `Avoid quarrels and arguments, and practicing generously embracing others' mistakes is desperately needed.`
    },
    '수': {
    relation: `상생`,
    title: `재능을 맑게 씻어내는 구조`,
    titleEn: `Washing Talent Clearly`,
    effect: `사주의 금(金) 기운이 이름의 수(水) 기운을 생조(금생수)하여 금수쌍청(金水雙淸)의 맑고 지혜로운 기운을 냅니다. 두뇌가 비상하게 맑아지고 아이디어와 언변이 유창해져, 학자, 예술가, 기획자로서의 능력을 극대화합니다. 흐르는 물처럼 융통성이 뛰어나고 식복도 풍부한 길한 조합입니다.`,
    effectEn: `Saju's Metal energy nurtures the Name's Water energy (Metal nurtures Water), creating the clear and wise energy of gold-water double clarity. The brain becomes extraordinarily clear, and ideas and eloquence become fluent, maximizing abilities as a scholar, artist, or planner. An auspicious combination with excellent flexibility like flowing water and abundant food blessings.`,
    advice: `자신의 뛰어난 두뇌와 아이디어를 세상과 활발히 나누며 소통하세요.`,
    adviceEn: `Actively share and communicate your excellent brain and ideas with the world.`
    }
  },
  '수': {
    '목': {
    relation: `상생`,
    title: `생명력을 불어넣는 구조`,
    titleEn: `Breathing Vitality`,
    effect: `사주의 수(水) 기운이 이름의 목(木) 기운을 생조(수생목)하여 식물을 무성하게 기르는 형상입니다. 창의적인 아이디어가 현실로 구체화되며, 남을 가르치거나 기르는 분야에서 능력을 발휘합니다. 유연한 태도와 다정다감한 성품으로 대인관계가 원만하며, 노력한 만큼 재물이 따르는 순탄한 흐름입니다.`,
    effectEn: `Saju's Water energy nurtures the Name's Wood energy (Water nurtures Wood), an image of growing plants lushly. Creative ideas materialize into reality, and you exhibit abilities in teaching or nurturing others. With a flexible attitude and affectionate character, interpersonal relationships are smooth, and it is a steady flow where wealth follows as much as you exert effort.`,
    advice: `새로운 시도를 두려워하지 말고 당신의 재능을 마음껏 펼치세요.`,
    adviceEn: `Do not fear new attempts and unleash your talents to your heart's content.`
    },
    '화': {
    relation: `상극`,
    title: `재물 쟁취와 통제의 구조`,
    titleEn: `Wealth Snatching and Control`,
    effect: `사주의 수(水)가 이름의 화(火)를 극(수극화)하는 형국입니다. 이름이 사주의 재물이 되어 돈과 결과에 대한 감각이 매우 빠르고 날카로워집니다. 치밀한 계산으로 부를 축적할 수 있지만, 물과 불의 충돌로 인해 감정 기복이 심해지고 심혈관 질환이나 정신적인 스트레스에 노출되기 쉽습니다.`,
    effectEn: `A situation where Saju's Water controls the Name's Fire (Water controls Fire). The name becomes Saju's wealth, making the sense for money and results very quick and sharp. You can accumulate wealth with meticulous calculation, but due to the clash of water and fire, emotional swings become severe, and you are easily exposed to cardiovascular diseases or mental stress.`,
    advice: `재정적 성취도 중요하지만, 평정심을 유지하고 감정을 다스리는 것이 핵심입니다.`,
    adviceEn: `Financial achievement is important, but maintaining equanimity and controlling emotions is key.`
    },
    '토': {
    relation: `상극`,
    title: `강력한 제방과 억압의 구조`,
    titleEn: `Strong Dike and Suppression`,
    effect: `이름의 토(土) 기운이 사주의 수(水)를 극(토극수)하여 흐르는 물을 둑으로 막는 형상입니다. 강한 통제와 규율을 통해 조직의 리더로 성장하거나 명예를 얻는 관운이 강합니다. 그러나 흐르고자 하는 물의 본성을 흙이 막으므로, 심리적으로 억압당하는 답답함을 느끼며 신장이나 방광 계통이 약해질 수 있습니다.`,
    effectEn: `An image where the Name's Earth energy controls Saju's Water (Earth controls Water), blocking flowing water with a dam. Official luck to grow into an organizational leader or gain honor through strong control and discipline is strong. However, since earth blocks the nature of water that wants to flow, you may feel psychologically suppressed frustration, and kidney or bladder systems may weaken.`,
    advice: `억눌린 감정을 건강하게 해소할 수 있는 자신만의 취미나 돌파구를 마련하세요.`,
    adviceEn: `Prepare your own hobby or breakthrough to healthily relieve suppressed emotions.`
    },
    '금': {
    relation: `상생`,
    title: `이름이 사주를 키우는 구조`,
    titleEn: `Name Nurtures Destiny`,
    effect: `이름의 금(金) 기운이 사주의 수(水)를 생조(금생수)하여 마르지 않는 샘물처럼 에너지를 공급합니다. 깊은 지혜와 영감이 솟아나며 학문, 연구, 자격증 취득에 매우 유리합니다. 윗사람의 든든한 조력으로 삶의 안정감이 크지만, 사색에 깊이 빠져 행동력이 다소 떨어지고 현실감이 부족해질 우려가 있습니다.`,
    effectEn: `The Name's Metal energy nurtures Saju's Water (Metal nurtures Water), supplying energy like an unceasing spring. Deep wisdom and inspiration well up, highly advantageous for academics, research, and acquiring qualifications. Life stability is great with solid assistance from seniors, but there are concerns of slightly dropping actionability and lacking realistic sense by falling deeply into contemplation.`,
    advice: `생각만 하기보다는 실천으로 옮기는 실행력을 기르는 것이 중요합니다.`,
    adviceEn: `It is important to develop the execution ability to put into action rather than just thinking.`
    },
    '수': {
    relation: `비화`,
    title: `끝없는 바다와 거센 파도의 구조`,
    titleEn: `Endless Sea and Strong Waves`,
    effect: `사주와 이름이 모두 수(水)의 기운으로 합쳐져 거대한 해일이나 깊은 바다를 이룹니다. 두뇌가 지극히 총명하고 포용력이 바다와 같으나, 속마음을 전혀 알 수 없어 타인이 접근하기 어렵습니다. 독립심과 추진력이 남다르지만, 음적인 기운이 강해져 우울감에 쉽게 빠지고 일의 맺고 끊음이 불분명해질 수 있습니다.`,
    effectEn: `Both Saju and Name combine with Water energy to form a massive tsunami or deep sea. The brain is extremely intelligent and tolerance is like the sea, but true feelings are totally unknown, making it hard for others to approach. Independence and drive are extraordinary, but as yin energy strengthens, you can easily fall into depression and clear cut-offs of tasks can become unclear.`,
    advice: `우울감에 빠지지 않도록 밝고 긍정적인 활동을 의도적으로 늘려보세요.`,
    adviceEn: `Intentionally increase bright and positive activities so as not to fall into depression.`
    }
  }
};
