import { Request, Response, NextFunction } from 'express';
import OpenAI from 'openai';
import { catchAsync } from '../utils/catchAsync';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeReviewContent(
  text: string,
): Promise<{ isSpam: boolean; sentiment: string; adjustedRating: number }> {
  const prompt = `Analyze the following review and respond in JSON with three fields: 
  - isSpam: true or false
  - sentiment: Positive, Neutral, or Negative
  - adjustedRating: a number between 1 and 5 that represents how the tone of the comment matches the given rating (can be the same or slightly adjusted)

  Review:
  """
  ${text}
  """`;
  try {
    const response = await openai.responses.create({
      model: 'gpt-4o',
      input: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = response.output_text;

    if (!content) throw new Error('No response from OpenAI');

    const result = JSON.parse(content);
    return {
      isSpam: !!result.isSpam,
      sentiment: result.sentiment || 'Neutral',
      adjustedRating: Math.min(Math.max(parseInt(result.adjustedRating), 1), 5),
    };
  } catch (err) {
    throw new Error(`Failed to parse AI response`);
  }
}

export const aiModeration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { comment, rating } = req.body;
    const analysis = await analyzeReviewContent(comment);
    req.body.isSpam = analysis.isSpam;
    req.body.sentiment = analysis.sentiment;
    req.body.rating = analysis.adjustedRating ?? rating;
    next();
  },
);
