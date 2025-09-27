import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import prisma from '@/lib/db';
import { compare, hash } from 'bcryptjs';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = credentialsSchema.safeParse(credentials);
          if (!parsedCredentials.success) {
            return null;
          }

          const { email, password } = parsedCredentials.data;

          // Check if user exists
          let user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            // Sign-up: create new user
            const hashedPassword = await hash(password, 10);
            user = await prisma.user.create({
              data: {
                email,
                password: hashedPassword,
              },
            });
          } else {
            // Sign-in: verify password
            const isValidPassword = await compare(password, user.password);
            if (!isValidPassword) {
              return null;
            }
          }

          return {
            id: user.id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
      async profile(profile) {
        try {
          const email = profile.email;
          let user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            user = await prisma.user.create({
              data: {
                email,
                password: '',
              },
            });
          }

          return {
            id: user.id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error('Google auth error:', error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        token.userid = user.id;
      }
      return token;
    },
    session: ({ token, session }: any) => {
      if (session && session.user) {
        session.user.id = token.userid;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
