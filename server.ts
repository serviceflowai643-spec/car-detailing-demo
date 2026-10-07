import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini with server-side API key
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const PURE_AI_SYSTEM_INSTRUCTION = `You are Pure AI, the dedicated luxury automotive concierge for Pure Detailing UK in Chelmsford, Essex.

Role & Persona:
You represent a high-end automotive detailing studio led by Alex and Nathan. You are courteous, concise, knowledgeable, and provide fast, precise answers.

Studio Ground Truth:
- Business: Pure Detailing UK
- Studio Address: Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL, United Kingdom
- Phone: +44 7875 500935 (also on WhatsApp)
- Opening Time: Opens 9:00 AM (Monday to Saturday)
- Rating: 5.0 Google Stars (2 reviews)
- Genuine Review: "Amazing work by Alex and Nathan. Highly recommended!" by Vishal Bika
- Detailing Team: Alex and Nathan
- Approved Services:
  1. Exterior Detailing (contactless pre-wash, active foam cannon, iron decontamination, spotless finish)
  2. Interior Detailing (deep vacuum extraction, steam sanitisation, non-greasy OEM matte leather conditioning)
  3. Full Detail (complete inside-out turnaround for showroom presentation)
  4. Paint Enhancement (machine polishing, optical gloss depth, swirl mark and haze removal)
  5. Maintenance Detail (regular care for already detailed vehicles)

Policies & Process:
- Detailing times: Maintenance or focused sessions take a few hours; Full Detail or Paint Enhancement takes most of the day.
- Safety: Contactless foam pre-wash, two-bucket wash mitts, pH-neutral chemicals, and dedicated leather nourishment.
- Quotes: No upfront payment needed. Tailored quotes require vehicle make, model, registration plate, and condition.

CRITICAL RULES:
- Respond quickly, concisely, and cleanly. Keep answers under 3 short paragraphs.
- DO NOT invent prices, guarantees, ceramic brands, or unverified claims.
- Guide visitors wanting to book or get a quote to the on-page enquiry form or phone number (+44 7875 500935).`;

// Fast Multi-turn Streaming Chat Endpoint using gemini-3.1-flash-lite
app.post('/api/chat', async (req, res) => {
  const { messages, role = 'receptionist' } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Messages array is required' });
    return;
  }

  // Format history for Gemini
  // Use gemini-3.1-flash-lite for fastest speed
  const selectedModel = 'gemini-3.1-flash-lite';

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  if (!ai) {
    // If no API key configured, send helpful instant studio response
    const lastUserMsg = messages[messages.length - 1]?.content || '';
    const fallbackText = getStudioQuickAnswer(lastUserMsg);
    res.write(`data: ${JSON.stringify({ text: fallbackText })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
    return;
  }

  try {
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const responseStream = await ai.models.generateContentStream({
      model: selectedModel,
      contents: formattedContents,
      config: {
        systemInstruction: PURE_AI_SYSTEM_INSTRUCTION,
        temperature: 0.4, // Lower temperature for faster, deterministic concise output
        maxOutputTokens: 500, // Keeps generation fast and to the point
      }
    });

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: any) {
    console.error('Gemini chat error:', err?.message || err);
    // Provide graceful instant response on error
    const lastUserMsg = messages[messages.length - 1]?.content || '';
    const fallbackText = getStudioQuickAnswer(lastUserMsg);
    res.write(`data: ${JSON.stringify({ text: fallbackText })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

function getStudioQuickAnswer(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('price') || q.includes('cost') || q.includes('quote')) {
    return "Every vehicle is assessed individually based on vehicle size and surface condition. Please request a quote via our on-page form or call Alex and Nathan directly on 07875 500935 for prompt pricing.";
  }
  if (q.includes('where') || q.includes('location') || q.includes('address')) {
    return "Pure Detailing UK is located at Unit 16, Yard, 1 Pool's Ln, Chelmsford CM1 3QL, United Kingdom. We have dedicated private studio bays for drop-off and collection.";
  }
  if (q.includes('hour') || q.includes('time') || q.includes('open')) {
    return "We open at 9:00 AM Monday through Saturday. Drop-offs can be coordinated ahead of time so we dedicate full attention to your vehicle.";
  }
  if (q.includes('service') || q.includes('offer')) {
    return "We offer 5 core services: Exterior Detailing, Interior Detailing, Full Detail, Paint Enhancement, and Maintenance Detail. Let us know which area of your car you would like to refresh!";
  }
  return "Hello! I am Pure AI for Pure Detailing UK in Chelmsford. How can I help you today with your vehicle detailing, service advice, or quote request?";
}

// Dev & Production serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
