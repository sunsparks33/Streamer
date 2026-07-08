"use client";

import React from "react";

export default function StreamMusic() {
  return (
    <div className="glass rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#111118]/80 to-[#0a0a0f]/80 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="h-5 w-1 rounded-full bg-rose-600" />
          <h2 className="text-sm font-bold text-white tracking-tight uppercase">Favorite Stream Beats</h2>
        </div>
        
        {/* Animated Visualizer Equalizer */}
        <div className="flex items-end gap-[3px] h-3.5 px-2">
          <div className="w-[2px] bg-rose-500 rounded-full animate-[equalizer_0.8s_infinite_ease-in-out_alternate]" style={{ animationDelay: "0.1s" }} />
          <div className="w-[2px] bg-rose-500 rounded-full animate-[equalizer_1.1s_infinite_ease-in-out_alternate]" style={{ animationDelay: "0.4s" }} />
          <div className="w-[2px] bg-rose-500 rounded-full animate-[equalizer_0.9s_infinite_ease-in-out_alternate]" style={{ animationDelay: "0.2s" }} />
          <div className="w-[2px] bg-rose-500 rounded-full animate-[equalizer_1.2s_infinite_ease-in-out_alternate]" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* Vinyl Art Plate */}
        <div className="relative group flex-shrink-0 h-24 w-24 rounded-full bg-black/60 border border-white/10 flex items-center justify-center shadow-lg overflow-hidden">
          {/* Vinyl Grooves */}
          <div className="absolute inset-1 rounded-full border border-white/5 opacity-40" />
          <div className="absolute inset-3 rounded-full border border-white/5 opacity-40" />
          <div className="absolute inset-5 rounded-full border border-white/5 opacity-40 animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite]" style={{
            backgroundImage: "radial-gradient(circle, transparent 40%, rgba(255,255,255,0.03) 41%)"
          }} />
          
          {/* Center Logo */}
          <div className="relative z-10 h-7 w-7 rounded-full bg-rose-600 border border-black flex items-center justify-center text-[10px] font-black text-white shadow-inner animate-[spin_8s_linear_infinite]">
            1_bp
          </div>
        </div>

        {/* Info & Subtitle */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <h3 className="text-xs font-bold text-white/80">Lofi & Synthwave Gaming Mix</h3>
          <p className="text-[10px] text-white/30 font-medium">Curated tracklist for coding, grinding, and chilling.</p>
          <div className="pt-1.5">
            <a
              href="https://open.spotify.com/playlist/0BDWp1v8muzEwMvMlkiMYO?si=970d615a05a7403b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/25 px-2.5 py-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all duration-200"
            >
              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.98-.336.075-.668-.135-.744-.47-.077-.337.135-.67.472-.745 3.853-.88 7.14-.502 9.818 1.135.295.18.387.563.207.858zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.673-1.114 8.243-.574 11.347 1.33.367.226.487.707.26 1.073zm.107-2.836C14.512 8.87 9.043 8.688 5.86 9.654c-.5.15-1.025-.133-1.176-.63-.15-.497.132-1.025.63-1.176 3.658-1.11 9.68-.897 13.56 1.408.45.267.6.846.333 1.296-.267.45-.847.6-1.297.333z" />
              </svg>
              Open Playlist
            </a>
          </div>
        </div>
      </div>

      {/* Playlist Embed Iframe */}
      <div className="relative w-full h-[152px] rounded-xl overflow-hidden bg-black/40 border border-white/[0.04]">
        <iframe
          src="https://open.spotify.com/embed/playlist/0BDWp1v8muzEwMvMlkiMYO?utm_source=generator&si=970d615a05a7403b"
          width="100%"
          height="152"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
