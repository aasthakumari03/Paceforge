'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, ArrowRight } from 'lucide-react';
import AKLogo from './AKLogo';
import SocialIcons from './SocialIcons';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/30 backdrop-blur-md shadow-sm">
            {/* Left Section */}
            <div className="flex items-center gap-6">
                <AKLogo />
                <div className="h-6 w-px bg-zinc-200/50 mx-2" /> {/* Divider */}
                <SocialIcons />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
                <Link
                    href="/auth/login"
                    className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                    <LogIn size={20} />
                    <span className="text-base">Login</span>
                </Link>
                <Link
                    href="/auth/register"
                    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200/50 bg-white/50 hover:bg-white text-sm font-medium text-zinc-800 shadow-sm hover:shadow-md transition-all duration-300"
                >
                    <span className="text-base">Get Started</span>
                    <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </div>
        </nav>
    );
}
