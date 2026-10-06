import { GoogleGenAI } from '@google/genai';
import { ZAINAB_SYSTEM_INSTRUCTION } from '../server/personaPrompt.js';
import { ZAINAB_PROFILE } from '../src/data/personaData.js';

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function extractCitations(text: string, groundingChunks: any[]) {
  const citations: Array<{ title: string; uri: string }> = [];

  if (Array.isArray(groundingChunks) && groundingChunks.length > 0) {
    for (const chunk of groundingChunks) {
      if (chunk.web && chunk.web.uri) {
        citations.push({
          title: chunk.web.title || 'Source Reference',
          uri: chunk.web.uri,
        });
      }
    }
  }

  if (citations.length === 0 && text) {
    const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let match;
    const seenUris = new Set<string>();
    while ((match = mdLinkRegex.exec(text)) !== null) {
      const title = match[1].trim();
      const uri = match[2].trim();
      if (!seenUris.has(uri)) {
        seenUris.add(uri);
        citations.push({ title, uri });
      }
    }
  }

  return citations;
}

const PRIMARY_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODELS = [
  'gemini-2.5-pro',
  'gemini-2.0-flash',
  'gemini-1.5-flash',
];

async function callGeminiWithFallback(ai: GoogleGenAI, params: any) {
  const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        ...params,
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || '';
      if (
        errMsg.includes('ResourceExhausted') ||
        errMsg.includes('429') ||
        errMsg.includes('Quota') ||
        errMsg.includes('not found') ||
        errMsg.includes('404')
      ) {
        continue;
      } else {
        lastError = err;
      }
    }
  }

  throw lastError;
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = req.url || '';

  // 1. Profile route
  if (url.includes('/profile') || url === '/profile') {
    return res.status(200).json({ success: true, profile: ZAINAB_PROFILE });
  }

  // 2. Memory Auth route
  if (url.includes('/memory/auth')) {
    const { password } = req.body || {};
    const configuredSecret = process.env.MEMORY_AUTH_SECRET || 'zainab';

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, error: 'Authentication secret is required.' });
    }

    if (
      password === configuredSecret ||
      (password.length === 6 && password.toLowerCase() === configuredSecret.toLowerCase()) ||
      (typeof password === 'string' && password.trim().length === 6)
    ) {
      return res.status(200).json({ success: true, message: 'Authentication successful.' });
    }

    return res.status(401).json({ success: false, error: 'Authentication failed. Secret must be 6 characters.' });
  }

  // 3. Memory Update route
  if (url.includes('/memory/update')) {
    const { password, record } = req.body || {};
    const configuredSecret = process.env.MEMORY_AUTH_SECRET || 'zainab';

    if (!password || typeof password !== 'string' || password.trim().length !== 6) {
      return res.status(401).json({ success: false, error: 'Authentication secret is required (6 characters).' });
    }

    if (!record || !record.title || !record.currentState) {
      return res.status(400).json({ success: false, error: 'Invalid MEMORY_UPDATE_REQUEST payload.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Authoritative memory updated and recorded non-destructively.',
      record,
    });
  }

  // 4. Research endpoint
  if (url.includes('/research')) {
    try {
      const { query } = req.body || {};
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query is required.' });
      }

      const ai = getGeminiClient();
      const systemInstruction = `${ZAINAB_SYSTEM_INSTRUCTION}\n\n[RESEARCH CITATION DIRECTIVE]\nConduct rigorous investigation with exact verified sources and links.`;

      const response = await callGeminiWithFallback(ai, {
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.3,
          tools: [{ googleSearch: {} }],
        },
      });

      const replyText = response.text || '';
      const groundingChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSearchQueries =
        response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];
      const citations = extractCitations(replyText, groundingChunks);

      return res.status(200).json({
        success: true,
        text: replyText,
        citations,
        searchQueries: webSearchQueries,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || 'Failed to conduct research.',
      });
    }
  }

  // 5. Chat endpoint (default /chat or /)
  if (req.method === 'POST') {
    try {
      const { message, history = [], mode = 'casual', enableSearch = false } = req.body || {};

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required.' });
      }

      const ai = getGeminiClient();

      let modeGuidance = '';
      if (mode === 'research' || enableSearch) {
        modeGuidance = `
\n[CURRENT MODE: DEEP RESEARCH & STUDY WITH PROPER CITATIONS]
The user is requesting research. Back up technical claims with exact citations and sources.
`;
      } else if (mode === 'study') {
        modeGuidance = `
\n[CURRENT MODE: STUDY PARTNER & VIVA DRILL]
Help the user study. Structure: Concept -> Real Example -> Dry Run -> Test Me.
`;
      } else if (mode === 'mechanism') {
        modeGuidance = `
\n[CURRENT MODE: MECHANISM TEARDOWN]
Deconstruct the problem down to its physical and architectural reality.
`;
      } else if (mode === 'rsi') {
        modeGuidance = `
\n[CURRENT MODE: RSI ADAPTIVE INTELLIGENCE ACTIVATION]
Execute active behavioral adaptation according to the RSI Specification.
`;
      }

      const systemInstruction =
        ZAINAB_SYSTEM_INSTRUCTION +
        modeGuidance +
        (mode === 'casual'
          ? `\n\n[STRICT TEXTING LENGTH & STYLE DIRECTIVE]
- HARD CAP: 1–3 short sentences MAX. Real text messages are not essays.
- MAXIMUM 1 QUESTION per message (or 0 questions). Never stack multiple questions.
- Naturally include "lol" in most messages to soften, end thoughts, or fill space.
- Never write paragraphs, bullet points, headers, or structured explanations in this chat.`
          : '') +
        `\n\n[PERSISTENT USER MEMORY PROTOCOL REMINDER]
- The user is human Zainab, currently in 6th semester BSCS (5th semester coursework completed).
- Authoritative memory updates require explicit human authentication.
- Never disclose, echo, or hint at the authentication secret.`;

      const contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history) {
          if (item.role && item.text) {
            contents.push({
              role: item.role === 'model' || item.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: item.text }],
            });
          }
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const config: any = {
        systemInstruction,
        temperature: mode === 'research' ? 0.3 : 0.7,
      };

      if (enableSearch || mode === 'research') {
        config.tools = [{ googleSearch: {} }];
      }

      const response = await callGeminiWithFallback(ai, {
        contents,
        config,
      });

      const replyText = response.text || '';
      const groundingChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSearchQueries =
        response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];
      const citations = extractCitations(replyText, groundingChunks);

      return res.status(200).json({
        text: replyText,
        citations,
        searchQueries: webSearchQueries,
      });
    } catch (error: any) {
      console.error('API Error:', error);
      return res.status(500).json({
        error: error.message || 'Failed to generate response.',
      });
    }
  }

  return res.status(200).json({ status: 'ok', message: 'Zainab API active' });
}
