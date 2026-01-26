import React from 'react';

export default function AKLogo() {
    return (
        <div className="group flex items-center bg-zinc-100/50 hover:bg-white/80 backdrop-blur-sm rounded-full p-1 pr-4 transition-all duration-500 ease-out cursor-pointer overflow-hidden shadow-sm hover:shadow-md">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-zinc-200 to-white flex items-center justify-center border border-zinc-200 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <span className="font-serif font-bold text-sm text-zinc-700">AK</span>
            </div>
            <div className="ml-3 flex flex-col justify-center overflow-hidden">
                <span className="text-xs sm:text-sm font-medium text-zinc-800 tracking-widest opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[150px] transition-all duration-700 ease-in-out whitespace-nowrap">
                    AASTHA KUMARI
                </span>
            </div>
        </div>
    );
}
