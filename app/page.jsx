"use client";

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Navbar from "@/components/Navbar";
import KickPlayer from "@/components/KickPlayer";
import KickChat from "@/components/KickChat";
import FollowersSection from "@/components/FollowersSection";
import LiveAlerts from "@/components/LiveAlerts";
import StreamGoals from "@/components/StreamGoals";
import SetupSpecs from "@/components/SetupSpecs";
import StreamMusic from "@/components/StreamMusic";

/* ─── Helpers ──────────────────────────────────────────────────────── */
function formatDuration(ms) {
  if (!ms) return "0:00:00";
  const s = Math.floor(ms / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return `${Math.floor(s / 3600)}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

function formatRelativeDate(dateStr) {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr.replace(" ", "T") + "Z");
    const diffMs = Date.now() - date;
    const days = Math.floor(diffMs / 86400000);
    const hours = Math.floor(diffMs / 3600000);
    if (days > 0) {
      if (days === 1) return "Yesterday";
      if (days < 7) return `${days}d ago`;
      if (days < 30) return `${Math.floor(days / 7)}w ago`;
      return date.toLocaleDateString();
    }
    return hours > 0 ? `${hours}h ago` : "Just now";
  } catch {
    return dateStr;
  }
}

/* ─── Status Badge ─────────────────────────────────────────────────── */
function StatusBadge({ loading, isLive }) {
  if (loading) return (
    <span className="skeleton inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-transparent w-20 h-6" />
  );
  if (isLive) return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#53FC18]/10 text-[#53FC18] text-[11px] font-bold uppercase tracking-widest border border-[#53FC18]/25 animate-glow-pulse">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#53FC18] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#53FC18]" />
      </span>
      Live
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/10 text-red-400 text-[11px] font-semibold uppercase tracking-widest border border-red-600/20">
      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
      Offline
    </span>
  );
}

/* ─── VOD Card ─────────────────────────────────────────────────────── */
function VodCard({ vod, onPlay }) {
  const title    = vod.session_title || vod.title;
  const views    = typeof vod.views === "number" ? vod.views.toLocaleString() : "0";
  const duration = typeof vod.duration === "number" ? formatDuration(vod.duration) : "—";
  const date     = vod.created_at ? formatRelativeDate(vod.created_at) : "";
  const thumb    = vod.thumbnail?.src || vod.thumbnail || null;

  return (
    <button
      onClick={onPlay}
      className="vod-card group w-full text-left overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111118] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#0e0e14]">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
        ) : (
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(135deg,#111_25%,#1e1e27_50%,#111_75%)]" />
        )}
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-rose-600 group-hover:border-rose-500 group-hover:shadow-[0_0_24px_rgba(225,29,72,0.45)]">
            <svg className="h-4 w-4 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Badges */}
        <span className="absolute top-2.5 left-2.5 rounded-md bg-rose-600/20 border border-rose-500/25 px-1.5 py-0.5 text-[9px] font-bold text-rose-400 uppercase tracking-widest">
          VOD
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/60 backdrop-blur-sm px-1.5 py-0.5 text-[9px] font-semibold text-white/70 font-mono">
          {duration}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2.5">
        <h3 className="line-clamp-2 text-sm font-semibold text-white/90 leading-snug group-hover:text-rose-400 transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-white/30 font-medium">
          <span className="flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            {views}
          </span>
          <span className="text-white/15">·</span>
          <span>{date}</span>
        </div>
      </div>
    </button>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
export default function Home() {
  const [isLive, setIsLive]         = useState(false);
  const [lastStreams, setLastStreams] = useState([]);
  const [loading, setLoading]        = useState(true);
  const [activeVOD, setActiveVOD]    = useState(null);
  const [profilePic, setProfilePic]  = useState(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [hasFollowed, setHasFollowed] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [currentDonation, setCurrentDonation] = useState(0);

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const triggerAlert = (type, name, details = "") => {
    const id = Date.now() + Math.random().toString();
    setAlerts(prev => [...prev, { id, type, name, details }]);
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 5500);
  };

  /* Streamlabs Socket Connection */
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STREAMLABS_SOCKET_TOKEN;
    if (!token) return;

    const socket = io(`https://sockets.streamlabs.com?token=${token}`, {
      transports: ["websocket"]
    });

    socket.on("connect", () => {
      console.log("[Streamlabs Socket] Connected successfully");
    });

    socket.on("event", (eventData) => {
      // Follow Event
      if (eventData.type === "follow" && eventData.message && eventData.message.length > 0) {
        const followerName = eventData.message[0].name;
        if (followerName) {
          setFollowersCount(prev => prev + 1);
          triggerAlert("follow", followerName);
        }
      }

      // Donation Event
      if (eventData.type === "donation" && eventData.message && eventData.message.length > 0) {
        const donatorName = eventData.message[0].from;
        const amountString = eventData.message[0].formatted_amount || `$${eventData.message[0].amount}`;
        if (donatorName) {
          const rawAmount = parseFloat(eventData.message[0].amount) || 0;
          setCurrentDonation(prev => prev + rawAmount);
          triggerAlert("donation", donatorName, amountString);
        }
      }

      // Subscription Event
      if (eventData.type === "subscription" && eventData.message && eventData.message.length > 0) {
        const subName = eventData.message[0].name;
        const tier = eventData.message[0].sub_plan || "Tier 1";
        if (subName) {
          triggerAlert("subscription", subName, tier);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* Fetch data */
  useEffect(() => {
    async function fetchChannel() {
      try {
        const r = await fetch(`https://kick.com/api/v2/channels/reda-3x?t=${Date.now()}`, { cache: "no-store" });
        if (r.ok) {
          const d = await r.json();
          const live = d.livestream !== null;
          setIsLive(live);
          if (d.user?.profile_pic) setProfilePic(d.user.profile_pic);
          if (d.followers_count != null) setFollowersCount(d.followers_count);
          if (live && d.livestream?.viewer_count != null) {
            setViewerCount(d.livestream.viewer_count);
          } else {
            setViewerCount(0);
          }
        }
      } catch { /* no-op */ }
    }

    async function fetchVideos() {
      try {
        const r = await fetch(`https://kick.com/api/v2/channels/reda-3x/videos?t=${Date.now()}`, { cache: "no-store" });
        if (r.ok) {
          const d = await r.json();
          if (Array.isArray(d)) {
            setLastStreams(d.slice(0, 3));
          }
        }
      } catch { /* no-op */ }
    }

    async function load() {
      await Promise.all([fetchChannel(), fetchVideos()]);
      setLoading(false);
    }
    
    load();

    // Poll live status & VODs list every 30s to auto-detect updates
    const pollInterval = setInterval(async () => {
      await fetchChannel();
      await fetchVideos();
    }, 30000);

    return () => clearInterval(pollInterval);
  }, []);

  /* Console watermark */
  useEffect(() => {
    const reset = "color: unset; background: unset; font-size: unset; padding: unset;";
    console.log(
      "%c\n" +
      " ██╗    ██████╗ ██████╗ \n" +
      " ██║    ██╔══██╗██╔══██╗\n" +
      " ██║    ██████╔╝██████╔╝\n" +
      " ██║    ██╔══██╗██╔═══╝ \n" +
      " ██████╗██████╔╝██║     \n" +
      " ╚═════╝╚═════╝ ╚═╝     \n",
      "color: #53FC18; font-family: monospace; font-size: 13px; line-height: 1.3;"
    );
    console.log(
      "%c  1_bp Stream Hub  %c © 2025 1_bp · All rights reserved  %c  kick.com/reda-3x  ",
      "background: #53FC18; color: #000; font-weight: 900; font-size: 11px; padding: 4px 10px; border-radius: 4px 0 0 4px;",
      "background: #111; color: #aaa; font-size: 11px; padding: 4px 10px;",
      "background: #18181f; color: #53FC18; font-size: 11px; padding: 4px 10px; border-radius: 0 4px 4px 0;"
    );
    console.log(
      "%c⚠  This website is protected. Unauthorized copying or reproduction is strictly prohibited.",
      "color: #ef4444; font-size: 11px; padding: 2px 0;"
    );
  }, []);

  /* Security */
  useEffect(() => {
    const noop = (e) => e.preventDefault();
    const key  = (e) => {
      if (e.key === "F12" || e.keyCode === 123) { e.preventDefault(); return false; }
      if (e.ctrlKey && e.shiftKey && [73,74].includes(e.keyCode)) { e.preventDefault(); return false; }
      if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; }
    };
    document.addEventListener("contextmenu", noop);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("contextmenu", noop); document.removeEventListener("keydown", key); };
  }, []);

  const handleFollowClick = () => {
    if (!hasFollowed) {
      setFollowersCount(prev => prev + 1);
      setHasFollowed(true);
    }
  };

  const handlePlayVOD = (vod) => { setActiveVOD(vod); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--color-surface)" }}>
      <Navbar />

      {/* Live alerts overlay */}
      <LiveAlerts alerts={alerts} onRemove={removeAlert} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-6 animate-fade-in-up">

        {/* ── Top info bar ─────────────────────────────────────────── */}
        <div className="glass rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <StatusBadge loading={loading} isLive={isLive} />
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">{"1_bp's Broadcast Room"}</h1>
              <p className="text-[11px] text-white/30 font-medium">Streaming live on Kick.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/30">
            {/* Viewer count — only when live */}
            {isLive && !loading && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#53FC18]/10 border border-[#53FC18]/20">
                <svg className="h-3 w-3 text-[#53FC18]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <span className="font-bold text-[#53FC18] tabular-nums">{viewerCount.toLocaleString()}</span>
                <span className="text-[#53FC18]/60 text-[10px]">watching</span>
              </div>
            )}
            <span>Status</span>
            <span className="text-white/10">/</span>
            {loading
              ? <span className="skeleton h-4 w-12 rounded" />
              : isLive
                ? <span className="font-semibold text-[#53FC18]">Online</span>
                : <span className="font-semibold text-white/25">Offline</span>
            }
          </div>
        </div>

        {/* ── Main grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">

          {/* Player column */}
          <div className="lg:col-span-3 space-y-5">
            {loading ? (
              <div className="skeleton w-full rounded-2xl aspect-video" />
            ) : (
              <KickPlayer isLive={isLive} activeVOD={activeVOD} onCloseVOD={() => setActiveVOD(null)} profilePic={profilePic} />
            )}

            {/* Stream Goals */}
            <StreamGoals
              followersCount={followersCount}
              followerGoal={1500}
              currentDonation={currentDonation}
              donationGoal={100}
            />

            {/* Followers Section */}
            <FollowersSection
              loading={loading}
              followersCount={followersCount}
              onFollowClick={handleFollowClick}
              hasFollowed={hasFollowed}
              onFollowerIncrement={() => setFollowersCount(prev => prev + 1)}
            />

            {/* About card */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="h-5 w-1 rounded-full bg-rose-600" />
                <h2 className="text-sm font-bold text-white tracking-tight">About 1_bp</h2>
              </div>
              <p className="text-[13px] text-white/45 leading-relaxed">
                Welcome! Dive into top-tier gameplay, live developer sessions, or casual hangout streams.
                Make sure to check out the chat on the right and drop a follow!
              </p>
            </div>

            {/* Setup specs card */}
            <SetupSpecs />

            {/* Stream Music beats card */}
            <StreamMusic />

            {/* Scroll indicator — outside the About card */}
            {!loading && lastStreams.length > 0 && !activeVOD && (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-5 h-8 border border-rose-600/50 rounded-full flex justify-center pt-1.5">
                  <div className="w-0.5 h-2 bg-rose-500 rounded-full animate-scroll-wheel" />
                </div>
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-rose-600/60 mt-2">
                  Scroll to explore
                </span>
              </div>
            )}
          </div>

          {/* Chat column */}
          <div className="lg:col-span-1 lg:sticky lg:top-[68px]">
            <KickChat />
          </div>
        </div>

        {/* ── VOD section ──────────────────────────────────────────── */}
        {!loading && lastStreams.length > 0 && (
          <section className="pt-10 border-t border-white/[0.05]">
            <div className="flex items-end justify-between mb-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-600/70 mb-1">Archive</p>
                <h2 className="text-xl font-black text-white tracking-tight">Last Livestreams</h2>
              </div>
              <span className="text-[11px] font-semibold text-white/20 uppercase tracking-wider">
                {lastStreams.length} {lastStreams.length === 1 ? "Video" : "Videos"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {lastStreams.map((vod, idx) => (
                <VodCard key={idx} vod={vod} onPlay={() => handlePlayVOD(vod)} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/20 font-medium">
            &copy; {new Date().getFullYear()} <span className="text-white/40 font-semibold">1_bp</span>. All rights reserved.
          </p>
          <span className="text-[9px] text-white/15 font-bold uppercase tracking-[0.2em] border border-white/[0.05] rounded px-2 py-1">
            Red-RP Stream Hub
          </span>
        </div>
      </footer>
    </div>
  );
}
