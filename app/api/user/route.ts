import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { NEXT_AUTH } from '@/lib/auth';

export const GET = async () => {
  try {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
      return NextResponse.json(
        { message: 'You are not logged in' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: session.user });
  } catch (error: any) {
    console.error('User API error:', error);
    return NextResponse.json(
      { error: 'Failed to get user data' },
      { status: 500 }
    );
  }
};
