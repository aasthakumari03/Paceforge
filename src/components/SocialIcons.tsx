import React from 'react';
import { Github, Linkedin, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function SocialIcons() {
    const icons = [
        {
            Icon: Briefcase,
            href: '#portfolio',
            label: "Aastha's Portfolio",
            color: 'text-amber-700 hover:text-amber-900'
        },
        {
            Icon: Github,
            href: 'https://github.com/aasthakumari03?tab=overview&from=2026-01-01&to=2026-01-26',
            label: 'Github',
            color: 'text-gray-900 hover:text-black'
        },
        {
            Icon: Linkedin,
            href: 'https://www.linkedin.com/in/aastha-kumari-2116a837a',
            label: 'Linked in',
            color: 'text-[#0077b5] hover:text-[#005885]'
        },
    ];

    return (
        <div className="flex items-center gap-2">
            {icons.map(({ Icon, href, label, color }) => (
                <Link
                    key={label}
                    href={href}
                    title={label}
                    className={`p-2 transition-all duration-300 hover:scale-110 hover:bg-white/50 rounded-full ${color}`}
                    aria-label={label}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                    <Icon size={26} strokeWidth={1.5} />
                </Link>
            ))}
        </div>
    );
}
