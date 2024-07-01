'use client';
import { useState } from 'react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { Icons } from './icons';
import { ToggleRightIcon } from 'lucide-react';
import { NavItem } from '@sangpencerah/types/nav';
import { siteConfig } from '@sangpencerah/config/site';
import { cn } from '@sangpencerah/lib/utils';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white">
            <div className="container flex h-16 items-center justify-between space-x-4">
                <Link href="/" className="flex items-center space-x-2">
                    <Icons.logo className="h-6 w-6" />
                    <span className="inline-block font-bold">
                        {siteConfig.name}
                    </span>
                </Link>
                <nav className="hidden md:flex gap-6">
                    {siteConfig.mainNav?.map(
                        (item, index) =>
                            item.href && (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        'text-sm font-medium text-muted-foreground',
                                        item.disabled &&
                                            'cursor-not-allowed opacity-80',
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ),
                    )}
                </nav>
               
                <button
                    className="md:hidden flex items-center"
                    onClick={toggleMenu}
                >
                    <ToggleRightIcon className="h-6 w-6" />
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white border-t border-b">
                    <nav className="flex flex-col space-y-4 p-4">
                        {siteConfig.mainNav?.map(
                            (item, index) =>
                                item.href && (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={cn(
                                            'text-sm font-medium text-muted-foreground',
                                            item.disabled &&
                                                'cursor-not-allowed opacity-80',
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ),
                        )}

                       
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
