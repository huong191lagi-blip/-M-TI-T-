export type SoundCategory = 
  | 'monophthong_short' 
  | 'monophthong_long' 
  | 'diphthong' 
  | 'consonant_voiceless' 
  | 'consonant_voiced';

export type ArticulationTonguePosition = 'front' | 'central' | 'back';
export type ArticulationTongueHeight = 'high' | 'mid' | 'low';
export type ArticulationLipShape = 'spread' | 'neutral' | 'round';
export type ArticulationJawOpening = 'closed' | 'half-closed' | 'half-open' | 'open';
export type ArticulationAirflow = 'continuous' | 'plosive' | 'fricative' | 'nasal' | 'glide' | 'affricate' | 'lateral';
export type VocalCordState = 'voiced' | 'voiceless';

export interface ExampleWord {
  word: string;
  ipa: string;
  meaningVi: string;
  highlightIndex?: number;
}

export interface MinimalPair {
  soundA: string;
  wordA: string;
  ipaA: string;
  meaningA: string;
  soundB: string;
  wordB: string;
  ipaB: string;
  meaningB: string;
  distinctionTip: string;
}

export interface ArticulationGuide {
  tonguePosition: ArticulationTonguePosition;
  tongueHeight: ArticulationTongueHeight;
  lipShape: ArticulationLipShape;
  jawOpening: ArticulationJawOpening;
  vocalCords: VocalCordState;
  airflow: ArticulationAirflow;
  stepByStep: string[];
  vietnameseMistakeTip: string;
  phoneticDescriptionVi: string;
  sagittalImageUrl?: string;
  sagittalColorImageUrl?: string;
  lipsImageUrl?: string;
  vowelChartUrl?: string;
}

export interface IPASound {
  id: string;
  symbol: string;
  name: string;
  category: SoundCategory;
  categoryNameVi: string;
  exampleWords: ExampleWord[];
  articulation: ArticulationGuide;
  minimalPairs?: MinimalPair[];
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    activeRing: string;
  };
}

export interface PronunciationAttempt {
  id: string;
  soundId: string;
  word: string;
  ipa: string;
  score: number;
  accuracy: string;
  userTranscript?: string;
  vietnameseFeedback: string;
  phoneticNotes: string;
  actionableTips: string[];
  timestamp: number;
}

export interface DailyGoal {
  soundsToPractice: number;
  quizzesToComplete: number;
  dragDropsToComplete: number;
  recordingsToMake: number;
}

export interface UserProgress {
  streak: number;
  lastActiveDate: string;
  masteredSoundIds: string[];
  savedSoundIds: string[];
  attempts: PronunciationAttempt[];
  todayProgress: {
    date: string;
    soundsPracticed: string[];
    quizzesCompleted: number;
    dragDropsCompleted: number;
    recordingsMade?: number;
    pointsEarned: number;
  };
  totalPoints: number;
}

export interface ReminderSettings {
  enabled: boolean;
  preferredTime: string; // e.g. "20:00"
  dailySoundGoal: number; // e.g. 3
  pushSubscribed: boolean;
}

export type QuizType = 
  | 'sound_to_ipa' 
  | 'odd_one_out' 
  | 'minimal_pair' 
  | 'voiced_unvoiced'
  | 'transcription_match';

export interface QuizOption {
  id: string;
  text: string;
  subtext?: string;
  ipa?: string;
  audioTarget?: string;
  audioWord?: string;
}

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  context?: string;
  audioTarget?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanationVi: string;
  relatedSoundId?: string;
}

export interface DragDropTile {
  id: string;
  phoneme: string;
  category: SoundCategory;
}

export interface DragDropExercise {
  id: string;
  word: string;
  meaningVi: string;
  ipaFull: string;
  correctPhonemes: string[]; // e.g. ["k", "æ", "t"]
  tilePool: string[]; // correct + distractor tiles
  level: 'easy' | 'medium' | 'hard';
  hintVi: string;
}

export interface SyllableAnalysisWord {
  id: number; // 1 - 200
  word: string;
  meaningVi: string;
  ipa: string;
  visibleVowels: string; // Cột 3: Nguyên âm / Cặp nguyên âm nhìn thấy (VD: oa, ee, y, i...)
  appliedRule: string;   // Cột 4: Ghi chú quy tắc gặp phải (Nguyên âm đôi / Y cuối từ / E câm bỏ đi / Giữ đuôi -le...)
  syllableCount: number; // Cột 5: Chốt số âm tiết thực tế
  syllablesDisplay: string;
  part: 1 | 2 | 3 | 4;
  partTitle: string;
}
