import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- MINIMAL PAIRS & SOUND RECOGNITION ---
  {
    id: 'quiz_1',
    type: 'minimal_pair',
    question: 'Nghe và chọn từ bạn nghe thấy: "/ʃiːp/" hay "/ʃɪp/"?',
    context: 'Phân biệt nguyên âm dài /iː/ và nguyên âm ngắn /ɪ/',
    audioTarget: 'sheep',
    options: [
      { id: 'opt_1', text: 'Sheep /ʃiːp/', subtext: 'Con cừu (Nguyên âm dài)', audioWord: 'sheep' },
      { id: 'opt_2', text: 'Ship /ʃɪp/', subtext: 'Con tàu (Nguyên âm ngắn)', audioWord: 'ship' },
      { id: 'opt_3', text: 'Shape /ʃeɪp/', subtext: 'Hình dạng (Nguyên âm đôi)', audioWord: 'shape' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: 'Từ phát âm là "sheep" với âm /iː/ kéo dài, khóe môi kéo căng như đang cười. "Ship" có âm /ɪ/ ngắn và dứt khoát.',
    relatedSoundId: 'long_i'
  },
  {
    id: 'quiz_2',
    type: 'sound_to_ipa',
    question: 'Âm đầu tiên trong từ "Think" phát âm là ký tự IPA nào?',
    context: 'Từ "think" /θɪŋk/',
    audioTarget: 'think',
    options: [
      { id: 'opt_1', text: '/θ/', subtext: 'Voiceless TH (kẹp lưỡi thổi hơi)' },
      { id: 'opt_2', text: '/ð/', subtext: 'Voiced TH (kẹp lưỡi rung cổ)' },
      { id: 'opt_3', text: '/s/', subtext: 'Voiceless S (khép răng xì hơi)' },
      { id: 'opt_4', text: '/t/', subtext: 'Voiceless T (bật hơi nướu trên)' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: '"Think" bắt đầu bằng âm vô thanh /θ/. Bạn cần đặt đầu lưỡi giữa hai hàm răng và thổi luồng hơi gió nhẹ nhàng ra ngoài.',
    relatedSoundId: 'cons_theta'
  },
  {
    id: 'quiz_3',
    type: 'odd_one_out',
    question: 'Từ nào dưới đây có phần gạch chân phát âm KHÁC với các từ còn lại?',
    context: 'Chữ cái "ea": b[ea]d, r[ea]d, br[ea]d, m[ea]t',
    options: [
      { id: 'opt_1', text: 'Bread', subtext: 'Phát âm /e/', audioWord: 'bread' },
      { id: 'opt_2', text: 'Bead', subtext: 'Phát âm /iː/', audioWord: 'bead' },
      { id: 'opt_3', text: 'Read (hiện tại)', subtext: 'Phát âm /iː/', audioWord: 'read' },
      { id: 'opt_4', text: 'Meat', subtext: 'Phát âm /iː/', audioWord: 'meat' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: '"Bread" có nguyên âm /e/ ngắn (/bred/), trong khi "bead" (/biːd/), "read" (/riːd/) và "meat" (/miːt/) đều mang âm /iː/ dài.',
    relatedSoundId: 'short_e'
  },
  {
    id: 'quiz_4',
    type: 'voiced_unvoiced',
    question: 'Cặp âm nào dưới đây là cặp "Vô thanh - Hữu thanh" cùng vị trí khẩu hình?',
    context: 'Cặp phụ âm đối xứng',
    options: [
      { id: 'opt_1', text: '/p/ và /b/', subtext: 'Đều mím hai môi (Vô thanh vs Hữu thanh)' },
      { id: 'opt_2', text: '/s/ và /f/', subtext: 'Khác vị trí khẩu hình' },
      { id: 'opt_3', text: '/t/ và /k/', subtext: 'Khác vị trí tiếp xúc lưỡi' },
      { id: 'opt_4', text: '/m/ và /n/', subtext: 'Đều là âm mũi hữu thanh' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: '/p/ và /b/ là cặp âm cùng dùng hai môi (Bilabial). /p/ bật hơi vô thanh (không rung cổ), /b/ rung dây thanh quản hữu thanh.',
    relatedSoundId: 'cons_p'
  },
  {
    id: 'quiz_5',
    type: 'minimal_pair',
    question: 'Nghe và chọn từ được phát âm: "Cat" /kæt/ hay "Cut" /kʌt/?',
    context: 'Phân biệt âm /æ/ (e bẹt) và âm /ʌ/ (á ngắn)',
    audioTarget: 'cat',
    options: [
      { id: 'opt_1', text: 'Cat /kæt/', subtext: 'Con mèo (Hạ cằm sâu, bẹt miệng)', audioWord: 'cat' },
      { id: 'opt_2', text: 'Cut /kʌt/', subtext: 'Cắt (Mở miệng vừa, dứt khoát)', audioWord: 'cut' },
      { id: 'opt_3', text: 'Cot /kɒt/', subtext: 'Giường cũi (Âm o ngắn)', audioWord: 'cot' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: '"Cat" có âm /æ/ đòi hỏi mở rộng miệng hết cỡ theo chiều dọc và ngang. "Cut" dùng âm /ʌ/ mở miệng hẹp hơn.',
    relatedSoundId: 'short_ae'
  },
  {
    id: 'quiz_6',
    type: 'transcription_match',
    question: 'Phiên âm IPA chuẩn quốc tế của từ "Teacher" là gì?',
    context: 'Từ "teacher" (giáo viên)',
    audioTarget: 'teacher',
    options: [
      { id: 'opt_1', text: '/ˈtiːtʃə/', subtext: 'Trọng âm 1: /iː/ dài + /tʃ/ + /ə/' },
      { id: 'opt_2', text: '/ˈtɪtʃə/', subtext: 'Dùng /ɪ/ ngắn (Sai)' },
      { id: 'opt_3', text: '/ˈtiːʃə/', subtext: 'Dùng /ʃ/ thay vì /tʃ/ (Sai)' },
      { id: 'opt_4', text: '/tiːˈtʃɜː/', subtext: 'Trọng âm 2 (Sai)' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: '"Teacher" phiên âm đúng là /ˈtiːtʃə/: âm /iː/ dài ở âm tiết nhấn trọng âm, phụ âm /tʃ/ bật nổ giòn giã và kết thúc bằng âm schwa /ə/.',
    relatedSoundId: 'cons_ch'
  },
  {
    id: 'quiz_7',
    type: 'sound_to_ipa',
    question: 'Âm đuôi (ending sound) của từ "Dogs" phát âm là gì?',
    context: 'Từ "dogs" /dɒɡz/',
    audioTarget: 'dogs',
    options: [
      { id: 'opt_1', text: '/z/', subtext: 'Phụ âm hữu thanh rung tiếng ong kêu' },
      { id: 'opt_2', text: '/s/', subtext: 'Phụ âm vô thanh xì hơi' },
      { id: 'opt_3', text: '/ɪz/', subtext: 'Âm tiết mở rộng' },
      { id: 'opt_4', text: 'Âm câm không phát âm' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: 'Theo quy tắc phát âm đuôi -s/-es: sau phụ âm hữu thanh /ɡ/ (trong dog), đuôi "s" được phát âm thành /z/ (hữu thanh rung cổ).',
    relatedSoundId: 'cons_z'
  },
  {
    id: 'quiz_8',
    type: 'odd_one_out',
    question: 'Từ nào có âm đầu phát âm là /ð/ (hữu thanh) thay vì /θ/ (vô thanh)?',
    context: 'Nhận biết âm TH',
    options: [
      { id: 'opt_1', text: 'This', subtext: 'Phát âm /ðɪs/ (Hữu thanh rung lưỡi)', audioWord: 'this' },
      { id: 'opt_2', text: 'Think', subtext: 'Phát âm /θɪŋk/ (Vô thanh)', audioWord: 'think' },
      { id: 'opt_3', text: 'Thank', subtext: 'Phát âm /θæŋk/ (Vô thanh)', audioWord: 'thank' },
      { id: 'opt_4', text: 'Three', subtext: 'Phát âm /θriː/ (Vô thanh)', audioWord: 'three' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: '"This", "that", "these", "those", "they", "mother" đều có âm /ð/ hữu thanh rung cổ họng.',
    relatedSoundId: 'cons_eth'
  },
  {
    id: 'quiz_9',
    type: 'minimal_pair',
    question: 'Nghe và chọn từ: "Van" /væn/ hay "Fan" /fæn/?',
    context: 'Phân biệt /v/ (hữu thanh) và /f/ (vô thanh)',
    audioTarget: 'van',
    options: [
      { id: 'opt_1', text: 'Van /væn/', subtext: 'Xe tải nhỏ (Rung cổ họng)', audioWord: 'van' },
      { id: 'opt_2', text: 'Fan /fæn/', subtext: 'Cái quạt (Thổi hơi không rung)', audioWord: 'fan' },
      { id: 'opt_3', text: 'Pan /pæn/', subtext: 'Cái chảo (Mím môi bật hơi)', audioWord: 'pan' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: '"Van" bắt đầu bằng âm hữu thanh /v/ (răng trên chạm môi dưới và làm rung dây thanh quản).',
    relatedSoundId: 'cons_v'
  },
  {
    id: 'quiz_10',
    type: 'sound_to_ipa',
    question: 'Âm nào là nguyên âm phổ biến nhất trong tiếng Anh giao tiếp (âm lười)?',
    context: 'Nguyên âm không nhấn trọng âm',
    options: [
      { id: 'opt_1', text: '/ə/ (Schwa)', subtext: 'Âm ơ ngắn thả lỏng hoàn toàn cơ miệng' },
      { id: 'opt_2', text: '/iː/', subtext: 'Âm i dài' },
      { id: 'opt_3', text: '/æ/', subtext: 'Âm e bẹt' },
      { id: 'opt_4', text: '/uː/', subtext: 'Âm u dài' }
    ],
    correctOptionId: 'opt_1',
    explanationVi: 'Âm Schwa /ə/ là âm phổ biến nhất trong tiếng Anh. Nó xuất hiện trong hầu hết các âm tiết yếu không mang trọng âm như "about", "banana", "teacher".',
    relatedSoundId: 'short_schwa'
  }
];
