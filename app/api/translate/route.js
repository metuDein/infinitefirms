import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, targetLang } = req.body;

  try {
    const response = await axios.post(
      'https://libretranslate.com/translate',
      {
        q: text,
        source: 'auto',
        target: targetLang || 'es',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error('LibreTranslate API error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
}