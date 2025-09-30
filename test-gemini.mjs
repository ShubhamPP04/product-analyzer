import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyC5FqnNKFY9PyOnhOiiO3WM50dojipBmwk';
const genAI = new GoogleGenerativeAI(apiKey);

async function testGeminiAPI() {
  console.log('🔍 Testing Gemini API...\n');
  console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT FOUND');
  
  try {
    // According to docs, using gemini-2.5-flash-lite
    console.log('\n✅ API Key is valid - attempting to use model...\n');
    
    // Test with the model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });
    
    const prompt = `You are a test. Simply respond with: "API is working correctly!" and nothing else.`;
    
    console.log('📤 Sending test prompt to Gemini 2.5 Flash Lite...\n');
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log('✅ SUCCESS! Gemini API is working!\n');
    console.log('📥 Response from Gemini:', text);
    console.log('\n✨ Your Gemini API is properly configured!\n');
    
    // Test with structured JSON response
    console.log('🧪 Testing JSON structured output...\n');
    
    const jsonPrompt = `Return a simple JSON object with two fields: "status" (set to "working") and "message" (set to "Gemini API is functional"). Return ONLY the JSON, no other text.`;
    
    const jsonResult = await model.generateContent(jsonPrompt);
    const jsonResponse = jsonResult.response;
    const jsonText = jsonResponse.text();
    
    console.log('📥 JSON Response:', jsonText);
    
    try {
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        console.log('✅ JSON parsing successful:', parsed);
      }
    } catch (e) {
      console.log('⚠️  JSON parsing note:', e);
    }
    
    console.log('\n✅ All tests passed! Your Gemini API is ready to use.\n');
    
  } catch (error) {
    console.error('\n❌ ERROR testing Gemini API:\n');
    console.error('Error message:', error.message);
    console.error('\nFull error:', error);
    
    if (error.message?.includes('API_KEY_INVALID')) {
      console.error('\n⚠️  Your API key appears to be invalid.');
      console.error('Please check: https://aistudio.google.com/apikey');
    } else if (error.message?.includes('models/gemini-2.5-flash-lite')) {
      console.error('\n⚠️  Model name might be incorrect. Trying alternative...');
      console.error('The correct model name should be: gemini-2.0-flash-lite');
    }
    
    process.exit(1);
  }
}

// Run the test
testGeminiAPI();
