import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      {/* Scroll Progress Bar Animation */}
      <div className="scroll-progress" />
      
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-xl font-black tracking-wider text-zinc-50 hover:opacity-90 transition-opacity cursor-pointer">
            1_bp
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="https://kick.com/reda-3x"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-zinc-950 transition duration-300"
          >
            Kick
          </a>

          <a
            href="https://www.youtube.com/@reda-3x"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-50 transition duration-200"
            target="_blank"
            
          >
            YouTube
          </a>
          <a
            href="https://discord.gg/T2Xx6fS8J"
            className="text-xs font-medium text-zinc-400 hover:text-zinc-50 transition duration-200"
            target="_blank"
          
          >
            Discord
          </a>
        </nav>
      </div>
    </header>
  );
}
