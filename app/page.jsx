"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import KickPlayer from "@/components/KickPlayer";
import KickChat from "@/components/KickChat";

function formatDuration(ms) {
  if (!ms) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function formatRelativeDate(dateStr) {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr.replace(' ', 'T') + 'Z');
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffDays > 0) {
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
      }
      return date.toLocaleDateString();
    } else if (diffHours > 0) {
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    }
    return "Just now";
  } catch (err) {
    return dateStr;
  }
}

export default function Home() {
  const [isLive, setIsLive] = useState(false);
  const [lastStreams, setLastStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVOD, setActiveVOD] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch channel status (is live?)
      try {
        const res = await fetch("https://kick.com/api/v2/channels/reda-3x");
        if (res.ok) {
          const data = await res.json();
          setIsLive(data.livestream !== null);
        }
      } catch (err) {
        console.error("Error checking stream status:", err);
      }

      // 2. Fetch recent VODs
      try {
        const res = await fetch("https://kick.com/api/v2/channels/reda-3x/videos");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setLastStreams(data.slice(0, 3));
          }
        }
      } catch (err) {
        console.error("Error fetching VODs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    const handleKeyDown = (e) => {
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.keyCode === 73)) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j" || e.keyCode === 74)) {
        e.preventDefault();
        return false;
      }
      if (e.ctrlKey && (e.key === "U" || e.key === "u" || e.keyCode === 85)) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-start">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left Column: Player & About Info (75% on Desktop) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Live Indicator + Title Card */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
              <div className="flex items-center gap-3">
                {/* Blinking Live Badge */}
                {loading ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 text-xs font-black uppercase tracking-wider animate-pulse">
                    CHECKING...
                  </span>
                ) : isLive ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 text-xs font-black uppercase tracking-wider border border-red-500/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    LIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-wider border border-zinc-700">
                    OFFLINE
                  </span>
                )}
                <div>
                  <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-100">
                    {"1_bp's Broadcast Room"}
                  </h1>
                  <p className="text-xs text-zinc-400">Streaming live on Kick.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Status:</span>
                {loading ? (
                  <span className="text-xs font-semibold text-zinc-500 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-850 animate-pulse">
                    ...
                  </span>
                ) : isLive ? (
                  <span className="text-xs font-semibold text-red-400 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                    Online
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-zinc-500 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">
                    Offline
                  </span>
                )}
              </div>
            </div>

            {/* Stream Player */}
            {loading ? (
              <div className="w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
                <div className="aspect-video w-full bg-zinc-950 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-red-500/30 border-t-red-500 animate-spin" />
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Loading player...</span>
                  </div>
                </div>
              </div>
            ) : (
              <KickPlayer isLive={isLive} activeVOD={activeVOD} onCloseVOD={() => setActiveVOD(null)} />
            )}

            {/* Stream Description Info */}
            <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
              <h2 className="text-base font-semibold text-zinc-100">About 1_bp</h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Welcome! Dive into top-tier gameplay, live developer sessions, or casual hangout streams. Make sure to check out the chat on the right and drop a follow!
              </p>
            </div>
          </div>

          {/* Right Column: Chatbox (25% on Desktop) */}
          <div className="lg:col-span-1 h-full lg:sticky lg:top-[88px]">
            <KickChat />
          </div>

        </div>

        {/* Last Livestreams Section */}
        {!loading && lastStreams.length > 0 && (
          <section className="mt-12 border-t border-zinc-800/80 pt-10 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-zinc-100 uppercase">
                  Last Livestreams
                </h2>
              </div>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                {lastStreams.length} Videos Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lastStreams.map((vod, idx) => {
                const vodTitle = vod.session_title || vod.title;
                const vodViews = typeof vod.views === 'number' ? `${vod.views.toLocaleString()} views` : (vod.views || "0 views");
                const vodDuration = typeof vod.duration === 'number' ? formatDuration(vod.duration) : (vod.duration || "00:00:00");
                const vodDate = vod.created_at ? (vod.created_at.includes('-') ? formatRelativeDate(vod.created_at) : vod.created_at) : (vod.date || "");
                const vodThumb = vod.thumbnail?.src || vod.thumbnail || null;

                return (
                  <button 
                    key={idx} 
                    onClick={() => {
                      setActiveVOD(vod);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full text-left group cursor-pointer overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/30 hover:shadow-[0_10px_30px_-10px_rgba(239,68,68,0.2)]"
                  >
                    {/* Thumbnail Container */}
                    <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
                      {vodThumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img 
                          src={vodThumb} 
                          alt={vodTitle} 
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 group-hover:opacity-50 transition-opacity" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                      
                      {/* Pulsing Play icon */}
                      <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 border border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-zinc-950 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>

                      {/* Duration Badge */}
                      <span className="absolute bottom-3 right-3 rounded bg-zinc-950/80 px-2 py-0.5 text-[10px] font-bold text-zinc-300 tracking-wider">
                        {vodDuration}
                      </span>
                      
                      {/* Video Type Badge */}
                      <span className="absolute top-3 left-3 rounded bg-red-600/10 border border-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-wide">
                        VOD
                      </span>
                    </div>

                    {/* Info Segment */}
                    <div className="p-4">
                      <h3 className="line-clamp-2 text-sm font-bold text-zinc-100 group-hover:text-red-500 transition-colors leading-snug">
                        {vodTitle}
                      </h3>
                      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 font-medium">
                        <span>{vodViews}</span>
                        <span>•</span>
                        <span>{vodDate}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 font-medium">
            &copy; {new Date().getFullYear()} <span className="text-zinc-300 font-bold">1_bp</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              Red-RP Stream Hub
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
