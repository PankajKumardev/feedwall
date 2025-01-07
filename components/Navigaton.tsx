'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';
import { GithubIcon, ListMinus, TwitterIcon } from 'lucide-react';
import Link from 'next/link';
import { NavLink } from './NavLink';

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
  return (
    <div className="sticky top-0 z-50 py-2 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 px-4">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <ListMinus />
            <h1 className="text-xl text-sky-500 font-bold cursor-pointer">
              Feed
              <span className="text-slate-800 dark:text-[#E7E9EC]">-Wall</span>
            </h1>
          </Link>
          <nav className="hidden md:flex gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </nav>
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
          {session.data?.user ? (
            <button
              onClick={() => signOut()}
              className="px-6 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-6 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
            >
              Login
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
