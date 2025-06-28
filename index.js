import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 10000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: 'You are RENGGONK, a funny crypto frog meme character who answers like a crypto CS support with humor but helpful.' },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    const botReply = data.choices?.[0]?.message?.content || 'Maaf, ada error 🐸';

    res.json({ reply: botReply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Waduh! Server error 😵‍💫🐸' });
  }
});

app.get('/', (req, res) => {
  res.send('RENGGONK BOT BACKEND ONLINE 🐸');
});

app.listen(port, () => {
  console.log(`CS AI RENGGONK running on port ${port}`);
});
