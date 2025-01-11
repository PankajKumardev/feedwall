'use client';

import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Mail, Lock, Info } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function SignInSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;
  React.useEffect(() => {
    if (user) {
      router.push('/projects');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      toast.success("You've successfully logged in to your Feed-Wall account.");
      router.push('/projects');
    }
  };

  return (
    <div className=" flex items-center justify-center m-4 mt-16">
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl dark:shadow-gray-800 p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome to{' '}
            <span className="text-blue-600 font-bold">Feed-Wall</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Login or create your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-gray-700 dark:text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Info className="w-4 h-4" />
            <p>Demo : Email: demo@example.com, Password: 123456</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex rounded-md h-10 items-center justify-center text-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              'Processing...'
            ) : (
              <div className="flex items-center">
                Continue
                <ArrowRight className="ml-2 h-4 w-5" />
              </div>
            )}
          </button>
        </form>
        <div className="mt-6">
          <button
            onClick={() => signIn('google')}
            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 flex rounded-md h-10 items-center justify-center text-sm"
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>
        </div>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          By continuing, you agree to Feed-Wall's Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}
