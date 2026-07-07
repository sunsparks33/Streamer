import React from "react";

export default function KickPlayer({ isLive = false }) {
  if (!isLive) {
    return (
      <div className="w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
        <div className="aspect-video w-full relative flex flex-col items-center justify-center bg-zinc-950 p-6 overflow-hidden">
          {/* Glowing background highlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

          {/* Animated Offline Icon */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-md">
            <div className="mb-4 h-16 w-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-xl">
              <svg className="h-8 w-8 animate-pulse text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5l-15-15" />
              </svg>
            </div>
            
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-3">
              Stream Offline
            </span>
            
            <h3 className="text-xl font-extrabold text-zinc-100 uppercase tracking-tight sm:text-2xl">
              1_bp is currently offline
            </h3>
            
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Check out the live chat on the right to interact with the community or join the Discord server to know when the next stream starts!
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://kick.com/reda-3x"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-red-600 text-zinc-950 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                Visit Kick Profile
              </a>
              <a
                href="https://discord.gg/T2Xx6fS8J"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
      <div className="aspect-video w-full">
        <iframe
          src="https://player.kick.com/reda-3x"
          className="h-full w-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}
