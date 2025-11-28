import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { image, text, age, dietaryPreferences } = await request.json();

    if ((!image && !text) || !age) {
      return NextResponse.json(
        { error: 'Image or text, and age are required' },
        { status: 400 }
      );
    }

    console.log('Analyzing product with Gemini AI...');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    const dietaryContext = dietaryPreferences && dietaryPreferences.length > 0
      ? `The user has the following dietary preferences/restrictions: ${dietaryPreferences.join(', ')}. STRICTLY check the ingredients for any violations.`
      : 'No specific dietary restrictions provided.';

    let prompt = '';
    let contentParts: { text?: string; inlineData?: { mimeType: string; data: string } }[] = [];

    if (image) {
      // Remove the data URL prefix if present
      const base64Image = image.replace(/^data:image\/\w+;base64,/, '');

      prompt = `You are a professional nutritionist and food scientist. You are reviewing a food product for a person aged ${age}.
${dietaryContext}

Analyze the product ingredients shown in this image. Provide concise, objective, and scientific guidance.

First, extract and list all the ingredients you can see in the image.
Then, provide your analysis in the following strict JSON format (no additional narration outside JSON):`;

      contentParts = [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image
          }
        },
        { text: prompt }
      ];
    } else if (text) {
      prompt = `You are a professional nutritionist and food scientist. You are reviewing a food product for a person aged ${age}.
${dietaryContext}

Analyze the following product ingredients list:
"${text}"

Provide concise, objective, and scientific guidance.
Provide your analysis in the following strict JSON format (no additional narration outside JSON):`;

      contentParts = [{ text: prompt }];
    }

    // Append the JSON schema and guidelines to the prompt (for text mode) or just rely on the subsequent text part
    const jsonSchemaAndGuidelines = `
{
  "overallHealth": "2-3 sentence objective summary of the product's health profile",
  "healthScore": <number between 0-100>,
  "ageAppropriate": <true/false>,
  "ingredients": [
    {
      "name": "Ingredient Name",
      "description": "Brief explanation of what this is",
      "healthImpact": "positive" | "neutral" | "negative"
    }
  ],
  "pros": ["nutritional benefit 1", "nutritional benefit 2", ...],
  "cons": ["health concern 1", "health concern 2", ...],
  "dietaryWarnings": ["warning 1 (e.g., 'Contains Egg - Not Vegetarian')", "warning 2"],
  "recommendations": ["scientific recommendation 1", "scientific recommendation 2", ...],
  "momAdvice": "A concise, professional verdict (3-4 sentences) explaining whether this product is suitable, citing specific ingredients or nutritional values.",
  "momVerdict": "take_it" | "avoid_it" | "think_twice"
}

While deciding the momVerdict (Expert Verdict), consider:
- Age-appropriateness for ${age} years old
- **Dietary Violations**: If the product violates any of the user's dietary preferences (e.g., contains egg for a vegetarian), the verdict MUST be 'avoid_it' or 'think_twice' and clearly stated in dietaryWarnings.
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

    if (text) {
      contentParts[0].text += jsonSchemaAndGuidelines;
    } else {
      contentParts[1].text += jsonSchemaAndGuidelines;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await model.generateContent(contentParts as any);

    const response = result.response;
    const responseText = response.text();

    console.log('Gemini AI response received');

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
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
