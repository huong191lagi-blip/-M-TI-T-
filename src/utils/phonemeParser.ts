import { SyllableAnalysisWord, DragDropExercise } from '../types';

// Multicharacter phonemes sorted by length descending so longer ones match first
const MULTICHAR_PHONEMES: string[] = [
  // Triphthongs / 3-character phonemes
  'aɪə', 'aʊə', 'eər', 'ɪər', 'ʊər', 'ɑːr', 'ɔːr', 'ɜːr',
  // Diphthongs & 2-character phonemes
  'eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'oʊ', 'ɪə', 'eə', 'ʊə', 'juː',
  'iː', 'uː', 'ɑː', 'ɔː', 'ɜː',
  'tʃ', 'dʒ', 'θ', 'ð', 'ʃ', 'ʒ', 'ŋ',
  'ər'
];

const COMMON_CONSONANTS = ['p', 'b', 't', 'd', 'k', 'ɡ', 'tʃ', 'dʒ', 'f', 'v', 'θ', 'ð', 's', 'z', 'ʃ', 'ʒ', 'h', 'm', 'n', 'ŋ', 'l', 'r', 'w', 'j'];
const COMMON_VOWELS = ['iː', 'ɪ', 'e', 'æ', 'ɑː', 'ɒ', 'ɔː', 'ʊ', 'uː', 'ʌ', 'ɜː', 'ə', 'eɪ', 'aɪ', 'ɔɪ', 'əʊ', 'aʊ', 'ɪə', 'eə'];

export const VOWEL_PHONEMES = new Set([
  'iː', 'ɪ', 'e', 'æ', 'ɑː', 'ɒ', 'ɔː', 'ʊ', 'uː', 'ʌ', 'ɜː', 'ə',
  'eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'oʊ', 'ɪə', 'eə', 'ʊə',
  'juː', 'aɪə', 'aʊə', 'eər', 'ɪər', 'ʊər', 'ɑːr', 'ɔːr', 'ɜːr', 'ər'
]);

export function isVowelPhoneme(phoneme: string): boolean {
  const clean = phoneme.trim().toLowerCase();
  return VOWEL_PHONEMES.has(clean);
}

export function getPhonemeClassification(phoneme: string): {
  type: 'vowel' | 'consonant';
  typeNameVi: string;
  subTypeVi: string;
  descriptionVi: string;
} {
  const clean = phoneme.trim();
  const isVowel = isVowelPhoneme(clean);

  if (isVowel) {
    let subType = 'Nguyên âm ngắn';
    let desc = 'Luồng khí đi ra tự do, dây thanh quản rung, không bị cản trở bởi môi/răng/lưỡi.';

    if (['iː', 'ɑː', 'ɔː', 'uː', 'ɜː'].includes(clean)) {
      subType = 'Nguyên âm dài';
      desc = 'Nguyên âm kéo dài hơi, dây thanh rung rõ, phát âm dứt khoát sâu.';
    } else if (['eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'oʊ', 'ɪə', 'eə', 'ʊə'].includes(clean)) {
      subType = 'Nguyên âm đôi (Diphthong)';
      desc = 'Kết hợp chuyển động mượt mà từ âm này sang âm khác trong cùng một âm tiết.';
    }

    return {
      type: 'vowel',
      typeNameVi: 'Nguyên âm (Vowel)',
      subTypeVi: subType,
      descriptionVi: desc
    };
  }

  // Consonants
  let subType = 'Phụ âm (Consonant)';
  let desc = 'Luồng khí khi phát ra bị cản trở bởi các cơ quan phát âm (môi, răng, lưỡi, vòm họng).';

  if (['p', 't', 'k', 'f', 'θ', 's', 'ʃ', 'tʃ', 'h'].includes(clean)) {
    subType = 'Phụ âm vô thanh (Voiceless)';
    desc = 'Chỉ có luồng gió bật ra, dây thanh quản không rung.';
  } else if (['b', 'd', 'ɡ', 'v', 'ð', 'z', 'ʒ', 'dʒ', 'm', 'n', 'ŋ', 'l', 'r', 'w', 'j'].includes(clean)) {
    subType = 'Phụ âm hữu thanh (Voiced)';
    desc = 'Có độ rung rõ rệt tại cổ họng (dây thanh quản) khi phát âm.';
  }

  return {
    type: 'consonant',
    typeNameVi: 'Phụ âm (Consonant)',
    subTypeVi: subType,
    descriptionVi: desc
  };
}

/**
 * Parses raw IPA string (e.g. "/ˈtiː.tʃər/", "/ˈsiː.zən/") into individual phonemes
 */
export function parseIpaToPhonemes(ipaRaw: string): string[] {
  // Strip slashes, brackets, stress marks, syllable divider dots, and spaces
  const clean = ipaRaw.replace(/[\/\[\]ˈˌ. ]/g, '').replace(/g/g, 'ɡ');
  const tokens: string[] = [];
  let i = 0;

  while (i < clean.length) {
    let matched = false;
    for (const p of MULTICHAR_PHONEMES) {
      if (clean.startsWith(p, i)) {
        tokens.push(p);
        i += p.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push(clean[i]);
      i += 1;
    }
  }

  return tokens.filter((t) => t.trim().length > 0);
}

/**
 * Generate 3-4 smart distractor phonemes for a word
 */
export function generateDistractors(correctPhonemes: string[], count: number = 3): string[] {
  const correctSet = new Set(correctPhonemes);
  const candidates = [...COMMON_VOWELS, ...COMMON_CONSONANTS].filter((p) => !correctSet.has(p));
  
  // Shuffle candidates
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Converts a SyllableAnalysisWord from the 200 words into a full DragDropExercise
 */
export function convertSyllableWordToExercise(wordItem: SyllableAnalysisWord): DragDropExercise {
  const correctPhonemes = parseIpaToPhonemes(wordItem.ipa);
  const distractors = generateDistractors(correctPhonemes, correctPhonemes.length <= 4 ? 3 : 2);
  const tilePool = [...correctPhonemes, ...distractors].sort(() => Math.random() - 0.5);

  let level: 'easy' | 'medium' | 'hard' = 'medium';
  if (wordItem.syllableCount <= 2 && correctPhonemes.length <= 4) {
    level = 'easy';
  } else if (wordItem.syllableCount >= 3 || correctPhonemes.length >= 7) {
    level = 'hard';
  }

  return {
    id: `syllable_dd_${wordItem.id}`,
    word: wordItem.word,
    meaningVi: wordItem.meaningVi,
    ipaFull: wordItem.ipa,
    correctPhonemes,
    tilePool,
    level,
    hintVi: `Gồm ${wordItem.syllableCount} âm tiết (${wordItem.syllablesDisplay}). Quy tắc: ${wordItem.appliedRule}.`
  };
}
