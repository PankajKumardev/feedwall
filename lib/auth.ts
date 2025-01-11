import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

const prisma = new PrismaClient();

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
        const parsedCredentials = credentialsSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error('Invalid credentials');
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
            throw new Error('Invalid password');
          }
        }

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
      async profile(profile) {
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
