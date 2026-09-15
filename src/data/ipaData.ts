import { IPASound } from '../types';

export const IPA_SOUNDS: IPASound[] = [
  // ===================== MONOPHTHONGS (SHORT) =====================
  {
    id: 'short_i',
    symbol: 'ɪ',
    name: 'Short I (Âm i ngắn)',
    category: 'monophthong_short',
    categoryNameVi: 'Nguyên âm ngắn',
    exampleWords: [
      { word: 'ship', ipa: '/ʃɪp/', meaningVi: 'con tàu' },
      { word: 'sit', ipa: '/sɪt/', meaningVi: 'ngồi' },
      { word: 'bit', ipa: '/bɪt/', meaningVi: 'một chút' },
      { word: 'fish', ipa: '/fɪʃ/', meaningVi: 'con cá' },
      { word: 'live', ipa: '/lɪv/', meaningVi: 'sống' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Mở miệng hờ, khóe môi hơi thả lỏng (không căng mép như âm /iː/).',
        'Đưa phần thân trước của lưỡi lên cao gần vòm miệng trên nhưng thấp hơn âm /iː/.',
        'Phát âm dứt khoát, âm thanh ngắn và trầm hơn âm "i" tiếng Việt, hơi lai giữa "i" và "ê".'
      ],
      vietnameseMistakeTip: 'Người Việt hay phát âm quá dài thành "i" hoặc nhầm với "ê". Cần phát âm nhanh, dứt khoát, thả lỏng cơ miệng.',
      phoneticDescriptionVi: 'Âm i ngắn, mở nhẹ miệng, phát âm dứt khoát trong vòng 0.2 giây.'
    },
    minimalPairs: [
      {
        soundA: 'ɪ',
        wordA: 'ship',
        ipaA: '/ʃɪp/',
        meaningA: 'con tàu',
        soundB: 'iː',
        wordB: 'sheep',
        ipaB: '/ʃiːp/',
        meaningB: 'con cừu',
        distinctionTip: '/ɪ/ âm ngắn dứt khoát; /iː/ căng khóe môi cười và ngân dài.'
      },
      {
        soundA: 'ɪ',
        wordA: 'sit',
        ipaA: '/sɪt/',
        meaningA: 'ngồi',
        soundB: 'iː',
        wordB: 'seat',
        ipaB: '/siːt/',
        meaningB: 'chỗ ngồi',
        distinctionTip: 'Sit là âm ngắn /ɪ/, Seat là âm dài /iː/.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      activeRing: 'ring-emerald-500'
    }
  },
  {
    id: 'short_e',
    symbol: 'e',
    name: 'Short E (Âm e)',
    category: 'monophthong_short',
    categoryNameVi: 'Nguyên âm ngắn',
    exampleWords: [
      { word: 'bed', ipa: '/bed/', meaningVi: 'chiếc giường' },
      { word: 'pen', ipa: '/pen/', meaningVi: 'cây bút' },
      { word: 'red', ipa: '/red/', meaningVi: 'màu đỏ' },
      { word: 'head', ipa: '/hed/', meaningVi: 'cái đầu' },
      { word: 'men', ipa: '/men/', meaningVi: 'đàn ông (số nhiều)' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'half-closed',
      vocalCords: 'voiced',
      airflow: 'continuous',
      sagittalColorImageUrl: '/images/ipa_e_sagittal_color.svg',
      sagittalImageUrl: '/images/ipa_e_sagittal.svg',
      lipsImageUrl: '/images/ipa_e_front_lips.svg',
      vowelChartUrl: '/images/ipa_vowel_chart.svg',
      stepByStep: [
        'Mở miệng rộng vừa phải hơn âm /ɪ/.',
        'Thân lưỡi đặt ở độ cao trung bình trong khoang miệng.',
        'Môi thả lỏng tự nhiên, phát âm ngắn tương tự chữ "e" trong tiếng Việt.'
      ],
      vietnameseMistakeTip: 'Người Việt hay mở miệng quá rộng thành âm /æ/ (e bẹt) hoặc khép quá thành /ɪ/. Giữ độ mở hàm trung bình.',
      phoneticDescriptionVi: 'Âm e ngắn tự nhiên, độ mở miệng trung bình.'
    },
    minimalPairs: [
      {
        soundA: 'e',
        wordA: 'bed',
        ipaA: '/bed/',
        meaningA: 'chiếc giường',
        soundB: 'æ',
        wordB: 'bad',
        ipaB: '/bæd/',
        meaningB: 'xấu/tệ',
        distinctionTip: '/e/ mở hàm vừa phải; /æ/ hạ cằm sâu, kéo mép môi sang hai bên.'
      },
      {
        soundA: 'e',
        wordA: 'men',
        ipaA: '/men/',
        meaningA: 'những người đàn ông',
        soundB: 'æ',
        wordB: 'man',
        ipaB: '/mæn/',
        meaningB: 'người đàn ông',
        distinctionTip: 'Men là số nhiều (/e/), Man là số ít (/æ/).'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      activeRing: 'ring-emerald-500'
    }
  },
  {
    id: 'short_ae',
    symbol: 'æ',
    name: 'Short Ash / E bẹt (Âm a/e bẹt)',
    category: 'monophthong_short',
    categoryNameVi: 'Nguyên âm ngắn',
    exampleWords: [
      { word: 'cat', ipa: '/kæt/', meaningVi: 'con mèo' },
      { word: 'apple', ipa: '/ˈæpl/', meaningVi: 'quả táo' },
      { word: 'hat', ipa: '/hæt/', meaningVi: 'cái mũ' },
      { word: 'black', ipa: '/blæk/', meaningVi: 'màu đen' },
      { word: 'map', ipa: '/mæp/', meaningVi: 'bản đồ' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'low',
      lipShape: 'spread',
      jawOpening: 'open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Hạ hàm dưới xuống thấp, miệng mở rộng hết cỡ.',
        'Mép môi kéo căng sang hai bên như đang cười lớn.',
        'Lưỡi đặt thấp sát đáy hàm dưới, phát âm dứt khoát âm lai giữa "a" và "e".'
      ],
      vietnameseMistakeTip: 'Lỗi rất phổ biến: phát âm thành "a" thuần túy hoặc "e" thông thường. Bí quyết: Hạ cằm sâu và bẹt khóe miệng.',
      phoneticDescriptionVi: 'Âm e bẹt, miệng mở cực rộng, âm thanh vang và dứt khoát.'
    },
    minimalPairs: [
      {
        soundA: 'æ',
        wordA: 'bad',
        ipaA: '/bæd/',
        meaningA: 'xấu/tồi',
        soundB: 'e',
        wordB: 'bed',
        ipaB: '/bed/',
        meaningB: 'chiếc giường',
        distinctionTip: '/æ/ hạ cằm sâu hơn hẳn /e/.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      activeRing: 'ring-emerald-500'
    }
  },
  {
    id: 'short_u',
    symbol: 'ʊ',
    name: 'Short U (Âm u ngắn)',
    category: 'monophthong_short',
    categoryNameVi: 'Nguyên âm ngắn',
    exampleWords: [
      { word: 'book', ipa: '/bʊk/', meaningVi: 'quyển sách' },
      { word: 'good', ipa: '/ɡʊd/', meaningVi: 'tốt' },
      { word: 'put', ipa: '/pʊt/', meaningVi: 'đặt/để' },
      { word: 'foot', ipa: '/fʊt/', meaningVi: 'bàn chân' },
      { word: 'look', ipa: '/lʊk/', meaningVi: 'nhìn' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'high',
      lipShape: 'round',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Môi hơi tròn nhẹ, không chu môi quá nhiều như âm /uː/.',
        'Gốc lưỡi nâng lên cao về phía sau họng nhưng thấp hơn /uː/.',
        'Phát âm ngắn, dứt khoát, âm thanh trầm hơi lai giữa "u" và "ư".'
      ],
      vietnameseMistakeTip: 'Người Việt hay chu môi quá đà thành "u" dài /uː/. Cần thả lỏng môi hơn và ngắt âm ngay lập tức.',
      phoneticDescriptionVi: 'Âm u ngắn, môi hơi tròn nhẹ, âm thanh bật ra dứt khoát.'
    },
    minimalPairs: [
      {
        soundA: 'ʊ',
        wordA: 'look',
        ipaA: '/lʊk/',
        meaningA: 'nhìn',
        soundB: 'uː',
        wordB: 'Luke',
        ipaB: '/luːk/',
        meaningB: 'tên người Luke',
        distinctionTip: '/ʊ/ dứt khoát; /uː/ chu môi sâu hình tròn nhỏ và kéo dài.'
      },
      {
        soundA: 'ʊ',
        wordA: 'pull',
        ipaA: '/pʊl/',
        meaningA: 'kéo',
        soundB: 'uː',
        wordB: 'pool',
        ipaB: '/puːl/',
        meaningB: 'hồ bơi',
        distinctionTip: 'Pull ngắn gọn (/ʊ/), Pool ngân dài chu môi (/uː/).'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      activeRing: 'ring-emerald-500'
    }
  },
  {
    id: 'short_schwa',
    symbol: 'ə',
    name: 'Schwa (Âm ơ ngắn / âm lười)',
    category: 'monophthong_short',
    categoryNameVi: 'Nguyên âm ngắn',
    exampleWords: [
      { word: 'teacher', ipa: '/ˈtiːtʃə/', meaningVi: 'giáo viên' },
      { word: 'banana', ipa: '/bəˈnɑːnə/', meaningVi: 'quả chuối' },
      { word: 'about', ipa: '/əˈbaʊt/', meaningVi: 'về/khoảng' },
      { word: 'sofa', ipa: '/ˈsəʊfə/', meaningVi: 'ghế sô pha' },
      { word: 'doctor', ipa: '/ˈdɒktə/', meaningVi: 'bác sĩ' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Thả lỏng toàn bộ cơ hàm, môi và lưỡi (đây là âm lười nhất trong tiếng Anh).',
        'Lưỡi nằm chính giữa khoang miệng ở trạng thái tự nhiên.',
        'Bật nhẹ luồng hơi ngắn, phát âm giống chữ "ơ" nhẹ và ngắn.'
      ],
      vietnameseMistakeTip: 'Đây là âm xuất hiện nhiều nhất trong tiếng Anh (trong các âm tiết không nhấn trọng âm). Đừng nhấn mạnh âm này.',
      phoneticDescriptionVi: 'Âm Schwa ơ ngắn, cơ miệng thư giãn hoàn toàn, không mang trọng âm.'
    },
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      activeRing: 'ring-emerald-500'
    }
  },
  {
    id: 'short_wedge',
    symbol: 'ʌ',
    name: 'Short Wedge / Strut (Âm á/ă ngắn)',
    category: 'monophthong_short',
    categoryNameVi: 'Nguyên âm ngắn',
    exampleWords: [
      { word: 'cup', ipa: '/kʌp/', meaningVi: 'chiếc cốc' },
      { word: 'bus', ipa: '/bʌs/', meaningVi: 'xe buýt' },
      { word: 'sun', ipa: '/sʌn/', meaningVi: 'mặt trời' },
      { word: 'love', ipa: '/lʌv/', meaningVi: 'tình yêu' },
      { word: 'money', ipa: '/ˈmʌni/', meaningVi: 'tiền bạc' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'low',
      lipShape: 'neutral',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Mở miệng rộng hơn âm /ə/ một chút.',
        'Lưỡi hơi lùi về phía sau và hạ thấp.',
        'Phát âm dứt khoát, gần giống chữ "á" hoặc "ă" trong tiếng Việt.'
      ],
      vietnameseMistakeTip: 'Dễ nhầm với âm /ɑː/ dài hoặc âm /ɒ/. Lưu ý âm này rất ngắn và dứt khoát.',
      phoneticDescriptionVi: 'Âm á ngắn, miệng mở vừa, âm thanh dứt khoát.'
    },
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      activeRing: 'ring-emerald-500'
    }
  },
  {
    id: 'short_o',
    symbol: 'ɒ',
    name: 'Short O / Lot (Âm o ngắn)',
    category: 'monophthong_short',
    categoryNameVi: 'Nguyên âm ngắn',
    exampleWords: [
      { word: 'hot', ipa: '/hɒt/', meaningVi: 'nóng' },
      { word: 'dog', ipa: '/dɒɡ/', meaningVi: 'con chó' },
      { word: 'box', ipa: '/bɒks/', meaningVi: 'cái hộp' },
      { word: 'stop', ipa: '/stɒp/', meaningVi: 'dừng lại' },
      { word: 'coffee', ipa: '/ˈkɒfi/', meaningVi: 'cà phê' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'low',
      lipShape: 'round',
      jawOpening: 'open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Hạ hàm dưới xuống, miệng mở tròn nhẹ.',
        'Lưỡi kéo lùi về phía cuống họng.',
        'Phát âm âm "o" ngắn, dứt khoát, không kéo dài.'
      ],
      vietnameseMistakeTip: 'Người Việt hay phát âm thành "o" dài hoặc "ô". Hãy hạ cằm và giữ âm ngắn.',
      phoneticDescriptionVi: 'Âm o ngắn dứt khoát, khẩu hình tròn nhẹ.'
    },
    colorTheme: {
      badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      activeRing: 'ring-emerald-500'
    }
  },

  // ===================== MONOPHTHONGS (LONG) =====================
  {
    id: 'long_i',
    symbol: 'iː',
    name: 'Long I (Âm i dài)',
    category: 'monophthong_long',
    categoryNameVi: 'Nguyên âm dài',
    exampleWords: [
      { word: 'sheep', ipa: '/ʃiːp/', meaningVi: 'con cừu' },
      { word: 'tree', ipa: '/triː/', meaningVi: 'cái cây' },
      { word: 'tea', ipa: '/tiː/', meaningVi: 'trà' },
      { word: 'see', ipa: '/siː/', meaningVi: 'nhìn thấy' },
      { word: 'eat', ipa: '/iːt/', meaningVi: 'ăn' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'spread',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Kéo căng khóe môi sang hai bên như một nụ cười tươi.',
        'Đưa thân trước lưỡi nâng lên rất sát vòm họng trên.',
        'Ngân dài âm thanh đều đặn khoảng 0.5 - 0.7 giây, giọng trong và sáng.'
      ],
      vietnameseMistakeTip: 'Cần cười căng mép và giữ ngân dài âm i để phân biệt tuyệt đối với âm /ɪ/ ngắn trong ship/sheep.',
      phoneticDescriptionVi: 'Âm i dài, khóe môi kéo căng như đang cười, ngân dài.'
    },
    minimalPairs: [
      {
        soundA: 'iː',
        wordA: 'sheep',
        ipaA: '/ʃiːp/',
        meaningA: 'con cừu',
        soundB: 'ɪ',
        wordB: 'ship',
        ipaB: '/ʃɪp/',
        meaningB: 'con tàu',
        distinctionTip: '/iː/ cười tươi ngân dài; /ɪ/ dứt khoát nhẹ nhàng.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-500/30',
      activeRing: 'ring-indigo-500'
    }
  },
  {
    id: 'long_u',
    symbol: 'uː',
    name: 'Long U (Âm u dài)',
    category: 'monophthong_long',
    categoryNameVi: 'Nguyên âm dài',
    exampleWords: [
      { word: 'moon', ipa: '/muːn/', meaningVi: 'mặt trăng' },
      { word: 'blue', ipa: '/bluː/', meaningVi: 'màu xanh dương' },
      { word: 'food', ipa: '/fuːd/', meaningVi: 'thức ăn' },
      { word: 'shoe', ipa: '/ʃuː/', meaningVi: 'chiếc giày' },
      { word: 'two', ipa: '/tuː/', meaningVi: 'số hai' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'high',
      lipShape: 'round',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Chu môi tròn nhỏ hướng về phía trước như đang huýt sáo.',
        'Cuống lưỡi nâng cao về phía sau vòm mềm.',
        'Ngân dài âm thanh "u" sâu và đều đặn trong cổ họng.'
      ],
      vietnameseMistakeTip: 'Môi phải chu tròn nhỏ và đưa hẳn ra phía trước, duy trì độ dài gấp đôi âm /ʊ/.',
      phoneticDescriptionVi: 'Âm u dài, môi chu tròn nhỏ, âm thanh ngân sâu.'
    },
    colorTheme: {
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-500/30',
      activeRing: 'ring-indigo-500'
    }
  },
  {
    id: 'long_er',
    symbol: 'ɜː',
    name: 'Long ER / Nurse (Âm ơ dài)',
    category: 'monophthong_long',
    categoryNameVi: 'Nguyên âm dài',
    exampleWords: [
      { word: 'bird', ipa: '/bɜːd/', meaningVi: 'con chim' },
      { word: 'girl', ipa: '/ɡɜːl/', meaningVi: 'cô gái' },
      { word: 'nurse', ipa: '/nɜːs/', meaningVi: 'y tá' },
      { word: 'learn', ipa: '/lɜːn/', meaningVi: 'học tập' },
      { word: 'work', ipa: '/wɜːk/', meaningVi: 'làm việc' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Mở miệng vừa phải, môi thả lỏng tự nhiên.',
        'Thân lưỡi nâng nhẹ ở giữa khoang miệng, đầu lưỡi có thể hơi cong nhẹ (trong giọng Mỹ).',
        'Ngân dài âm "ơ" trầm, rung từ sâu trong cổ họng.'
      ],
      vietnameseMistakeTip: 'Người Việt hay phát âm từ "bird" thành "bớt" (âm ngắn) hoặc "bét". Hãy ngân dài âm ơ và uốn nhẹ lưỡi.',
      phoneticDescriptionVi: 'Âm ơ dài, phát âm sâu từ cổ họng, ngân dài vang.'
    },
    colorTheme: {
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-500/30',
      activeRing: 'ring-indigo-500'
    }
  },
  {
    id: 'long_o',
    symbol: 'ɔː',
    name: 'Long O / Thought (Âm o dài / o cong lưỡi)',
    category: 'monophthong_long',
    categoryNameVi: 'Nguyên âm dài',
    exampleWords: [
      { word: 'door', ipa: '/dɔː/', meaningVi: 'cánh cửa' },
      { word: 'ball', ipa: '/bɔːl/', meaningVi: 'quả bóng' },
      { word: 'water', ipa: '/ˈwɔːtə/', meaningVi: 'nước' },
      { word: 'four', ipa: '/fɔː/', meaningVi: 'số bốn' },
      { word: 'law', ipa: '/lɔː/', meaningVi: 'luật pháp' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'mid',
      lipShape: 'round',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Hạ hàm dưới vừa phải, môi chu tròn hình chữ O.',
        'Cuống lưỡi lùi về sau và nâng nhẹ lên.',
        'Phát âm âm "o" sâu và ngân dài.'
      ],
      vietnameseMistakeTip: 'Tròn môi rõ rệt và ngân dài hơn âm "o" tiếng Việt.',
      phoneticDescriptionVi: 'Âm o dài, môi tròn rõ, ngân dài và trầm.'
    },
    colorTheme: {
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-500/30',
      activeRing: 'ring-indigo-500'
    }
  },
  {
    id: 'long_a',
    symbol: 'ɑː',
    name: 'Long A / Palm (Âm a dài)',
    category: 'monophthong_long',
    categoryNameVi: 'Nguyên âm dài',
    exampleWords: [
      { word: 'car', ipa: '/kɑː/', meaningVi: 'xe ô tô' },
      { word: 'father', ipa: '/ˈfɑːðə/', meaningVi: 'người cha' },
      { word: 'star', ipa: '/stɑː/', meaningVi: 'ngôi sao' },
      { word: 'heart', ipa: '/hɑːt/', meaningVi: 'trái tim' },
      { word: 'park', ipa: '/pɑːk/', meaningVi: 'công viên' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'low',
      lipShape: 'neutral',
      jawOpening: 'open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Hạ cằm sâu, mở miệng rộng tự nhiên (như khi bác sĩ khám họng nói "A").',
        'Lưỡi hạ thấp và hơi lùi về phía sau.',
        'Ngân dài âm "a" trầm, sâu và vang từ cuống họng.'
      ],
      vietnameseMistakeTip: 'Mở rộng họng và ngân dài âm "a" từ đáy họng, không phát âm nông như âm "a" tiếng Việt.',
      phoneticDescriptionVi: 'Âm a dài, miệng mở rộng hết cỡ, âm thanh ngân sâu.'
    },
    colorTheme: {
      badgeBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-500/30',
      activeRing: 'ring-indigo-500'
    }
  },

  // ===================== DIPHTHONGS (NGUYÊN ÂM ĐÔI) =====================
  {
    id: 'diph_ei',
    symbol: 'eɪ',
    name: 'Diphthong EI / Face (Âm ê-i / ây)',
    category: 'diphthong',
    categoryNameVi: 'Nguyên âm đôi',
    exampleWords: [
      { word: 'face', ipa: '/feɪs/', meaningVi: 'khuôn mặt' },
      { word: 'day', ipa: '/deɪ/', meaningVi: 'ngày' },
      { word: 'make', ipa: '/meɪk/', meaningVi: 'làm/tạo ra' },
      { word: 'rain', ipa: '/reɪn/', meaningVi: 'cơn mưa' },
      { word: 'eight', ipa: '/eɪt/', meaningVi: 'số tám' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'mid',
      lipShape: 'spread',
      jawOpening: 'half-closed',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Bắt đầu với âm /e/ (miệng mở vừa phải, lưỡi ở giữa).',
        'Lướt mượt mà chuyển dần sang âm /ɪ/ (khóe môi kéo căng nhẹ sang hai bên).',
        'Âm đầu /e/ phát âm dài hơn (70%), âm đuôi /ɪ/ ngắn và nhẹ (30%).'
      ],
      vietnameseMistakeTip: 'Người Việt hay phát âm thành "ây" cứng. Hãy chuyển động cơ miệng mượt mà từ /e/ sang /ɪ/.',
      phoneticDescriptionVi: 'Nguyên âm đôi chuyển động mượt từ /e/ sang /ɪ/.'
    },
    colorTheme: {
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      badgeText: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      activeRing: 'ring-purple-500'
    }
  },
  {
    id: 'diph_ai',
    symbol: 'aɪ',
    name: 'Diphthong AI / Price (Âm a-i / ai)',
    category: 'diphthong',
    categoryNameVi: 'Nguyên âm đôi',
    exampleWords: [
      { word: 'fly', ipa: '/flaɪ/', meaningVi: 'bay' },
      { word: 'time', ipa: '/taɪm/', meaningVi: 'thời gian' },
      { word: 'eye', ipa: '/aɪ/', meaningVi: 'mắt' },
      { word: 'my', ipa: '/maɪ/', meaningVi: 'của tôi' },
      { word: 'night', ipa: '/naɪt/', meaningVi: 'ban đêm' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'low',
      lipShape: 'spread',
      jawOpening: 'open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Khởi đầu với khẩu hình âm /ɑː/ (mở rộng miệng, hạ hàm).',
        'Khép dần hàm lại và kéo căng mép sang hai bên thành âm /ɪ/.',
        'Chuyển động liên tục và nhịp nhàng.'
      ],
      vietnameseMistakeTip: 'Cần mở to miệng ở đầu âm /a/ rồi mới khép dần về /ɪ/, tránh nói dẹt ngay từ đầu.',
      phoneticDescriptionVi: 'Nguyên âm đôi lướt từ /a/ mở rộng sang /ɪ/ khép mép.'
    },
    colorTheme: {
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      badgeText: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      activeRing: 'ring-purple-500'
    }
  },
  {
    id: 'diph_oi',
    symbol: 'ɔɪ',
    name: 'Diphthong OI / Choice (Âm o-i / oi)',
    category: 'diphthong',
    categoryNameVi: 'Nguyên âm đôi',
    exampleWords: [
      { word: 'boy', ipa: '/bɔɪ/', meaningVi: 'cậu bé' },
      { word: 'voice', ipa: '/vɔɪs/', meaningVi: 'giọng nói' },
      { word: 'coin', ipa: '/kɔɪn/', meaningVi: 'đồng xu' },
      { word: 'toy', ipa: '/tɔɪ/', meaningVi: 'đồ chơi' },
      { word: 'point', ipa: '/pɔɪnt/', meaningVi: 'điểm/chỉ' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'mid',
      lipShape: 'round',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Bắt đầu bằng âm /ɔː/ (môi tròn rõ, hàm hơi hạ).',
        'Lướt dần lên âm /ɪ/ (khép nhẹ hàm, mép môi giãn ra).',
        'Âm chuyển mượt mà không bị ngắt quãng.'
      ],
      vietnameseMistakeTip: 'Tròn môi rõ ở âm /ɔː/ đầu tiên rồi mới lướt sang /ɪ/.',
      phoneticDescriptionVi: 'Âm chuyển động từ /ɔː/ tròn môi sang /ɪ/.'
    },
    colorTheme: {
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      badgeText: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      activeRing: 'ring-purple-500'
    }
  },
  {
    id: 'diph_au',
    symbol: 'aʊ',
    name: 'Diphthong AU / Mouth (Âm a-u / ao)',
    category: 'diphthong',
    categoryNameVi: 'Nguyên âm đôi',
    exampleWords: [
      { word: 'now', ipa: '/naʊ/', meaningVi: 'bây giờ' },
      { word: 'house', ipa: '/haʊs/', meaningVi: 'ngôi nhà' },
      { word: 'mouth', ipa: '/maʊθ/', meaningVi: 'miệng' },
      { word: 'cow', ipa: '/kaʊ/', meaningVi: 'con bò' },
      { word: 'sound', ipa: '/saʊnd/', meaningVi: 'âm thanh' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'low',
      lipShape: 'round',
      jawOpening: 'open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Mở miệng to phát âm /ɑː/.',
        'Sau đó thu nhỏ khẩu hình và chu tròn môi lướt sang /ʊ/.',
        'Âm đầu to rõ, âm sau nhỏ nhẹ.'
      ],
      vietnameseMistakeTip: 'Tránh đọc giống "ao" tiếng Việt với môi phẳng; hãy kết thúc với đôi môi chu tròn nhỏ.',
      phoneticDescriptionVi: 'Âm a mở rộng lướt sang u chu tròn môi.'
    },
    colorTheme: {
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      badgeText: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      activeRing: 'ring-purple-500'
    }
  },
  {
    id: 'diph_ou',
    symbol: 'əʊ',
    name: 'Diphthong OU / Goat (Âm ơ-u / ôu)',
    category: 'diphthong',
    categoryNameVi: 'Nguyên âm đôi',
    exampleWords: [
      { word: 'go', ipa: '/ɡəʊ/', meaningVi: 'đi' },
      { word: 'home', ipa: '/həʊm/', meaningVi: 'nhà' },
      { word: 'no', ipa: '/nəʊ/', meaningVi: 'không' },
      { word: 'boat', ipa: '/bəʊt/', meaningVi: 'thuyền' },
      { word: 'cold', ipa: '/kəʊld/', meaningVi: 'lạnh' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'mid',
      lipShape: 'round',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Khởi đầu với âm /ə/ (miệng thả lỏng tự nhiên).',
        'Khép dần và chu tròn môi chuyển thành âm /ʊ/.',
        'Âm thanh mềm mại, uyển chuyển.'
      ],
      vietnameseMistakeTip: 'Người Việt hay đọc thành chữ "ô" cụt lủn. Phải có chuyển động chu tròn môi về cuối âm.',
      phoneticDescriptionVi: 'Chuyển từ /ə/ lười sang /ʊ/ chu môi tròn.'
    },
    colorTheme: {
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      badgeText: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      activeRing: 'ring-purple-500'
    }
  },
  {
    id: 'diph_ia',
    symbol: 'ɪə',
    name: 'Diphthong IA / Near (Âm i-ơ)',
    category: 'diphthong',
    categoryNameVi: 'Nguyên âm đôi',
    exampleWords: [
      { word: 'near', ipa: '/nɪə/', meaningVi: 'gần' },
      { word: 'here', ipa: '/hɪə/', meaningVi: 'ở đây' },
      { word: 'ear', ipa: '/ɪə/', meaningVi: 'tai' },
      { word: 'clear', ipa: '/klɪə/', meaningVi: 'rõ ràng' },
      { word: 'beer', ipa: '/bɪə/', meaningVi: 'bia' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'half-closed',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Bắt đầu bằng âm /ɪ/ (miệng hờ, khóe môi hơi căng).',
        'Thả lỏng toàn bộ cơ miệng lướt sang âm /ə/ lười.',
        'Giữ âm đầu 70%, âm sau 30%.'
      ],
      vietnameseMistakeTip: 'Tránh đọc thành "ia" tiếng Việt giật cục. Hãy lướt mềm mại từ /ɪ/ sang /ə/.',
      phoneticDescriptionVi: 'Lướt từ i ngắn sang ơ ngắn thả lỏng.'
    },
    colorTheme: {
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      badgeText: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      activeRing: 'ring-purple-500'
    }
  },
  {
    id: 'diph_ea',
    symbol: 'eə',
    name: 'Diphthong EA / Square (Âm e-ơ)',
    category: 'diphthong',
    categoryNameVi: 'Nguyên âm đôi',
    exampleWords: [
      { word: 'hair', ipa: '/heə/', meaningVi: 'mái tóc' },
      { word: 'care', ipa: '/keə/', meaningVi: 'quan tâm/chăm sóc' },
      { word: 'chair', ipa: '/tʃeə/', meaningVi: 'cái ghế' },
      { word: 'bear', ipa: '/beə/', meaningVi: 'con gấu' },
      { word: 'where', ipa: '/weə/', meaningVi: 'ở đâu' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Bắt đầu với âm /e/ mở rộng vừa phải.',
        'Chuyển dần lưỡi về vị trí trung tâm phát âm /ə/ lười.',
        'Hàm dưới giữ ở độ mở tự nhiên.'
      ],
      vietnameseMistakeTip: 'Lỗi thường gặp: đọc thành "e" cụt hoặc "e-a". Chú ý lướt sang /ə/ nhẹ nhàng.',
      phoneticDescriptionVi: 'Lướt từ e tự nhiên sang ơ nhẹ nhàng.'
    },
    colorTheme: {
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      badgeText: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      activeRing: 'ring-purple-500'
    }
  },
  {
    id: 'diph_ua',
    symbol: 'ʊə',
    name: 'Diphthong UA / Cure (Âm u-ơ)',
    category: 'diphthong',
    categoryNameVi: 'Nguyên âm đôi',
    exampleWords: [
      { word: 'tour', ipa: '/tʊə/', meaningVi: 'chuyến du lịch' },
      { word: 'poor', ipa: '/pʊə/', meaningVi: 'nghèo/tội nghiệp' },
      { word: 'sure', ipa: '/ʃʊə/', meaningVi: 'chắc chắn' },
      { word: 'cure', ipa: '/kjʊə/', meaningVi: 'chữa trị' },
      { word: 'pure', ipa: '/pjʊə/', meaningVi: 'thuần khiết' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'high',
      lipShape: 'round',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'continuous',
      stepByStep: [
        'Bắt đầu bằng âm /ʊ/ với môi hơi tròn nhẹ.',
        'Thả lỏng cơ môi và lưỡi chuyển sang âm /ə/.',
        'Âm thanh chuyển đổi êm ái.'
      ],
      vietnameseMistakeTip: 'Âm này ít gặp hơn và trong tiếng Anh hiện đại nhiều từ chuyển sang /ɔː/, nhưng vẫn rất quan trọng.',
      phoneticDescriptionVi: 'Lướt từ u ngắn sang ơ thả lỏng.'
    },
    colorTheme: {
      badgeBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      badgeText: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      activeRing: 'ring-purple-500'
    }
  },

  // ===================== CONSONANTS (VOICELESS - VÔ THANH) =====================
  {
    id: 'cons_p',
    symbol: 'p',
    name: 'Voiceless P (Phụ âm p bật hơi)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'pen', ipa: '/pen/', meaningVi: 'cây bút' },
      { word: 'paper', ipa: '/ˈpeɪpə/', meaningVi: 'tờ giấy' },
      { word: 'stop', ipa: '/stɒp/', meaningVi: 'dừng lại' },
      { word: 'cup', ipa: '/kʌp/', meaningVi: 'chiếc cốc' },
      { word: 'apple', ipa: '/ˈæpl/', meaningVi: 'quả táo' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiceless',
      airflow: 'plosive',
      stepByStep: [
        'Mím chặt hai môi lại để chặn hoàn toàn luồng hơi từ phổi.',
        'Tích tụ áp suất không khí phía sau môi.',
        'Mở bung môi đột ngột, tống luồng hơi mạnh ra ngoài (không rung dây thanh quản).'
      ],
      vietnameseMistakeTip: 'Tiếng Việt không có âm "p" bật hơi đầu từ. Đặt 1 tờ giấy trước miệng, khi phát âm /p/ tờ giấy phải bay mạnh!',
      phoneticDescriptionVi: 'Âm bật hơi hai môi, không rung thanh quản, luồng hơi mạnh.'
    },
    minimalPairs: [
      {
        soundA: 'p',
        wordA: 'pen',
        ipaA: '/pen/',
        meaningA: 'cây bút',
        soundB: 'b',
        wordB: 'ben',
        ipaB: '/ben/',
        meaningB: 'tên Ben',
        distinctionTip: '/p/ bật hơi vô thanh (tờ giấy bay); /b/ rung thanh quản hữu thanh.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },
  {
    id: 'cons_t',
    symbol: 't',
    name: 'Voiceless T (Phụ âm t bật hơi)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'tea', ipa: '/tiː/', meaningVi: 'trà' },
      { word: 'two', ipa: '/tuː/', meaningVi: 'số hai' },
      { word: 'cat', ipa: '/kæt/', meaningVi: 'con mèo' },
      { word: 'water', ipa: '/ˈwɔːtə/', meaningVi: 'nước' },
      { word: 'time', ipa: '/taɪm/', meaningVi: 'thời gian' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiceless',
      airflow: 'plosive',
      stepByStep: [
        'Đặt đầu lưỡi chạm chặt vào phần nướu răng cửa hàm trên (chân răng).',
        'Giữ hơi lại trong tích tắc.',
        'Hạ nhanh đầu lưỡi xuống, bật luồng hơi gió dứt khoát ra ngoài.'
      ],
      vietnameseMistakeTip: 'Khác chữ "t" tiếng Việt (đầu lưỡi chạm răng). /t/ tiếng Anh đầu lưỡi chạm nướu trên và bật hơi rất mạnh.',
      phoneticDescriptionVi: 'Đầu lưỡi chạm nướu răng trên, bật hơi mạnh không rung cổ họng.'
    },
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },
  {
    id: 'cons_k',
    symbol: 'k',
    name: 'Voiceless K (Phụ âm k bật hơi)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'cat', ipa: '/kæt/', meaningVi: 'con mèo' },
      { word: 'key', ipa: '/kiː/', meaningVi: 'chìa khóa' },
      { word: 'book', ipa: '/bʊk/', meaningVi: 'sách' },
      { word: 'black', ipa: '/blæk/', meaningVi: 'màu đen' },
      { word: 'school', ipa: '/skuːl/', meaningVi: 'trường học' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'half-open',
      vocalCords: 'voiceless',
      airflow: 'plosive',
      stepByStep: [
        'Nâng cuống lưỡi chạm vào vòm mềm (phần sau vòm miệng) để chặn luồng hơi.',
        'Hạ nhanh cuống lưỡi xuống, bật luồng khí ra khỏi cổ họng dứt khoát.'
      ],
      vietnameseMistakeTip: 'Người Việt hay quên bật âm đuôi /k/ ở cuối từ (như book, like, look). Phải bật nhẹ âm gió ở cuối!',
      phoneticDescriptionVi: 'Cuống lưỡi chặn vòm mềm rồi bật hơi dứt khoát.'
    },
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },
  {
    id: 'cons_f',
    symbol: 'f',
    name: 'Voiceless F (Phụ âm răng môi f)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'fish', ipa: '/fɪʃ/', meaningVi: 'con cá' },
      { word: 'coffee', ipa: '/ˈkɒfi/', meaningVi: 'cà phê' },
      { word: 'leaf', ipa: '/liːf/', meaningVi: 'chiếc lá' },
      { word: 'four', ipa: '/fɔː/', meaningVi: 'số bốn' },
      { word: 'laugh', ipa: '/lɑːf/', meaningVi: 'cười' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'low',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiceless',
      airflow: 'fricative',
      stepByStep: [
        'Răng cửa hàm trên chạm nhẹ vào phần trong của môi dưới.',
        'Đẩy luồng hơi ma sát liên tục qua kẽ răng và môi.',
        'Không rung thanh quản, tạo âm xì gió êm ái.'
      ],
      vietnameseMistakeTip: 'Âm này khá giống chữ "ph" tiếng Việt, nhưng chú ý khi đứng ở cuối từ (leaf, safe) cần xì nhẹ hơi.',
      phoneticDescriptionVi: 'Răng trên cắn nhẹ môi dưới, đẩy luồng hơi ma sát.'
    },
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },
  {
    id: 'cons_theta',
    symbol: 'θ',
    name: 'Voiceless TH / Theta (Âm th thổi gió)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'think', ipa: '/θɪŋk/', meaningVi: 'suy nghĩ' },
      { word: 'thank', ipa: '/θæŋk/', meaningVi: 'cảm ơn' },
      { word: 'mouth', ipa: '/maʊθ/', meaningVi: 'miệng' },
      { word: 'three', ipa: '/θriː/', meaningVi: 'số ba' },
      { word: 'bath', ipa: '/bɑːθ/', meaningVi: 'tắm' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiceless',
      airflow: 'fricative',
      stepByStep: [
        'Đưa đầu lưỡi đặt nhẹ vào giữa hai hàm răng cửa (lưỡi hơi thè nhẹ ra ngoài).',
        'Không cắn chặt lưỡi, để lại khe hở nhỏ bên trên lưỡi.',
        'Thổi luồng hơi gió nhẹ nhàng qua khe giữa răng trên và mặt lưỡi.'
      ],
      vietnameseMistakeTip: 'LỖI CỰC KỲ PHỔ BIẾN: Người Việt hay đọc thành "th" tiếng Việt (thanhk kiu) hoặc "s" (sink). Phải thè đầu lưỡi ra giữa 2 răng và thổi hơi!',
      phoneticDescriptionVi: 'Kẹp đầu lưỡi giữa hai hàm răng, thổi luồng hơi gió vô thanh.'
    },
    minimalPairs: [
      {
        soundA: 'θ',
        wordA: 'think',
        ipaA: '/θɪŋk/',
        meaningA: 'suy nghĩ',
        soundB: 's',
        wordB: 'sink',
        ipaB: '/sɪŋk/',
        meaningB: 'chìm / bồn rửa',
        distinctionTip: '/θ/ đặt lưỡi giữa 2 răng thổi hơi; /s/ khép 2 răng xì hơi.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },
  {
    id: 'cons_s',
    symbol: 's',
    name: 'Voiceless S (Phụ âm xì s)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'sun', ipa: '/sʌn/', meaningVi: 'mặt trời' },
      { word: 'see', ipa: '/siː/', meaningVi: 'nhìn thấy' },
      { word: 'bus', ipa: '/bʌs/', meaningVi: 'xe buýt' },
      { word: 'city', ipa: '/ˈsɪti/', meaningVi: 'thành phố' },
      { word: 'nice', ipa: '/naɪs/', meaningVi: 'tuyệt vời' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'spread',
      jawOpening: 'closed',
      vocalCords: 'voiceless',
      airflow: 'fricative',
      stepByStep: [
        'Khép hai hàm răng lại gần nhau.',
        'Đầu lưỡi nâng lên gần sát nướu răng trên, tạo rãnh hẹp ở giữa lưỡi.',
        'Đẩy luồng hơi mạnh qua rãnh lưỡi tạo âm xì sắc bén giống tiếng rắn kêu (s-s-s).'
      ],
      vietnameseMistakeTip: 'Người Việt hay nuốt mất âm /s/ ở cuối từ (nice, bus, house). Đừng quên xì âm đuôi!',
      phoneticDescriptionVi: 'Khép răng xì luồng hơi gió sắc nét không rung cổ.'
    },
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },
  {
    id: 'cons_sh',
    symbol: 'ʃ',
    name: 'Voiceless SH / Esh (Phụ âm s nặng / suỵt)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'she', ipa: '/ʃiː/', meaningVi: 'cô ấy' },
      { word: 'shoe', ipa: '/ʃuː/', meaningVi: 'chiếc giày' },
      { word: 'fish', ipa: '/fɪʃ/', meaningVi: 'con cá' },
      { word: 'sugar', ipa: '/ˈʃʊɡə/', meaningVi: 'đường' },
      { word: 'action', ipa: '/ˈækʃn/', meaningVi: 'hành động' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'round',
      jawOpening: 'closed',
      vocalCords: 'voiceless',
      airflow: 'fricative',
      stepByStep: [
        'Chu môi tròn và hơi đẩy ra phía trước như đang ra hiệu "Suỵt!" giữ im lặng.',
        'Thân lưỡi nâng lên vòm cứng.',
        'Thổi luồng hơi gió dày và trầm hơn âm /s/.'
      ],
      vietnameseMistakeTip: 'Dễ nhầm với /s/. Bí quyết: Chu môi ra phía trước và nâng lưỡi lên cao.',
      phoneticDescriptionVi: 'Chu môi tròn ra hiệu suỵt, luồng hơi gió dày ấm.'
    },
    minimalPairs: [
      {
        soundA: 'ʃ',
        wordA: 'she',
        ipaA: '/ʃiː/',
        meaningA: 'cô ấy',
        soundB: 's',
        wordB: 'see',
        ipaB: '/siː/',
        meaningB: 'nhìn',
        distinctionTip: '/ʃ/ chu tròn môi ra hiệu suỵt; /s/ kéo khóe môi cười xì hơi.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },
  {
    id: 'cons_ch',
    symbol: 'tʃ',
    name: 'Voiceless CH / T-Esh (Phụ âm ch bật hơi)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'chair', ipa: '/tʃeə/', meaningVi: 'cái ghế' },
      { word: 'teacher', ipa: '/ˈtiːtʃə/', meaningVi: 'giáo viên' },
      { word: 'church', ipa: '/tʃɜːtʃ/', meaningVi: 'nhà thờ' },
      { word: 'watch', ipa: '/wɒtʃ/', meaningVi: 'đồng hồ' },
      { word: 'cheese', ipa: '/tʃiːz/', meaningVi: 'phô mai' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'round',
      jawOpening: 'closed',
      vocalCords: 'voiceless',
      airflow: 'affricate',
      stepByStep: [
        'Chu môi ra phía trước, đầu lưỡi chạm vào nướu trên như chuẩn bị nói âm /t/.',
        'Sau đó bật mạnh lưỡi ra giải phóng luồng hơi thành âm /ʃ/.',
        'Kết hợp /t/ + /ʃ/ thành một âm bật nổ dứt khoát.'
      ],
      vietnameseMistakeTip: 'Người Việt hay phát âm nhẹ như "ch" tiếng Việt (trong "cha mẹ"). Âm tiếng Anh cần chu môi và bật nổ giòn giã hơn nhiều.',
      phoneticDescriptionVi: 'Chu môi, lưỡi chạm nướu trên rồi bật hơi giòn giã.'
    },
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },

  // ===================== CONSONANTS (VOICED - HỮU THANH) =====================
  {
    id: 'cons_b',
    symbol: 'b',
    name: 'Voiced B (Phụ âm b rung hai môi)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'book', ipa: '/bʊk/', meaningVi: 'sách' },
      { word: 'boy', ipa: '/bɔɪ/', meaningVi: 'cậu bé' },
      { word: 'table', ipa: '/ˈteɪbl/', meaningVi: 'cái bàn' },
      { word: 'club', ipa: '/klʌb/', meaningVi: 'câu lạc bộ' },
      { word: 'baby', ipa: '/ˈbeɪbi/', meaningVi: 'em bé' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'plosive',
      stepByStep: [
        'Mím chặt hai môi lại.',
        'Rung mạnh dây thanh quản trong cổ họng tạo âm thanh trầm.',
        'Mở môi để giải phóng âm thanh.'
      ],
      vietnameseMistakeTip: 'Khác âm /p/, khi nói /b/ bạn đặt tay lên cổ họng sẽ cảm nhận rõ độ rung của dây thanh quản.',
      phoneticDescriptionVi: 'Mím hai môi, rung mạnh dây thanh quản.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_d',
    symbol: 'd',
    name: 'Voiced D (Phụ âm d rung nướu trên)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'door', ipa: '/dɔː/', meaningVi: 'cửa' },
      { word: 'day', ipa: '/deɪ/', meaningVi: 'ngày' },
      { word: 'red', ipa: '/red/', meaningVi: 'màu đỏ' },
      { word: 'head', ipa: '/hed/', meaningVi: 'đầu' },
      { word: 'good', ipa: '/ɡʊd/', meaningVi: 'tốt' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'plosive',
      stepByStep: [
        'Đầu lưỡi chạm chắc vào nướu hàm trên.',
        'Làm rung dây thanh quản trong cổ họng.',
        'Hạ nhanh đầu lưỡi giải phóng âm thanh dứt khoát.'
      ],
      vietnameseMistakeTip: 'Khác chữ "đ" tiếng Việt, đầu lưỡi không chạm mặt răng mà chạm nướu trên.',
      phoneticDescriptionVi: 'Đầu lưỡi chạm nướu trên, rung mạnh dây thanh quản.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_g',
    symbol: 'ɡ',
    name: 'Voiced G (Phụ âm g rung cuống họng)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'girl', ipa: '/ɡɜːl/', meaningVi: 'cô gái' },
      { word: 'good', ipa: '/ɡʊd/', meaningVi: 'tốt' },
      { word: 'dog', ipa: '/dɒɡ/', meaningVi: 'con chó' },
      { word: 'big', ipa: '/bɪɡ/', meaningVi: 'to lớn' },
      { word: 'egg', ipa: '/eɡ/', meaningVi: 'quả trứng' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'plosive',
      stepByStep: [
        'Nâng cuống lưỡi chạm vòm mềm chặn hơi.',
        'Rung dây thanh quản, sau đó hạ cuống lưỡi bật âm ra.'
      ],
      vietnameseMistakeTip: 'Đừng quên phát âm nhẹ âm /ɡ/ khi ở cuối từ (như dog, big, bag).',
      phoneticDescriptionVi: 'Cuống lưỡi nâng, dây thanh quản rung mạnh.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_v',
    symbol: 'v',
    name: 'Voiced V (Phụ âm răng môi v rung)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'voice', ipa: '/vɔɪs/', meaningVi: 'giọng nói' },
      { word: 'love', ipa: '/lʌv/', meaningVi: 'yêu' },
      { word: 'live', ipa: '/lɪv/', meaningVi: 'sống' },
      { word: 'very', ipa: '/ˈveri/', meaningVi: 'rất' },
      { word: 'five', ipa: '/faɪv/', meaningVi: 'số năm' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'low',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'fricative',
      stepByStep: [
        'Răng cửa hàm trên chạm nhẹ vào môi dưới (giống âm /f/).',
        'Rung mạnh dây thanh quản trong khi luồng hơi ma sát đi qua.'
      ],
      vietnameseMistakeTip: 'Khi ở cuối từ (five, love, have), người Việt hay nuốt mất. Hãy để răng trên cắn môi dưới và rung nhẹ.',
      phoneticDescriptionVi: 'Răng trên chạm môi dưới, cổ họng rung rõ rệt.'
    },
    minimalPairs: [
      {
        soundA: 'v',
        wordA: 'van',
        ipaA: '/væn/',
        meaningA: 'xe tải nhỏ',
        soundB: 'f',
        wordB: 'fan',
        ipaB: '/fæn/',
        meaningB: 'cái quạt',
        distinctionTip: '/v/ rung cổ họng; /f/ chỉ xì hơi gió vô thanh.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_eth',
    symbol: 'ð',
    name: 'Voiced TH / Eth (Âm th hữu thanh / th rung lưỡi)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'this', ipa: '/ðɪs/', meaningVi: 'cái này' },
      { word: 'that', ipa: '/ðæt/', meaningVi: 'cái đó' },
      { word: 'mother', ipa: '/ˈmʌðə/', meaningVi: 'người mẹ' },
      { word: 'father', ipa: '/ˈfɑːðə/', meaningVi: 'người cha' },
      { word: 'with', ipa: '/wɪð/', meaningVi: 'với' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'fricative',
      stepByStep: [
        'Đặt đầu lưỡi vào giữa hai hàm răng cửa (thè nhẹ ra ngoài như âm /θ/).',
        'Rung mạnh dây thanh quản trong khi đẩy hơi qua lưỡi và răng.',
        'Cảm nhận độ rung tê ở đầu lưỡi.'
      ],
      vietnameseMistakeTip: 'Người Việt hay đọc thành "d" (dít, đát). Phải kẹp đầu lưỡi giữa răng và làm rung tê lưỡi!',
      phoneticDescriptionVi: 'Đầu lưỡi đặt giữa hai răng, cổ họng và đầu lưỡi rung rõ.'
    },
    minimalPairs: [
      {
        soundA: 'ð',
        wordA: 'this',
        ipaA: '/ðɪs/',
        meaningA: 'cái này',
        soundB: 'd',
        wordB: 'dis',
        ipaB: '/dɪs/',
        meaningB: 'từ lóng',
        distinctionTip: '/ð/ đưa lưỡi ra ngoài giữa 2 răng; /d/ lưỡi thụt bên trong nướu trên.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_z',
    symbol: 'z',
    name: 'Voiced Z (Phụ âm z rung tiếng ong kêu)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'zoo', ipa: '/zuː/', meaningVi: 'sở thú' },
      { word: 'zebra', ipa: '/ˈzebrə/', meaningVi: 'ngựa vằn' },
      { word: 'is', ipa: '/ɪz/', meaningVi: 'là' },
      { word: 'his', ipa: '/hɪz/', meaningVi: 'của anh ấy' },
      { word: 'music', ipa: '/ˈmjuːzɪk/', meaningVi: 'âm nhạc' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'spread',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'fricative',
      stepByStep: [
        'Khép hai hàm răng lại (khẩu hình giống âm /s/).',
        'Rung dây thanh quản tạo tiếng vo ve giống như tiếng ong bay (z-z-z).'
      ],
      vietnameseMistakeTip: 'Nhiều từ kết thúc bằng "s" thực chất phiên âm là /z/ (như is, was, does, dogs). Cần rung cổ họng rõ.',
      phoneticDescriptionVi: 'Khép răng, rung thanh quản tạo âm vo ve ong kêu.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_zh',
    symbol: 'ʒ',
    name: 'Voiced ZH / Ezh (Phụ âm gi rung / môi tròn)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'television', ipa: '/ˈtelɪvɪʒn/', meaningVi: 'ti vi' },
      { word: 'measure', ipa: '/ˈmeʒə/', meaningVi: 'đo lường' },
      { word: 'decision', ipa: '/dɪˈsɪʒn/', meaningVi: 'quyết định' },
      { word: 'pleasure', ipa: '/ˈpleʒə/', meaningVi: 'niềm vui' },
      { word: 'casual', ipa: '/ˈkæʒuəl/', meaningVi: 'thường ngày' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'round',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'fricative',
      stepByStep: [
        'Chu môi tròn ra phía trước (khẩu hình giống âm /ʃ/).',
        'Làm rung mạnh dây thanh quản trong cổ họng.'
      ],
      vietnameseMistakeTip: 'Âm này là cặp hữu thanh của /ʃ/. Nhớ vừa chu môi vừa rung cổ.',
      phoneticDescriptionVi: 'Chu môi tròn, rung mạnh dây thanh quản.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_j',
    symbol: 'dʒ',
    name: 'Voiced J / D-Ezh (Phụ âm j / ch rung)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'job', ipa: '/dʒɒb/', meaningVi: 'công việc' },
      { word: 'orange', ipa: '/ˈɒrɪndʒ/', meaningVi: 'quả cam' },
      { word: 'juice', ipa: '/dʒuːs/', meaningVi: 'nước ép' },
      { word: 'age', ipa: '/eɪdʒ/', meaningVi: 'tuổi tác' },
      { word: 'bridge', ipa: '/brɪdʒ/', meaningVi: 'cây cầu' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'round',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'affricate',
      stepByStep: [
        'Chu môi tròn, đầu lưỡi chạm nướu trên như chuẩn bị nói âm /d/.',
        'Bật mạnh lưỡi giải phóng luồng hơi kết hợp rung thanh quản thành /ʒ/.'
      ],
      vietnameseMistakeTip: 'Người Việt hay đọc thành "d" hoặc "gi" tiếng Việt nhẹ. Phải chu môi và bật nổ kèm rung cổ!',
      phoneticDescriptionVi: 'Chu môi, lưỡi chạm nướu trên, bật nổ và rung cổ họng.'
    },
    minimalPairs: [
      {
        soundA: 'dʒ',
        wordA: 'joke',
        ipaA: '/dʒəʊk/',
        meaningA: 'trò đùa',
        soundB: 'tʃ',
        wordB: 'choke',
        ipaB: '/tʃəʊk/',
        meaningB: 'nghẹt thở',
        distinctionTip: '/dʒ/ rung thanh quản hữu thanh; /tʃ/ bật hơi vô thanh.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },

  // ===================== OTHER CONSONANTS (NASAL, LIQUID, GLIDE) =====================
  {
    id: 'cons_m',
    symbol: 'm',
    name: 'Nasal M (Phụ âm mũi m)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh (Mũi)',
    exampleWords: [
      { word: 'man', ipa: '/mæn/', meaningVi: 'người đàn ông' },
      { word: 'money', ipa: '/ˈmʌni/', meaningVi: 'tiền' },
      { word: 'home', ipa: '/həʊm/', meaningVi: 'nhà' },
      { word: 'time', ipa: '/taɪm/', meaningVi: 'thời gian' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'mid',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'nasal',
      stepByStep: [
        'Mím chặt hai môi.',
        'Hạ ngạc mềm cho luồng hơi thoát ra qua đường mũi.',
        'Rung dây thanh quản tạo âm "m" vang trong khoang mũi.'
      ],
      vietnameseMistakeTip: 'Khi ở cuối từ (time, room), cần ngậm môi để âm ngân qua mũi trước khi dứt.',
      phoneticDescriptionVi: 'Mím môi, đẩy luồng âm vang qua mũi.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_n',
    symbol: 'n',
    name: 'Nasal N (Phụ âm mũi n)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh (Mũi)',
    exampleWords: [
      { word: 'no', ipa: '/nəʊ/', meaningVi: 'không' },
      { word: 'sun', ipa: '/sʌn/', meaningVi: 'mặt trời' },
      { word: 'pen', ipa: '/pen/', meaningVi: 'bút' },
      { word: 'nine', ipa: '/naɪn/', meaningVi: 'số chín' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'nasal',
      stepByStep: [
        'Đầu lưỡi chạm nướu trên chặn khoang miệng.',
        'Đẩy âm thanh thoát qua đường mũi và rung cổ họng.'
      ],
      vietnameseMistakeTip: 'Ở cuối từ (nine, run), giữ đầu lưỡi ở nướu trên để âm mũi ngân tự nhiên.',
      phoneticDescriptionVi: 'Đầu lưỡi chạm nướu trên, thoát âm qua đường mũi.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_ng',
    symbol: 'ŋ',
    name: 'Nasal Engma / NG (Phụ âm mũi ng)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh (Mũi)',
    exampleWords: [
      { word: 'sing', ipa: '/sɪŋ/', meaningVi: 'hát' },
      { word: 'song', ipa: '/sɒŋ/', meaningVi: 'bài hát' },
      { word: 'king', ipa: '/kɪŋ/', meaningVi: 'nhà vua' },
      { word: 'ring', ipa: '/rɪŋ/', meaningVi: 'chiếc nhẫn' },
      { word: 'English', ipa: '/ˈɪŋɡlɪʃ/', meaningVi: 'tiếng Anh' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'nasal',
      stepByStep: [
        'Nâng cuống lưỡi chạm vào vòm mềm phía sau.',
        'Để luồng khí và âm thanh rung thoát ra toàn bộ qua mũi.'
      ],
      vietnameseMistakeTip: 'Âm này không bao giờ đứng đầu từ trong tiếng Anh, thường ở đuôi -ing. Đừng phát âm thêm âm /g/ thừa ở đuôi (sing, không phải sing-gờ).',
      phoneticDescriptionVi: 'Cuống lưỡi chạm vòm mềm, luồng âm rung qua mũi.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_h',
    symbol: 'h',
    name: 'Glottal H (Phụ âm hơi h)',
    category: 'consonant_voiceless',
    categoryNameVi: 'Phụ âm vô thanh',
    exampleWords: [
      { word: 'hat', ipa: '/hæt/', meaningVi: 'cái mũ' },
      { word: 'house', ipa: '/haʊs/', meaningVi: 'ngôi nhà' },
      { word: 'hot', ipa: '/hɒt/', meaningVi: 'nóng' },
      { word: 'happy', ipa: '/ˈhæpi/', meaningVi: 'hạnh phúc' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'low',
      lipShape: 'neutral',
      jawOpening: 'half-open',
      vocalCords: 'voiceless',
      airflow: 'fricative',
      stepByStep: [
        'Mở miệng tự nhiên, hít một hơi rồi thở nhẹ ra như một tiếng thở dài nhẹ.',
        'Luồng khí đi qua thanh môn mà không làm rung dây thanh quản.'
      ],
      vietnameseMistakeTip: 'Cần phân biệt các từ có âm H câm (như hour, honest, heir).',
      phoneticDescriptionVi: 'Thở nhẹ luồng hơi qua thanh môn, không ma sát mạnh.'
    },
    colorTheme: {
      badgeBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      activeRing: 'ring-amber-500'
    }
  },
  {
    id: 'cons_l',
    symbol: 'l',
    name: 'Lateral L (Phụ âm l sáng & l tối)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh (Bên)',
    exampleWords: [
      { word: 'light', ipa: '/laɪt/', meaningVi: 'ánh sáng' },
      { word: 'love', ipa: '/lʌv/', meaningVi: 'yêu' },
      { word: 'ball', ipa: '/bɔːl/', meaningVi: 'quả bóng (Dark L)' },
      { word: 'apple', ipa: '/ˈæpl/', meaningVi: 'quả táo' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'neutral',
      jawOpening: 'half-closed',
      vocalCords: 'voiced',
      airflow: 'lateral',
      stepByStep: [
        'Đặt đầu lưỡi chạm vào nướu răng hàm trên.',
        'Cho luồng hơi và âm thanh thoát ra ở hai bên mép lưỡi.',
        'Với Dark L (ở cuối từ như ball, milk): nâng cuống lưỡi lên tạo âm trầm ồ.'
      ],
      vietnameseMistakeTip: 'LỖI PHỔ BIẾN: Quên phát âm "Dark L" ở cuối từ. Đừng bỏ quên âm /l/ trong "school", "feel", "call"!',
      phoneticDescriptionVi: 'Đầu lưỡi chạm nướu trên, luồng hơi lượn qua hai cạnh lưỡi.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_r',
    symbol: 'r',
    name: 'Post-alveolar R (Phụ âm r cuộn lưỡi)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh',
    exampleWords: [
      { word: 'red', ipa: '/red/', meaningVi: 'màu đỏ' },
      { word: 'rain', ipa: '/reɪn/', meaningVi: 'mưa' },
      { word: 'tree', ipa: '/triː/', meaningVi: 'cây' },
      { word: 'right', ipa: '/raɪt/', meaningVi: 'đúng' }
    ],
    articulation: {
      tonguePosition: 'central',
      tongueHeight: 'mid',
      lipShape: 'round',
      jawOpening: 'half-open',
      vocalCords: 'voiced',
      airflow: 'glide',
      stepByStep: [
        'Môi hơi chu nhẹ về phía trước.',
        'Uốn cong đầu lưỡi lên gần vòm miệng nhưng TUYỆT ĐỐI KHÔNG chạm vào vòm miệng.',
        'Rung thanh quản tạo âm r mượt mà.'
      ],
      vietnameseMistakeTip: 'Lưỡi không được chạm vào bất kỳ điểm nào trong vòm miệng (không rung lưỡi như tiếng Việt hay tiếng Tây Ban Nha).',
      phoneticDescriptionVi: 'Cuộn nhẹ đầu lưỡi lơ lửng trong vòm miệng, không chạm.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_w',
    symbol: 'w',
    name: 'Glide W (Phụ âm lướt w tròn môi)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh (Bán nguyên âm)',
    exampleWords: [
      { word: 'water', ipa: '/ˈwɔːtə/', meaningVi: 'nước' },
      { word: 'we', ipa: '/wiː/', meaningVi: 'chúng tôi' },
      { word: 'one', ipa: '/wʌn/', meaningVi: 'số một' },
      { word: 'window', ipa: '/ˈwɪndəʊ/', meaningVi: 'cửa sổ' }
    ],
    articulation: {
      tonguePosition: 'back',
      tongueHeight: 'high',
      lipShape: 'round',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'glide',
      stepByStep: [
        'Chu môi tròn nhỏ hướng về trước như đang huýt sáo.',
        'Nâng cuống lưỡi, sau đó mở nhanh miệng lướt sang nguyên âm tiếp theo.'
      ],
      vietnameseMistakeTip: 'Dễ nhầm với /v/. Bí quyết: /w/ chu hai môi tròn, KHÔNG để răng chạm môi.',
      phoneticDescriptionVi: 'Chu môi tròn nhỏ rồi lướt nhanh sang nguyên âm kế tiếp.'
    },
    minimalPairs: [
      {
        soundA: 'w',
        wordA: 'wet',
        ipaA: '/wet/',
        meaningA: 'ẩm ướt',
        soundB: 'v',
        wordB: 'vet',
        ipaB: '/vet/',
        meaningB: 'bác sĩ thú y',
        distinctionTip: '/w/ chu hai môi; /v/ răng trên cắn môi dưới.'
      }
    ],
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  },
  {
    id: 'cons_y',
    symbol: 'j',
    name: 'Glide J / Y (Bán nguyên âm j - âm d-y)',
    category: 'consonant_voiced',
    categoryNameVi: 'Phụ âm hữu thanh (Bán nguyên âm)',
    exampleWords: [
      { word: 'yes', ipa: '/jes/', meaningVi: 'vâng/có' },
      { word: 'yellow', ipa: '/ˈjeləʊ/', meaningVi: 'màu vàng' },
      { word: 'you', ipa: '/juː/', meaningVi: 'bạn' },
      { word: 'year', ipa: '/jɪə/', meaningVi: 'năm' },
      { word: 'music', ipa: '/ˈmjuːzɪk/', meaningVi: 'âm nhạc' }
    ],
    articulation: {
      tonguePosition: 'front',
      tongueHeight: 'high',
      lipShape: 'spread',
      jawOpening: 'closed',
      vocalCords: 'voiced',
      airflow: 'glide',
      stepByStep: [
        'Đặt lưỡi ở vị trí âm /iː/ (thân trước lưỡi nâng sát vòm cứng).',
        'Lướt cực nhanh sang nguyên âm đi kèm phía sau.'
      ],
      vietnameseMistakeTip: 'Ký hiệu IPA là /j/ nhưng tương ứng với chữ cái Y trong "yes", "you". Đừng đọc thành "d" hay "gi" nặng.',
      phoneticDescriptionVi: 'Thân lưỡi nâng cao sát vòm cứng rồi lướt nhanh.'
    },
    colorTheme: {
      badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      activeRing: 'ring-sky-500'
    }
  }
];

export const CATEGORY_METADATA = {
  monophthong_short: {
    nameVi: 'Nguyên âm ngắn',
    descriptionVi: '7 âm nguyên âm đơn ngắn, dứt khoát',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
  },
  monophthong_long: {
    nameVi: 'Nguyên âm dài',
    descriptionVi: '5 âm nguyên âm đơn ngân dài, có dấu hai chấm (ː)',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800'
  },
  diphthong: {
    nameVi: 'Nguyên âm đôi',
    descriptionVi: '8 âm kết hợp lướt từ nguyên âm này sang nguyên âm khác',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800'
  },
  consonant_voiceless: {
    nameVi: 'Phụ âm vô thanh',
    descriptionVi: 'Không rung dây thanh quản, chỉ tạo luồng hơi bật gió',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
  },
  consonant_voiced: {
    nameVi: 'Phụ âm hữu thanh',
    descriptionVi: 'Rung mạnh dây thanh quản trong cổ họng khi phát âm',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800'
  }
};
