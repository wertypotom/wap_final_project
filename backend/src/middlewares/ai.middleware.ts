import { Request, Response, NextFunction } from 'express';
import OpenAI from 'openai';
import { catchAsync } from '../utils/catchAsync';
import { config } from '../config/config';

const openai = new OpenAI({
  apiKey: config.openAiKey,
  // baseURL: config.openAiBaseUrl,
});

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
    console.log('Sending prompt to OpenAI:', config.openAiKey);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    // const response = await openai.chat.completions.create({
    //   model: 'deepseek-chat',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: 'You are an AI assistant.',
    //     },
    //     {
    //       role: 'user',
    //       content: 'Tell me a fun fact about space!',
    //     },
    //   ],
    //   temperature: 0.7,
    //   max_tokens: 150,
    // });

    console.log('AI moderation response:', response);
    const content = response.choices[0].message.content;
    // const content = response.choices[0].message.content;

    // if (!content) throw new Error('No response from OpenAI');

    const result = JSON.parse(content as string);
    return {
      isSpam: !!result.isSpam,
      sentiment: result.sentiment || 'Neutral',
      adjustedRating: Math.min(Math.max(parseInt(result.adjustedRating), 1), 5),
    };
  } catch (err) {
    console.error('Error in AI moderation:', err);
    throw new Error(`Failed to parse AI response`);
  }
}

export const aiModeration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Hitting AI moderation middleware');
    const { comment, rating } = req.body;
    const analysis = await analyzeReviewContent(comment);
    req.body.isSpam = analysis.isSpam;
    req.body.sentiment = analysis.sentiment;
    req.body.rating = analysis.adjustedRating ?? rating;
    next();
  },
);
