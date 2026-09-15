import { DragDropExercise } from '../types';
import { SYLLABLE_WORDS } from './syllableData';
import { convertSyllableWordToExercise } from '../utils/phonemeParser';

export const FOUNDATIONAL_EXERCISES: DragDropExercise[] = [
  // EASY LEVEL (3 - 4 phonemes, basic CVC words)
  {
    id: 'dd_1',
    word: 'Cat',
    meaningVi: 'Con mèo',
    ipaFull: '/kæt/',
    correctPhonemes: ['k', 'æ', 't'],
    tilePool: ['k', 'æ', 't', 'p', 'e', 's'],
    level: 'easy',
    hintVi: 'Bắt đầu bằng phụ âm bật hơi /k/, nguyên âm bẹt /æ/, kết thúc bằng /t/.'
  },
  {
    id: 'dd_2',
    word: 'Ship',
    meaningVi: 'Con tàu thuỷ',
    ipaFull: '/ʃɪp/',
    correctPhonemes: ['ʃ', 'ɪ', 'p'],
    tilePool: ['ʃ', 'ɪ', 'p', 's', 'iː', 'b'],
    level: 'easy',
    hintVi: 'Âm đầu chu môi /ʃ/, nguyên âm ngắn dứt khoát /ɪ/, kết thúc bật hơi /p/.'
  },
  {
    id: 'dd_3',
    word: 'Dog',
    meaningVi: 'Con chó',
    ipaFull: '/dɒɡ/',
    correctPhonemes: ['d', 'ɒ', 'ɡ'],
    tilePool: ['d', 'ɒ', 'ɡ', 't', 'ɔː', 'k'],
    level: 'easy',
    hintVi: 'Gồm phụ âm /d/ nướu trên, nguyên âm ngắn /ɒ/, phụ âm cuống họng /ɡ/.'
  },
  {
    id: 'dd_4',
    word: 'Sun',
    meaningVi: 'Mặt trời',
    ipaFull: '/sʌn/',
    correctPhonemes: ['s', 'ʌ', 'n'],
    tilePool: ['s', 'ʌ', 'n', 'ʃ', 'ɑː', 'm'],
    level: 'easy',
    hintVi: 'Âm xì /s/, nguyên âm á ngắn /ʌ/, âm mũi /n/.'
  },
  {
    id: 'dd_5',
    word: 'Bed',
    meaningVi: 'Chiếc giường ngủ',
    ipaFull: '/bed/',
    correctPhonemes: ['b', 'e', 'd'],
    tilePool: ['b', 'e', 'd', 'p', 'æ', 't'],
    level: 'easy',
    hintVi: 'Phụ âm hai môi /b/, nguyên âm ngắn tự nhiên /e/, kết thúc bằng /d/.'
  },

  // MEDIUM LEVEL (Diphthongs & Special Consonant Digraphs)
  {
    id: 'dd_6',
    word: 'Think',
    meaningVi: 'Suy nghĩ',
    ipaFull: '/θɪŋk/',
    correctPhonemes: ['θ', 'ɪ', 'ŋ', 'k'],
    tilePool: ['θ', 'ɪ', 'ŋ', 'k', 's', 'ð', 'n'],
    level: 'medium',
    hintVi: 'Bắt đầu bằng âm kẹp lưỡi thổi hơi /θ/, nguyên âm /ɪ/, âm mũi /ŋ/ và bật /k/.'
  },
  {
    id: 'dd_7',
    word: 'Chair',
    meaningVi: 'Cái ghế tựa',
    ipaFull: '/tʃeə/',
    correctPhonemes: ['tʃ', 'eə'],
    tilePool: ['tʃ', 'eə', 'ʃ', 'dʒ', 'ɪə', 'r'],
    level: 'medium',
    hintVi: 'Âm bật nổ /tʃ/ kết hợp với nguyên âm đôi /eə/.'
  },
  {
    id: 'dd_8',
    word: 'Voice',
    meaningVi: 'Giọng nói',
    ipaFull: '/vɔɪs/',
    correctPhonemes: ['v', 'ɔɪ', 's'],
    tilePool: ['v', 'ɔɪ', 's', 'f', 'aɪ', 'z'],
    level: 'medium',
    hintVi: 'Phụ âm răng môi rung /v/, nguyên âm đôi /ɔɪ/, âm xì cuối /s/.'
  },
  {
    id: 'dd_9',
    word: 'Face',
    meaningVi: 'Khuôn mặt',
    ipaFull: '/feɪs/',
    correctPhonemes: ['f', 'eɪ', 's'],
    tilePool: ['f', 'eɪ', 's', 'v', 'aɪ', 'z', 't'],
    level: 'medium',
    hintVi: 'Âm vô thanh /f/, nguyên âm đôi /eɪ/, âm xì cuối /s/.'
  },
  {
    id: 'dd_10',
    word: 'House',
    meaningVi: 'Ngôi nhà',
    ipaFull: '/haʊs/',
    correctPhonemes: ['h', 'aʊ', 's'],
    tilePool: ['h', 'aʊ', 's', 'əʊ', 'z', 'm'],
    level: 'medium',
    hintVi: 'Âm hơi /h/, nguyên âm đôi /aʊ/ và âm xì /s/.'
  },

  // HARD LEVEL (Complex clusters, multi-phoneme words)
  {
    id: 'dd_11',
    word: 'Orange',
    meaningVi: 'Quả cam',
    ipaFull: '/ˈɒrɪndʒ/',
    correctPhonemes: ['ɒ', 'r', 'ɪ', 'n', 'dʒ'],
    tilePool: ['ɒ', 'r', 'ɪ', 'n', 'dʒ', 'ɔː', 'tʃ', 'm', 'd'],
    level: 'hard',
    hintVi: 'Gồm /ɒ/ ngắn, âm lướt /r/, /ɪ/, âm mũi /n/ và kết thúc bằng phụ âm rung /dʒ/.'
  },
  {
    id: 'dd_12',
    word: 'Teacher',
    meaningVi: 'Giáo viên',
    ipaFull: '/ˈtiːtʃə/',
    correctPhonemes: ['t', 'iː', 'tʃ', 'ə'],
    tilePool: ['t', 'iː', 'tʃ', 'ə', 'ɪ', 'ʃ', 'ɜː', 'd'],
    level: 'hard',
    hintVi: 'Bắt đầu bằng /t/, nguyên âm dài /iː/, phụ âm bật /tʃ/, âm đuôi schwa /ə/.'
  },
  {
    id: 'dd_13',
    word: 'Decision',
    meaningVi: 'Quyết định',
    ipaFull: '/dɪˈsɪʒn/',
    correctPhonemes: ['d', 'ɪ', 's', 'ɪ', 'ʒ', 'n'],
    tilePool: ['d', 'ɪ', 's', 'ɪ', 'ʒ', 'n', 'z', 'ʃ', 't'],
    level: 'hard',
    hintVi: 'Đặc biệt lưu ý phụ âm hữu thanh rung /ʒ/ trước âm mũi /n/.'
  },
  {
    id: 'dd_14',
    word: 'Candy',
    meaningVi: 'Viên kẹo',
    ipaFull: '/ˈkændi/',
    correctPhonemes: ['k', 'æ', 'n', 'd', 'i'],
    tilePool: ['k', 'æ', 'n', 'd', 'i', 'e', 't', 'p'],
    level: 'medium',
    hintVi: 'Phụ âm /k/, nguyên âm bẹt /æ/, /n/, /d/ và kết thúc bằng chữ y phát âm /i/.'
  },
  {
    id: 'dd_15',
    word: 'Table',
    meaningVi: 'Cái bàn',
    ipaFull: '/ˈteɪbl/',
    correctPhonemes: ['t', 'eɪ', 'b', 'l'],
    tilePool: ['t', 'eɪ', 'b', 'l', 'd', 'aɪ', 'p'],
    level: 'medium',
    hintVi: 'Bắt đầu /t/, nguyên âm đôi /eɪ/, phụ âm /b/ và giữ đuôi /-le/ phát âm /l/.'
  },
  {
    id: 'dd_16',
    word: 'Yellow',
    meaningVi: 'Màu vàng',
    ipaFull: '/ˈjeləʊ/',
    correctPhonemes: ['j', 'e', 'l', 'əʊ'],
    tilePool: ['j', 'e', 'l', 'əʊ', 'w', 'aʊ', 'iː'],
    level: 'medium',
    hintVi: 'Bán nguyên âm /j/, /e/, /l/ và cặp ow phát âm /əʊ/.'
  },
  {
    id: 'dd_17',
    word: 'Banana',
    meaningVi: 'Quả chuối',
    ipaFull: '/bəˈnɑːnə/',
    correctPhonemes: ['b', 'ə', 'n', 'ɑː', 'n', 'ə'],
    tilePool: ['b', 'ə', 'n', 'ɑː', 'n', 'ə', 'æ', 'm', 'd'],
    level: 'hard',
    hintVi: 'Gồm 3 âm tiết với 2 âm schwa /ə/ và trọng âm rơi vào /ɑː/ ở giữa.'
  },
  {
    id: 'dd_18',
    word: 'Hospital',
    meaningVi: 'Bệnh viện',
    ipaFull: '/ˈhɒspɪtl/',
    correctPhonemes: ['h', 'ɒ', 's', 'p', 'ɪ', 't', 'l'],
    tilePool: ['h', 'ɒ', 's', 'p', 'ɪ', 't', 'l', 'd', 'e'],
    level: 'hard',
    hintVi: 'Gồm 3 âm tiết với tổ hợp phụ âm /sp/ và đuôi âm tiết /tl/.'
  }
];

// All 200 exercises mapped directly from the 200 Syllable Analysis words
export const SYLLABLE_DRAG_DROP_EXERCISES: DragDropExercise[] = SYLLABLE_WORDS.map(convertSyllableWordToExercise);

// Complete pool combining all 200 Syllable Words + Foundational Starter Words
export const DRAG_DROP_EXERCISES: DragDropExercise[] = [
  ...SYLLABLE_DRAG_DROP_EXERCISES,
  ...FOUNDATIONAL_EXERCISES
];
