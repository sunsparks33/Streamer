import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Scroll Progress */}
      <div className="scroll-progress" />

      {/* Backdrop glass bar */}
      <div className="relative border-b border-white/[0.05] bg-[#0a0a0f]/80 backdrop-blur-2xl">
        {/* Subtle top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-700/60 to-transparent" />

        <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {/* Live indicator dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600" />
            </span>
            <span className="text-[17px] font-black tracking-tight text-white leading-none">
              1<span className="text-rose-500">_</span>bp
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] font-semibold text-white/25 border border-white/10 rounded px-1.5 py-0.5 tracking-widest uppercase">
              Stream Hub
            </span>
          </div>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            <a
              href="https://kick.com/reda-3x"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-[#53FC18] px-3.5 py-1.5 text-[11px] font-bold text-black tracking-wide uppercase hover:bg-[#6dff35] transition-all duration-200 shadow-[0_0_16px_rgba(83,252,24,0.3)]"
            >
              {/* Kick icon */}
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 2h4v8l6-8h5l-7 9 7 9h-5l-6-8v8H3z" />
              </svg>
              Kick
            </a>

            <a
              href="https://www.youtube.com/@reda-3x"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-[11px] font-bold text-white tracking-wide uppercase hover:bg-red-500 transition-all duration-200 shadow-[0_0_14px_rgba(239,68,68,0.3)]"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.3.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.7.8 1.7.7 2.2.8C6.6 18.9 12 19 12 19s4.8 0 7-.2c.4-.1 1.3-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.8 14.6V9.4l5.4 2.6-5.4 2.6z"/>
              </svg>
              YouTube
            </a>

            <a
              href="https://discord.gg/T2Xx6fS8J"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#5865F2] px-3.5 py-1.5 text-[11px] font-bold text-white tracking-wide uppercase hover:bg-[#6d78f5] transition-all duration-200 shadow-[0_0_14px_rgba(88,101,242,0.35)]"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.3 4.4A19.1 19.1 0 0 0 15.6 3c-.2.4-.4.9-.6 1.3a17.6 17.6 0 0 0-5.3 0A12.9 12.9 0 0 0 9.1 3 19.2 19.2 0 0 0 4.4 4.4 20 20 0 0 0 1 18.2a19.4 19.4 0 0 0 5.9 2.9 14.4 14.4 0 0 0 1.3-2 12.6 12.6 0 0 1-2-.9l.5-.4a13.7 13.7 0 0 0 11.7 0l.5.4a12.7 12.7 0 0 1-2 .9 14.2 14.2 0 0 0 1.3 2A19.3 19.3 0 0 0 23 18.2 19.9 19.9 0 0 0 20.3 4.4ZM8.5 15.4c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Zm7 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Z"/>
              </svg>
              Discord
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
