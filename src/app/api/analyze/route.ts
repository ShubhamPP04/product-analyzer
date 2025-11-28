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

    const prompt = `You are a professional nutritionist and food scientist. You are reviewing a food product for a person aged ${age}.

Analyze the product ingredients shown in this image. Provide concise, objective, and scientific guidance.

First, extract and list all the ingredients you can see in the image.
Then, provide your analysis in the following strict JSON format (no additional narration outside JSON):

{
  "overallHealth": "2-3 sentence objective summary of the product's health profile",
  "healthScore": <number between 0-100>,
  "ageAppropriate": <true/false>,
  "ingredients": "List the main ingredients identified from the image",
  "pros": ["nutritional benefit 1", "nutritional benefit 2", ...],
  "cons": ["health concern 1", "health concern 2", ...],
  "recommendations": ["scientific recommendation 1", "scientific recommendation 2", ...],
  "momAdvice": "A concise, professional verdict (3-4 sentences) explaining whether this product is suitable, citing specific ingredients or nutritional values.",
  "momVerdict": "take_it" | "avoid_it" | "think_twice"
}

While deciding the momVerdict (Expert Verdict), consider:
- Age-appropriateness for ${age} years old
- Nutritional density and ingredient quality
- Presence of additives, preservatives, or allergens
- Sugar, salt, and fat content relative to daily recommended limits
- Suitability for a balanced diet

Tone guidelines:
- Be professional, objective, and concise.
- Avoid emotional or colloquial language.
- Focus on facts and nutritional science.
- Ensure the verdict aligns strictly with the nutritional analysis.

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
