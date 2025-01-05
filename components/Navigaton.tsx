'use client';
import { useSession } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';

export default function Navigaton() {
  const session = useSession();
  if (session.data?.user) {
    return (
      <div>
        <div>
          <div>
            <h1 className="text-xl text-rose-500">
              Feed<span className="text-slate-300">-Wall</span>
            </h1>
            <p>
              <a href="/profile" className="text-slate-300 hover:text-rose-500">
                Profile
              </a>
            </p>
          </div>
          <div>
            <button className="bg-slate-300 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded ">
              Login
            </button>
            <button className=" text-white font-bold py-2 px-4 rounded dark:bg-rose-500 dark:hover:bg-rose-600"> 
              Sign Up
            </button>
          </div>
          <div>
           <ThemeToggle/>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>t</div>
      </div>
    );
  }
}
