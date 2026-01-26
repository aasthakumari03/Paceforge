import React from 'react';
import { Github, Linkedin, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function SocialIcons() {
    const icons = [
        { Icon: Briefcase, href: '#portfolio', label: 'Portfolio' },
        { Icon: Github, href: '#github', label: 'GitHub' },
        { Icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
    ];

    return (
        <div className="flex items-center gap-2">
            {icons.map(({ Icon, href, label }) => (
                <Link
                    key={label}
                    href={href}
                    className="p-2 text-zinc-500 hover:text-zinc-900 transition-all duration-300 hover:scale-110 hover:bg-white/50 rounded-full"
                    aria-label={label}
                >
                    <Icon size={22} strokeWidth={1.5} />
                </Link>
            ))}
        </div>
    );
}
