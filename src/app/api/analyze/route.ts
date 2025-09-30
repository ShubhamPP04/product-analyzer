import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { image, age } = await request.json();

    if (!image || !age) {
      return NextResponse.json(
        { error: 'Image and age are required' },
        { status: 400 }
      );
    }

    console.log('Analyzing product image with Gemini AI...');
    
    // Use Gemini's native vision capabilities to extract text and analyze
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // Remove the data URL prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, '');

    const prompt = `You are an empathetic Indian mother who also happens to be a certified nutrition expert. You're reviewing a food product that your child, aged ${age}, wants to try.

Analyze the product ingredients shown in this image for a person aged ${age} years. Speak in warm, everyday language just like a caring Indian mom guiding her child.

First, extract and list all the ingredients you can see in the image.
Then, provide your guidance in the following strict JSON format (no additional narration outside JSON):

{
  "overallHealth": "2-3 sentence summary in a caring motherly tone",
  "healthScore": <number between 0-100>,
  "ageAppropriate": <true/false>,
  "ingredients": "List the main ingredients identified from the image",
  "pros": ["positive aspect 1", "positive aspect 2", ...],
  "cons": ["concern 1", "concern 2", ...],
  "recommendations": ["motherly recommendation 1", "motherly recommendation 2", ...],
  "momAdvice": "A heartfelt paragraph (3-4 sentences) speaking directly to the child, explaining in simple language whether they should have it, how much, and any conditions",
  "momVerdict": "take_it" | "avoid_it" | "think_twice"
}

While deciding the momVerdict, consider:
- Age-appropriateness for ${age} years old
- Common Indian dietary concerns (e.g., sugar, salt, artificial additives)
- Nutritional value and portion control
- Potential allergens or irritants
- Preservatives and additives
- Suitability for Indian climate and lifestyle
- Any health warnings for this age group

Tone guidelines:
- Sound affectionate, protective, and gently persuasive like a real mom.
- Use simple phrases like “beta” or “dear” sparingly (max once) to keep it natural.
- Give clear go/no-go guidance in momAdvice and ensure momVerdict aligns with it.

Return ONLY valid JSON, no additional text.`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Image
        }
      },
      { text: prompt }
    ]);
    
    const response = result.response;
    const text = response.text();
    
    console.log('Gemini AI response received');
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }
    
    const analysis = JSON.parse(jsonMatch[0]);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing product:', error);
    return NextResponse.json(
      { error: 'Failed to analyze product. Please try again.' },
      { status: 500 }
    );
  }
}
