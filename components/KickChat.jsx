import React from "react";

export default function KickChat() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111118] shadow-2xl shadow-black/40">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <svg className="h-3.5 w-3.5 text-white/30 fill-current" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Live Chat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-600" />
          </span>
          <span className="text-[10px] font-semibold text-rose-500/70">Kick.com</span>
        </div>
      </div>

      {/* Chat iframe */}
      <div className="h-[480px] lg:h-[calc(100vh-148px)]">
        <iframe
          src="https://kick.com/embed/chat/reda-3x"
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
          allow="autoplay"
        />
      </div>
    </div>
  );
}
