'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, List, MessageSquare, User } from 'lucide-react';
import { ModeToggle } from './toggle-mode';
import { useLocalStorage } from 'usehooks-ts';

export function Navigation() {
    const pathname = usePathname();
    const [leetcodeUsername] = useLocalStorage('leetcodeUsername', '');

    const links = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/profile', label: 'Profile', icon: User },
        { href: '/problems', label: 'Problems', icon: List },
        { href: '/discussions', label: 'Discussions', icon: MessageSquare },
    ];

    return (
        <nav className="border-b">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center space-x-4 justify-between">
                    <div className="flex-1 space-x-4">
                        {links.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'inline-flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary',
                                    pathname === href
                                        ? 'text-primary'
                                        : 'text-muted-foreground',
                                    href === '/profile' && !leetcodeUsername && 'hidden'
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}