import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini client server-side lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Endpoint to analyze pronunciation accuracy and give tailored feedback
app.post('/api/analyze-pronunciation', async (req, res) => {
  try {
    const { targetSound, targetWord, targetIpa, userTranscript, confidence } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Return smart fallback heuristic if API key is not configured
      const isClose = userTranscript && targetWord && 
        userTranscript.trim().toLowerCase().includes(targetWord.trim().toLowerCase());
      const score = isClose ? Math.min(95, Math.max(70, Math.round((confidence || 0.8) * 100))) : 50;

      return res.json({
        score,
        accuracy: score >= 80 ? 'Tốt' : score >= 60 ? 'Khá' : 'Cần cải thiện',
        vietnameseFeedback: isClose 
          ? `Bạn đã phát âm từ "${targetWord}" khá tốt! Hãy chú ý mở khẩu hình đúng chuẩn cho âm ${targetSound}.`
          : `Có vẻ âm ${targetSound} trong từ "${targetWord}" chưa rõ. Hãy nghe lại giọng mẫu và chú ý vị trí đặt lưỡi.`,
        phoneticNotes: `Âm mục tiêu: ${targetIpa}. Nhận diện được: "${userTranscript || 'Chưa rõ'}"`,
        actionableTips: [
          `Luyện tập âm ${targetSound} độc lập 3 lần trước khi ghép vào từ.`,
          `Quan sát hình vẽ khẩu hình để căn chỉnh độ mở của môi và vị trí đầu lưỡi.`
        ]
      });
    }

    const prompt = `Bạn là một chuyên gia ngữ âm học tiếng Anh bản ngữ và giáo viên dạy phát âm IPA chuyên sâu cho người Việt Nam.
Hãy phân tích và đánh giá phát âm của học viên:
- Ký tự IPA mục tiêu: ${targetSound} (${targetIpa})
- Từ mẫu cần phát âm: "${targetWord}"
- Phiên âm chuẩn: ${targetIpa}
- Văn bản nhận diện từ giọng nói học viên (STT): "${userTranscript || 'Không nhận diện rõ'}"
- Độ tin cậy nhận diện: ${confidence || 0.75}

Hãy trả về JSON với cấu trúc:
{
  "score": <số nguyên từ 0 đến 100 biểu thị độ chính xác>,
  "accuracy": "<'Xuất sắc' | 'Tốt' | 'Khá' | 'Cần cải thiện'>",
  "vietnameseFeedback": "<Nhận xét ngắn gọn, khích lệ và chỉ rõ điểm phát âm được hay chưa được bằng tiếng Việt>",
  "phoneticNotes": "<Phân tích chi tiết về âm thanh, lỗi khẩu hình/độ dài âm/bật hơi/hữu thanh mà người Việt hay mắc phải đối với âm này>",
  "actionableTips": [
    "<Mẹo thực hành cụ thể số 1>",
    "<Mẹo thực hành cụ thể số 2>"
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);
    res.json(parsedData);
  } catch (error) {
    console.error('Error analyzing pronunciation:', error);
    res.status(500).json({
      score: 70,
      accuracy: 'Khá',
      vietnameseFeedback: 'Đã ghi nhận giọng đọc của bạn. Hãy tiếp tục luyện tập khẩu hình để âm chuẩn xác hơn.',
      phoneticNotes: 'Hãy chú ý độ rung thanh quản và luồng hơi khi phát âm.',
      actionableTips: ['Luyện nghe lại mẫu chuẩn và lặp lại theo nhịp điệu.']
    });
  }
});

// Endpoint for smart customized study reminder tips
app.post('/api/smart-reminder-tip', async (req, res) => {
  try {
    const { streak, masteredCount, weakSounds = [], currentGoal } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        title: streak > 0 ? `🔥 Giữ vững chuỗi ${streak} ngày học IPA!` : '🎯 Bắt đầu thói quen luyện IPA hôm nay!',
        message: weakSounds.length > 0 
          ? `Dành 3 phút hôm nay để chinh phục các âm ${weakSounds.slice(0, 2).join(', ')} nào!`
          : `Bạn đã làm chủ ${masteredCount}/44 âm IPA. Luyện thêm 5 phút để hoàn thiện nhé!`,
        microChallenge: 'Hoàn thành 1 bài trắc nghiệm phân biệt âm để tích điểm.'
      });
    }

    const prompt = `Tạo một thông báo nhắc nhở học tập thông minh, ngắn gọn, truyền cảm hứng và cá nhân hóa cho người học phát âm tiếng Anh IPA:
- Chuỗi ngày liên tiếp: ${streak} ngày
- Số âm IPA đã thành thạo: ${masteredCount}/44 âm
- Các âm còn yếu hoặc cần ôn tập: ${weakSounds.join(', ') || 'Chưa có dữ liệu'}
- Mục tiêu ngày: ${currentGoal || '5 âm mỗi ngày'}

Trả về JSON:
{
  "title": "<Tiêu đề ngắn gọn, có icon cảm xúc, kích thích học>",
  "message": "<Nội dung lời nhắc 1-2 câu súc tích bằng tiếng Việt>",
  "microChallenge": "<Một thử thách nhỏ 2-3 phút, ví dụ: Luyện 3 từ chứa âm /θ/ hoặc thử bài kéo thả phiên âm>"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error) {
    console.error('Error generating reminder tip:', error);
    res.json({
      title: '⏰ Đã đến giờ luyện IPA!',
      message: 'Chỉ cần 5 phút luyện khẩu hình mỗi ngày để cải thiện phát âm tiếng Anh vượt bậc.',
      microChallenge: 'Thực hành phát âm 3 từ mới hôm nay.'
    });
  }
});

// Vite middleware for dev or static files for prod
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IPA Training Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
