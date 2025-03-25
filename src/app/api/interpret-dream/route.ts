import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
	try {
		const { dream } = await request.json();

		if (!dream) {
			return NextResponse.json(
				{ error: 'Dream description is required' },
				{ status: 400 }
			);
		}

		// Check if the input appears to be about a dream
		const dreamIndicators = ['dream', 'dreamt', 'dreamed', 'nightmare', 'sleep', 'mơ', 'giấc mơ', 'nằm mơ'];
		const isDreamRelated = dreamIndicators.some(indicator =>
			dream.toLowerCase().includes(indicator.toLowerCase())
		);

		if (!isDreamRelated) {
			return NextResponse.json(
				{ error: 'Please share a dream. Your input should describe a dream you had.' },
				{ status: 400 }
			);
		}

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content: `You are a mystical dream interpreter who gives fun, spiritual explanations of dreams and suggests lucky numbers (between 00 and 99) based on them.

IMPORTANT: You should ONLY respond to inputs that describe actual dreams. If the input is not about a dream (e.g., general statements, questions, or stories that aren't dreams), respond with "I can only interpret dreams. Please share a dream you had."

For valid dreams, respond with:
1. A short 2-3 sentence interpretation in a mystical or humorous tone.
2. 1 to 3 lucky numbers with a short reason for each.`,
				},
				{
					role: 'user',
					content: dream,
				},
			],
			temperature: 0.8,
			max_tokens: 200,
		});

		const response = completion.choices[0]?.message?.content || 'No interpretation available';

		return NextResponse.json({ interpretation: response });
	} catch (error) {
		console.error('Dream interpretation error:', error);
		return NextResponse.json(
			{ error: 'Failed to interpret dream' },
			{ status: 500 }
		);
	}
}
