'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      prefetch={true}
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-md text-sm font-medium transition-colors',
        isActive
          ? 'bg-secondary text-blue-500'
          : 'text-muted-foreground hover:text-gray-400'
      )}
    >
      {children}
    </Link>
  );
}
