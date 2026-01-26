import React from 'react';
import { Github, Linkedin, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function SocialIcons() {
    const icons = [
        { Icon: Briefcase, href: '#portfolio', label: 'Portfolio', color: 'text-amber-700 hover:text-amber-900' },
        { Icon: Github, href: '#github', label: 'GitHub', color: 'text-gray-900 hover:text-black' },
        { Icon: Linkedin, href: '#linkedin', label: 'LinkedIn', color: 'text-[#0077b5] hover:text-[#005885]' },
    ];

    return (
        <div className="flex items-center gap-2">
            {icons.map(({ Icon, href, label, color }) => (
                <Link
                    key={label}
                    href={href}
                    className={`p-2 transition-all duration-300 hover:scale-110 hover:bg-white/50 rounded-full ${color}`}
                    aria-label={label}
                >
                    <Icon size={22} strokeWidth={1.5} />
                </Link>
            ))}
        </div>
    );
}
