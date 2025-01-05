import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string(),
  email: z.string(),
  feedback: z.string(),
  rating: z.number().int().min(1).max(5),
  projectid: z.number(),
});

export default async function POST(req: NextRequest) {
  try {
    const feedback = await req.json();
    const parsedFeedback = feedbackSchema.safeParse(feedback);
    if (!parsedFeedback.success) {
      return NextResponse.json({ error: 'Invalid feedback' }, { status: 400 });
    }
    const submittedFeedback = await prisma.feedback.create({
      data: {
        name: parsedFeedback.data.name,
        email: parsedFeedback.data.email,
        feedback: parsedFeedback.data.feedback,
        rating: parsedFeedback.data.rating,
        projectid: parsedFeedback.data.projectid,
      },
    });
    return NextResponse.json(
      {
        message: 'Feedback submitted successfully',
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
