'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';
import { GithubIcon, ListMinus, TwitterIcon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { NavLink } from './NavLink';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { name: 'Docs', href: '/docs' },
  { name: 'Projects', href: '/projects' },
] as const;

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/pankajkumardev/ui-unify',
    icon: GithubIcon,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/pankajkumar_dev',
    icon: TwitterIcon,
  },
] as const;

export default function Navigation() {
  const session = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 py-4 w-full bg-white supports-[backdrop-filter]:bg-white dark:bg-[#121212] dark:supports-[backdrop-filter]:bg-[#121212]/90 sm:px-6 px-4 border-b border-gray-200 dark:border-gray-700">
      <div className="container flex h-12 items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ListMinus />
            <h1 className="text-xl text-blue-500 font-bold cursor-pointer">
              Feed
              <span className="text-slate-800 dark:text-[#E7E9EC]">-Wall</span>
            </h1>
          </Link>
          {session.data?.user ? (
            <nav className="hidden md:flex gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex md:flex-row md:gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="hidden md:block">
            {session.data?.user ? (
              <button
                onClick={() => signOut()}
                className="px-6 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-6 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            )}
          </div>
          <ThemeToggle />
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            ref={menuRef}
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#121212] shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col min-h-screen"
          >
            <div className="flex flex-col h-full p-4">
              <button
                className="self-end mb-4"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex flex-col items-center justify-center flex-grow gap-4">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </nav>
                <div className="flex flex-col gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={link.name}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className='text-sm'>{link.name}</span>
                    </a>
                  ))}
                </div>
                <div>
                  {session.data?.user ? (
                    <button
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        signIn();
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
