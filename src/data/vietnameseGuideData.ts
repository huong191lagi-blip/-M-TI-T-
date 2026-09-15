export interface VietnameseSoundGuide {
  soundId: string;
  symbol: string;
  displaySymbol?: string;
  headerColor: 'red' | 'green' | 'blue' | 'purple';
  vietnameseGuideRaw: string;
  vietnameseSound?: string;
  vietnameseSoundColor?: 'red' | 'blue' | 'orange';
  leadingText?: string;
  trailingText?: string;
  highlightedPhrase?: string;
  isUnderline?: boolean;
  notes?: string;
  // Diphthong specifics
  isDiphthong?: boolean;
  diphthongSubTag?: string; // e.g. "ə = ờ"
  firstSound?: string; // e.g. "i", "e", "ʊ"
  secondSound?: string; // e.g. "ə", "i", "ʊ"
  ruleText?: string;
  // Mouth & Tongue description from the video
  lipShapeDesc: string;
  tonguePositionDesc: string;
  page: 1 | 2 | 3 | 4;
}

export const VIETNAMESE_SOUND_GUIDES: Record<string, VietnameseSoundGuide> = {
  // ================= PAGE 1: NGUYÊN ÂM ĐƠN (SHORT & LONG) =================
  'short_ae': {
    soundId: 'short_ae',
    symbol: 'æ',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm a trong tiếng việt - thẳng lưỡi ngắn',
    leadingText: 'đọc như âm',
    vietnameseSound: 'a',
    vietnameseSoundColor: 'blue',
    trailingText: 'trong tiếng việt -',
    highlightedPhrase: 'thẳng lưỡi ngắn',
    isUnderline: true,
    lipShapeDesc: 'Há miệng thật to, cằm hạ thấp, hai mép môi kéo căng sang hai bên như cười lớn.',
    tonguePositionDesc: 'Đầu lưỡi giữ thẳng nằm sát đáy răng cửa hàm dưới, thân lưỡi hạ thấp.',
    page: 1
  },
  'short_schwa': {
    soundId: 'short_schwa',
    symbol: 'ə',
    headerColor: 'red',
    vietnameseGuideRaw: '- đọc như âm ờ trong tiếng việt ngắn',
    leadingText: '- đọc như âm',
    vietnameseSound: 'ờ',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    highlightedPhrase: 'ngắn',
    isUnderline: true,
    lipShapeDesc: 'Miệng mở hờ tự nhiên, môi thả lỏng hoàn toàn không căng cứng.',
    tonguePositionDesc: 'Lưỡi đặt thư giãn ở chính giữa khoang miệng, phát âm thật nhanh.',
    page: 1
  },
  'short_o': {
    soundId: 'short_o',
    symbol: 'ɒ',
    displaySymbol: 'ɒ',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm o trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'o',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Hạ cằm dưới xuống sâu, khóe môi hơi tròn mở rộng.',
    tonguePositionDesc: 'Gốc lưỡi hơi nâng về phía sau cuống họng, phát âm dứt khoát.',
    page: 1
  },
  'short_u': {
    soundId: 'short_u',
    symbol: 'ʊ',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm u trong tiếng việt – ngắn',
    leadingText: 'đọc như âm',
    vietnameseSound: 'u',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt –',
    highlightedPhrase: 'ngắn',
    isUnderline: true,
    lipShapeDesc: 'Môi hơi tròn nhẹ đưa ra trước nhưng không chu chặt.',
    tonguePositionDesc: 'Thân lưỡi nâng lên cao về phía sau vòm họng mềm, phát âm ngắn.',
    page: 1
  },
  'short_i': {
    soundId: 'short_i',
    symbol: 'ɪ',
    displaySymbol: 'i',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm i trong tiếng việt – ngắn',
    leadingText: 'đọc như âm',
    vietnameseSound: 'i',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt –',
    highlightedPhrase: 'ngắn',
    isUnderline: true,
    lipShapeDesc: 'Môi hé nhẹ, khóe miệng thả lỏng không căng kéo về hai bên.',
    tonguePositionDesc: 'Phần trước lưỡi đưa lên cao gần vòm miệng cứng, phát âm dứt khoát trong 0.2s.',
    page: 1
  },
  'short_e': {
    soundId: 'short_e',
    symbol: 'e',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm e trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'e',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Miệng mở vừa phải, khóe môi bè nhẹ sang hai bên tự nhiên.',
    tonguePositionDesc: 'Thân lưỡi đặt ở độ cao trung bình trong khoang miệng.',
    page: 1
  },
  'short_wedge': {
    soundId: 'short_wedge',
    symbol: 'ʌ',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm ấ trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'ấ',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Miệng mở rộng vừa phải, môi thả lỏng không tròn.',
    tonguePositionDesc: 'Lưỡi hơi nâng nhẹ ở phần giữa, phát âm dứt khoát như "ấ" hay "ớ".',
    page: 1
  },

  // Long Vowels
  'long_a': {
    soundId: 'long_a',
    symbol: 'ɑː',
    headerColor: 'green',
    vietnameseGuideRaw: '- đọc như âm a trong tiếng việt - cong lưỡi',
    leadingText: '- đọc như âm',
    vietnameseSound: 'a',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt -',
    highlightedPhrase: 'cong lưỡi',
    notes: 'Ngân dài âm a và uốn cong nhẹ đầu lưỡi',
    lipShapeDesc: 'Hạ hàm dưới xuống sâu hết cỡ, môi mở rộng hình bầu dục.',
    tonguePositionDesc: 'Lưỡi đặt thấp và kéo lùi nhẹ về phía sau, đầu lưỡi cong nhẹ.',
    page: 1
  },
  'long_er': {
    soundId: 'long_er',
    symbol: 'ɜː',
    displaySymbol: '3:',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm ơ trong tiếng việt - cong lưỡi',
    leadingText: 'đọc như âm',
    vietnameseSound: 'ơ',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt -',
    highlightedPhrase: 'cong lưỡi',
    notes: 'Ngân dài âm ơ và uốn đầu lưỡi hướng lên vòm họng',
    lipShapeDesc: 'Môi mở hờ thư giãn, khóe miệng thả lỏng tự nhiên.',
    tonguePositionDesc: 'Thân lưỡi đặt giữa khoang miệng, đầu lưỡi cong hướng lên vòm cứng.',
    page: 1
  },
  'long_o': {
    soundId: 'long_o',
    symbol: 'ɔː',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm o trong tiếng việt - cong lưỡi',
    leadingText: 'đọc như âm',
    vietnameseSound: 'o',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt -',
    highlightedPhrase: 'cong lưỡi',
    notes: 'Tròn môi chu sâu và ngân dài âm o',
    lipShapeDesc: 'Môi chu tròn sâu về phía trước tạo thành vòng tròn nhỏ.',
    tonguePositionDesc: 'Gốc lưỡi kéo lùi về sau vòm họng, đầu lưỡi hơi cong nhẹ.',
    page: 1
  },
  'long_u': {
    soundId: 'long_u',
    symbol: 'uː',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm u trong tiếng việt - kéo dài',
    leadingText: 'đọc như âm',
    vietnameseSound: 'u',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    highlightedPhrase: '- kéo dài',
    notes: 'Chu tròn môi sâu và ngân dài',
    lipShapeDesc: 'Môi chu tròn rất chặt về phía trước như đang huýt sáo.',
    tonguePositionDesc: 'Cuống lưỡi nâng lên rất cao sát vòm khẩu cái mềm.',
    page: 1
  },
  'long_i': {
    soundId: 'long_i',
    symbol: 'iː',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm i trong tiếng việt kéo dài',
    leadingText: 'đọc như âm',
    vietnameseSound: 'i',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    highlightedPhrase: 'kéo dài',
    isUnderline: true,
    notes: 'Cười mỉm căng khóe môi sang 2 bên và ngân dài',
    lipShapeDesc: 'Khóe môi kéo căng tối đa sang hai bên như nụ cười thật tươi.',
    tonguePositionDesc: 'Đầu lưỡi nâng rất cao sát vòm miệng cứng, luồng hơi thoát ra êm mượt.',
    page: 1
  },

  // ================= PAGE 2: NGUYÊN ÂM ĐÔI (DIPHTHONGS) =================
  'diph_ia': {
    soundId: 'diph_ia',
    symbol: 'ɪə',
    headerColor: 'red',
    vietnameseGuideRaw: 'Há miệng đọc âm đứng trước i - khép miệng đọc âm đứng sau ə',
    isDiphthong: true,
    diphthongSubTag: 'ə = ờ',
    firstSound: 'i',
    secondSound: 'ə',
    ruleText: 'Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau',
    lipShapeDesc: 'Bắt đầu từ khẩu hình âm /ɪ/ (mép hơi hé) sau đó thả lỏng dần chuyển sang âm /ə/ (ờ).',
    tonguePositionDesc: 'Lưỡi từ vị trí cao phía trước lướt nhẹ về vị trí trung tâm.',
    page: 2
  },
  'diph_ea': {
    soundId: 'diph_ea',
    symbol: 'eə',
    headerColor: 'red',
    vietnameseGuideRaw: 'Há miệng đọc âm đứng trước e - khép miệng đọc âm đứng sau ə',
    isDiphthong: true,
    diphthongSubTag: 'ə = ờ',
    firstSound: 'e',
    secondSound: 'ə',
    ruleText: 'Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau',
    lipShapeDesc: 'Bắt đầu mở hàm vừa phải với âm /e/ rồi nhẹ nhàng khép hờ môi sang âm /ə/ (ờ).',
    tonguePositionDesc: 'Lưỡi từ độ cao trung bình phía trước lướt về trung tâm khoang miệng.',
    page: 2
  },
  'diph_ua': {
    soundId: 'diph_ua',
    symbol: 'ʊə',
    headerColor: 'red',
    vietnameseGuideRaw: 'Há miệng đọc âm đứng trước ʊ - khép miệng đọc âm đứng sau ə',
    isDiphthong: true,
    diphthongSubTag: 'ə = ờ',
    firstSound: 'ʊ',
    secondSound: 'ə',
    ruleText: 'Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau',
    lipShapeDesc: 'Môi hơi tròn với âm /ʊ/ sau đó thả lỏng mở hờ sang âm /ə/ (ờ).',
    tonguePositionDesc: 'Lưỡi từ phía sau cao lướt về giữa khoang miệng.',
    page: 2
  },
  'diph_ei': {
    soundId: 'diph_ei',
    symbol: 'eɪ',
    headerColor: 'red',
    vietnameseGuideRaw: 'Há miệng đọc âm đứng trước e - khép miệng đọc âm đứng sau i',
    isDiphthong: true,
    firstSound: 'e',
    secondSound: 'i',
    ruleText: 'Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau',
    lipShapeDesc: 'Há miệng đọc âm /e/ sau đó khép dần hai hàm và kéo căng mép sang âm /ɪ/.',
    tonguePositionDesc: 'Lưỡi nâng dần từ vị trí giữa lên vị trí cao phía trước.',
    page: 2
  },
  'diph_ai': {
    soundId: 'diph_ai',
    symbol: 'aɪ',
    headerColor: 'red',
    vietnameseGuideRaw: 'Há miệng đọc âm đứng trước a - khép miệng đọc âm đứng sau i',
    isDiphthong: true,
    firstSound: 'a',
    secondSound: 'i',
    ruleText: 'Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau',
    lipShapeDesc: 'Miệng há to hết cỡ đọc âm /a/ rồi khép dần cằm đọc âm /ɪ/.',
    tonguePositionDesc: 'Lưỡi từ vị trí rất thấp ở đáy miệng nâng vọt lên cao phía trước.',
    page: 2
  },
  'diph_oi': {
    soundId: 'diph_oi',
    symbol: 'ɔɪ',
    headerColor: 'red',
    vietnameseGuideRaw: 'Há miệng đọc âm đứng trước ɔ = o - khép miệng đọc âm đứng sau i',
    isDiphthong: true,
    firstSound: 'ɔ = o',
    secondSound: 'i',
    ruleText: 'Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau',
    lipShapeDesc: 'Môi chu tròn đọc âm /ɔ/ (o) rồi khép mép căng ngang đọc âm /ɪ/.',
    tonguePositionDesc: 'Lưỡi từ gốc sau lướt nhanh về phía trước vòm họng cứng.',
    page: 2
  },
  'diph_ou': {
    soundId: 'diph_ou',
    symbol: 'əʊ',
    headerColor: 'red',
    vietnameseGuideRaw: 'Há miệng đọc âm đứng trước ə - khép miệng đọc âm đứng sau ʊ',
    isDiphthong: true,
    firstSound: 'ə',
    secondSound: 'ʊ',
    ruleText: 'Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau',
    lipShapeDesc: 'Môi mở hờ tự nhiên đọc /ə/ sau đó thu nhỏ môi tròn chu lại đọc /ʊ/.',
    tonguePositionDesc: 'Lưỡi từ trung tâm lùi nhẹ về sau và nâng cuống lưỡi lên cao.',
    page: 2
  },
  'diph_au': {
    soundId: 'diph_au',
    symbol: 'aʊ',
    headerColor: 'red',
    vietnameseGuideRaw: 'Há miệng đọc âm đứng trước a - khép miệng đọc âm đứng sau ʊ',
    isDiphthong: true,
    firstSound: 'a',
    secondSound: 'ʊ',
    ruleText: 'Quy tắc đọc âm đôi -- há miệng đọc âm đứng trước - khép miệng đọc âm đứng sau',
    lipShapeDesc: 'Há miệng to đọc âm /a/ sau đó khép bớt hàm và chu tròn môi đọc âm /ʊ/.',
    tonguePositionDesc: 'Lưỡi từ vị trí thấp lướt lên cao về phía sau vòm họng mềm.',
    page: 2
  },

  // ================= PAGE 3: PHỤ ÂM PHẦN 1 =================
  'cons_m': {
    soundId: 'cons_m',
    symbol: 'm',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm m trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'm',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Hai môi mím chặt lại hoàn toàn để chặn luồng khí ở miệng.',
    tonguePositionDesc: 'Khí thoát ra qua khoang mũi tạo độ rung êm dịu ở cổ họng.',
    page: 3
  },
  'cons_n': {
    soundId: 'cons_n',
    symbol: 'n',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm n trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'n',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Miệng hé nhẹ tự nhiên.',
    tonguePositionDesc: 'Đầu lưỡi chạm chặt vào nướu răng cửa trên, luồng khí thoát qua mũi.',
    page: 3
  },
  'cons_l': {
    soundId: 'cons_l',
    symbol: 'l',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm l trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'l',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Môi hơi hé mở tự nhiên.',
    tonguePositionDesc: 'Đầu lưỡi đặt vào chân răng trên, luồng hơi lách qua hai bên rìa lưỡi.',
    page: 3
  },
  'cons_h': {
    soundId: 'cons_h',
    symbol: 'h',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm h trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'h',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Miệng mở hờ theo nguyên âm đi liền sau.',
    tonguePositionDesc: 'Lưỡi thả lỏng, thở luồng hơi nhẹ từ cuống họng ra ngoài (vô thanh).',
    page: 3
  },
  'cons_f': {
    soundId: 'cons_f',
    symbol: 'f',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm ph trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'ph',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Răng cửa hàm trên chạm nhẹ vào phần trong môi dưới.',
    tonguePositionDesc: 'Thổi luồng hơi mạnh qua khe hở giữa răng và môi dưới (không rung cổ).',
    page: 3
  },
  'cons_v': {
    soundId: 'cons_v',
    symbol: 'v',
    headerColor: 'green',
    vietnameseGuideRaw: 'đọc như âm v trong tiếng việt - không bật mạnh bằng',
    leadingText: 'đọc như âm',
    vietnameseSound: 'v',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt - không bật mạnh bằng',
    lipShapeDesc: 'Răng cửa hàm trên chạm nhẹ vào viền môi dưới.',
    tonguePositionDesc: 'Đẩy hơi qua kẽ răng và làm rung dây thanh quản ở cổ họng.',
    page: 3
  },
  'cons_p': {
    soundId: 'cons_p',
    symbol: 'p',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm p trong tiếng việt, bật hơi mạnh',
    leadingText: 'đọc như âm',
    vietnameseSound: 'p',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt,',
    highlightedPhrase: 'bật hơi mạnh',
    isUnderline: true,
    lipShapeDesc: 'Hai môi mím chặt nén hơi trong miệng rồi bật mở dứt khoát.',
    tonguePositionDesc: 'Luồng hơi bật phì ra thật mạnh làm lay chuyển tờ giấy (vô thanh).',
    page: 3
  },
  'cons_t': {
    soundId: 'cons_t',
    symbol: 't',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm th trong tiếng việt bật hơi mạnh',
    leadingText: 'đọc như âm',
    vietnameseSound: 'th',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    highlightedPhrase: 'bật hơi mạnh',
    lipShapeDesc: 'Môi hé nhẹ tự nhiên.',
    tonguePositionDesc: 'Đầu lưỡi chặn chặt sau nướu răng cửa trên rồi bật mạnh luồng hơi dứt khoát.',
    page: 3
  },
  'cons_k': {
    soundId: 'cons_k',
    symbol: 'k',
    headerColor: 'red',
    vietnameseGuideRaw: 'đọc như âm kh trong tiếng việt bật hơi mạnh hơn',
    leadingText: 'đọc như âm',
    vietnameseSound: 'kh',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    highlightedPhrase: 'bật hơi mạnh hơn',
    lipShapeDesc: 'Miệng mở hờ tự nhiên.',
    tonguePositionDesc: 'Cuống lưỡi nâng chặn chặt vòm họng mềm rồi bật luồng hơi gió dứt khoát.',
    page: 3
  },
  'cons_b': {
    soundId: 'cons_b',
    symbol: 'b',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm b trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'b',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Hai môi mím chặt chặn hơi rồi bật nhẹ.',
    tonguePositionDesc: 'Cổ họng rung rõ rệt ngay khi bật mở hai môi (hữu thanh).',
    page: 3
  },
  'cons_d': {
    soundId: 'cons_d',
    symbol: 'd',
    headerColor: 'blue',
    vietnameseGuideRaw: 'Giống âm đ tiếng Việt nhưng hơi bật mạnh hơn',
    leadingText: 'Giống âm',
    vietnameseSound: 'đ',
    vietnameseSoundColor: 'red',
    trailingText: 'tiếng Việt nhưng',
    highlightedPhrase: 'hơi bật mạnh hơn',
    lipShapeDesc: 'Miệng mở nhẹ tự nhiên.',
    tonguePositionDesc: 'Đầu lưỡi ép chặt chân răng trên rồi bật nhẹ đồng thời rung dây thanh quản.',
    page: 3
  },
  'cons_g': {
    soundId: 'cons_g',
    symbol: 'g',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm g trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'g',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Miệng mở hờ tự nhiên.',
    tonguePositionDesc: 'Gốc lưỡi chạm ngạc mềm rồi hạ xuống đồng thời làm rung thanh quản.',
    page: 3
  },
  'cons_s': {
    soundId: 'cons_s',
    symbol: 's',
    headerColor: 'blue',
    vietnameseGuideRaw: '- đọc như âm x trong tiếng việt, lưỡi đặt sau răng, thổi hơi ra',
    leadingText: '- đọc như âm',
    vietnameseSound: 'x',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt,',
    highlightedPhrase: 'lưỡi đặt sau răng, thổi hơi ra',
    lipShapeDesc: 'Môi hơi mở cười nhẹ, hai hàm răng khép gần sát nhau.',
    tonguePositionDesc: 'Đầu lưỡi đặt nhẹ ngay sau chân răng cửa trên, xì luồng hơi gió sắc nhọn qua kẽ răng.',
    page: 3
  },
  'cons_z': {
    soundId: 'cons_z',
    symbol: 'z',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm d giọng miền Nam trong tiếng việt, nghe như tiếng ong kêu',
    leadingText: 'đọc như âm',
    vietnameseSound: 'd',
    vietnameseSoundColor: 'red',
    trailingText: 'giọng miền Nam trong tiếng việt,',
    highlightedPhrase: 'nghe như tiếng ong kêu',
    lipShapeDesc: 'Hai hàm răng khép gần sát nhau giống âm /s/.',
    tonguePositionDesc: 'Đầu lưỡi đặt sau răng trên, xì hơi đồng thời rung mạnh thanh quản tạo tiếng "z...z...z".',
    page: 3
  },

  // ================= PAGE 4: PHỤ ÂM PHẦN 2 =================
  'cons_sh': {
    soundId: 'cons_sh',
    symbol: 'ʃ',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm s trong tiếng việt - tròn môi',
    leadingText: 'đọc như âm',
    vietnameseSound: 's',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt -',
    highlightedPhrase: 'tròn môi',
    lipShapeDesc: 'Chu môi tròn sâu về phía trước như đang ra hiệu giữ yên lặng "suỵt".',
    tonguePositionDesc: 'Thân lưỡi cong nâng lên sát vòm miệng cứng, thổi luồng hơi dày êm dịu.',
    page: 4
  },
  'cons_ch': {
    soundId: 'cons_ch',
    symbol: 'tʃ',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm ch trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'ch',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Môi hơi chu tròn về phía trước.',
    tonguePositionDesc: 'Đầu lưỡi chặn chân răng trên rồi giật lùi bật ra luồng hơi dứt khoát như "ch".',
    page: 4
  },
  'cons_j': {
    soundId: 'cons_j',
    symbol: 'dʒ',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm gi giọng miền Nam trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'gi',
    vietnameseSoundColor: 'red',
    trailingText: 'giọng miền Nam trong tiếng việt',
    lipShapeDesc: 'Môi hơi tròn hướng về trước giống âm /tʃ/.',
    tonguePositionDesc: 'Khẩu hình giống /tʃ/ nhưng bật hơi đồng thời rung mạnh thanh quản.',
    page: 4
  },
  'cons_zh': {
    soundId: 'cons_zh',
    symbol: 'ʒ',
    displaySymbol: '3',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc gần giống âm gi trong tiếng việt nhưng mềm hơn',
    leadingText: 'đọc gần giống âm',
    vietnameseSound: 'gi',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    highlightedPhrase: 'nhưng mềm hơn',
    lipShapeDesc: 'Chu tròn môi nhẹ như âm /ʃ/.',
    tonguePositionDesc: 'Thổi hơi liên tục qua thân lưỡi đồng thời rung dây thanh quản.',
    page: 4
  },
  'cons_ng': {
    soundId: 'cons_ng',
    symbol: 'ŋ',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm ng trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'ng',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Miệng hé mở tự nhiên.',
    tonguePositionDesc: 'Cuống lưỡi nâng chạm chặt ngạc mềm, âm thanh phát rung qua khoang mũi.',
    page: 4
  },
  'cons_r': {
    soundId: 'cons_r',
    symbol: 'r',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm r trong tiếng việt nhưng cuốn lưỡi, không rung',
    leadingText: 'đọc như âm',
    vietnameseSound: 'r',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt nhưng',
    highlightedPhrase: 'cuốn lưỡi, không rung',
    lipShapeDesc: 'Môi hơi chu tròn nhẹ về trước.',
    tonguePositionDesc: 'Đầu lưỡi uốn cong hướng lên trên vòm họng nhưng không chạm vào vòm và không rung lưỡi.',
    page: 4
  },
  'cons_y': {
    soundId: 'cons_y',
    symbol: 'j',
    headerColor: 'blue',
    vietnameseGuideRaw: 'đọc như âm y trong tiếng việt',
    leadingText: 'đọc như âm',
    vietnameseSound: 'y',
    vietnameseSoundColor: 'red',
    trailingText: 'trong tiếng việt',
    lipShapeDesc: 'Khóe môi mở bè nhẹ sang hai bên như âm /iː/.',
    tonguePositionDesc: 'Thân lưỡi nâng rất cao sát vòm ngạc rồi nhanh chóng lướt sang nguyên âm tiếp theo.',
    page: 4
  },
  'cons_w': {
    soundId: 'cons_w',
    symbol: 'w',
    headerColor: 'purple',
    vietnameseGuideRaw: 'Kết hợp môi tròn – hơi giống "u" đứng đầu',
    leadingText: 'Kết hợp',
    highlightedPhrase: 'môi tròn – hơi giống "u" đứng đầu',
    lipShapeDesc: 'Chu môi tròn nhỏ chặt về trước như huýt sáo rồi mở nhanh ra.',
    tonguePositionDesc: 'Cuống lưỡi nâng cao về phía sau vòm mềm, lướt nhanh sang âm sau.',
    page: 4
  },
  'cons_theta': {
    soundId: 'cons_theta',
    symbol: 'θ',
    headerColor: 'purple',
    vietnameseGuideRaw: 'không có trong tiếng Việt, Đặt đầu lưỡi giữa hai hàm răng, thổi hơi ra. Không rung cổ họng.',
    leadingText: 'không có trong tiếng Việt,',
    isUnderline: true,
    highlightedPhrase: 'Đặt đầu lưỡi giữa hai hàm răng, thổi hơi ra. Không rung cổ họng.',
    notes: 'Đặt đầu lưỡi thè nhẹ giữa hai hàm răng trên và dưới, thổi luồng hơi gió mát ra ngoài (vô thanh)',
    lipShapeDesc: 'Miệng mở hé, răng hàm trên và hàm dưới kẹp nhẹ đầu lưỡi.',
    tonguePositionDesc: 'Đầu lưỡi thò nhẹ ra ngoài giữa hai hàm răng, đẩy hơi qua kẽ răng mà không rung cổ.',
    page: 4
  },
  'cons_eth': {
    soundId: 'cons_eth',
    symbol: 'ð',
    headerColor: 'purple',
    vietnameseGuideRaw: 'không có trong tiếng Việt, Đặt đầu lưỡi giữa hai hàm răng, phát âm và rung cổ họng.',
    leadingText: 'không có trong tiếng Việt,',
    isUnderline: true,
    highlightedPhrase: 'Đặt đầu lưỡi giữa hai hàm răng, phát âm và rung cổ họng.',
    notes: 'Khẩu hình giống âm /θ/ (thè đầu lưỡi giữa 2 hàm răng) nhưng tạo độ rung rền ở thanh quản',
    lipShapeDesc: 'Miệng mở hé, răng cửa kẹp nhẹ phần đầu lưỡi.',
    tonguePositionDesc: 'Đầu lưỡi thò nhẹ giữa hai hàm răng, phát âm đẩy hơi đồng thời làm rung thanh quản.',
    page: 4
  }
};

export function getVietnameseSoundGuide(soundIdOrSymbol: string): VietnameseSoundGuide | undefined {
  if (VIETNAMESE_SOUND_GUIDES[soundIdOrSymbol]) {
    return VIETNAMESE_SOUND_GUIDES[soundIdOrSymbol];
  }
  // Try searching by symbol
  const entry = Object.values(VIETNAMESE_SOUND_GUIDES).find(
    (g) => g.symbol === soundIdOrSymbol || g.displaySymbol === soundIdOrSymbol
  );
  return entry;
}
