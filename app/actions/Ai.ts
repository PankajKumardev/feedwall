'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const googleApiKey = process.env.GOOGLE_API_KEY;
if (!googleApiKey) {
  throw new Error('GOOGLE_API_KEY is not defined');
}

const genAI = new GoogleGenerativeAI(googleApiKey);

interface Feedback {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  feedback: string;
  rating: number;
  projectid: number;
}

export const AISummary = async (
  feedbacks: Feedback[] | null
): Promise<string | void> => {
  if (!feedbacks || feedbacks.length === 0) {
    throw new Error('No feedbacks provided');
  }

  const prompt =
    'Create a summary of feedbacks with pros and cons in points. Here are the feedbacks: ' +
    feedbacks.map((feedback) => feedback.feedback).join(' ');

  console.log(feedbacks);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });
  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text
      ? await result.response.text()
      : JSON.stringify(result.response);

    if (!responseText) {
      throw new Error('No response text generated');
    }
    return responseText;
  } catch (err) {
    console.error(err);
  }
};
