'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, ArrowRight } from 'lucide-react';
import AKLogo from './AKLogo';
import SocialIcons from './SocialIcons';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-md transition-all duration-300">
            {/* Left Section */}
            <div className="flex items-center gap-6">
                <AKLogo />
                <div className="h-6 w-px bg-white/20 mx-2" /> {/* Divider */}
                <SocialIcons />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-8">
                <Link
                    href="/auth/login"
                    className="flex items-center gap-2 text-lg font-serif font-bold text-orange-100 hover:text-white transition-colors drop-shadow-sm hover:scale-105 duration-300"
                >
                    <LogIn size={24} strokeWidth={2.5} />
                    <span>Login</span>
                </Link>
                <Link
                    href="/auth/register"
                    className="group flex items-center gap-2 px-6 py-3 rounded-full border-2 border-orange-200/50 bg-white/10 hover:bg-white/20 text-lg font-serif font-bold text-orange-100 shadow-md hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-md"
                >
                    <span>Get Started</span>
                    <ArrowRight size={22} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </nav>
    );
}
