import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyC5FqnNKFY9PyOnhOiiO3WM50dojipBmwk';
const genAI = new GoogleGenerativeAI(apiKey);

const modelsToTry = [
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash-lite', 
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-pro'
];

console.log('🔍 Testing available Gemini models...\n');

for (const modelName of modelsToTry) {
  try {
    console.log(`Testing: ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
  const result = await model.generateContent('Hi');
  const preview = typeof result?.response?.text === 'function' ? result.response.text() : null;
  console.log(`✅ ${modelName} - WORKS!${preview ? ` Preview: ${preview.slice(0, 40)}...` : ''}\n`);
  } catch (error) {
    console.log(`❌ ${modelName} - Error: ${error.message}\n`);
  }
}
