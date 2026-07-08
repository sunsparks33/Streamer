"use client";

import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// List of recent community followers with relative time strings as requested (default fallback)
const initialFollowersData = [
  { name: "anass_rizk", relativeTime: "2m ago", avatar: "A" },
  { name: "f0nixxx", relativeTime: "15m ago", avatar: "F" },
  { name: "55ABDALLH55", relativeTime: "1h ago", avatar: "5" },
  { name: "Anassrizk", relativeTime: "3h ago", avatar: "A" },
  { name: "mouad_dev", relativeTime: "5h ago", avatar: "M" },
  { name: "yassine_r", relativeTime: "12h ago", avatar: "Y" },
  { name: "red_player", relativeTime: "1d ago", avatar: "R" },
  { name: "kick_warrior", relativeTime: "1d ago", avatar: "K" },
  { name: "mta_fan", relativeTime: "2d ago", avatar: "M" },
  { name: "gamer_pro", relativeTime: "2d ago", avatar: "G" }
];

export default function FollowersSection({ loading, followersCount, onFollowClick, hasFollowed, onFollowerIncrement }) {
  const [followers, setFollowers] = useState([]);
  const prevCountRef = useRef(followersCount);

  // Initialize list on mount
  useEffect(() => {
    setFollowers(
      initialFollowersData.map(f => ({
        ...f,
        isNew: false
      }))
    );
  }, []);

  // Monitor Streamlabs WebSocket for real-time live follows on Kick
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STREAMLABS_SOCKET_TOKEN;
    if (!token) return;

    // Connect to Streamlabs socket
    const socket = io(`https://sockets.streamlabs.com?token=${token}`, {
      transports: ["websocket"]
    });

    socket.on("connect", () => {
      console.log("[Streamlabs] Socket connected successfully");
    });

    socket.on("event", (eventData) => {
      console.log("[Streamlabs] Event received:", eventData);
      
      // We look for 'follow' events
      if (eventData.type === "follow" && eventData.message && eventData.message.length > 0) {
        const newFollowName = eventData.message[0].name;
        if (newFollowName) {
          const newFollowerObj = {
            name: newFollowName,
            avatar: newFollowName.charAt(0).toUpperCase(),
            relativeTime: "Just now",
            isNew: true
          };
          
          setFollowers(prev => {
            // Avoid duplicate followers
            if (prev.some(f => f.name === newFollowName && f.isNew)) {
              return prev;
            }
            return [newFollowerObj, ...prev];
          });

          // Trigger parent callback to increment total followers count
          if (onFollowerIncrement) {
            onFollowerIncrement();
          }
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [onFollowerIncrement]);

  // Monitor followersCount changes (e.g. from local website Follow click fallback)
  useEffect(() => {
    if (prevCountRef.current > 0 && followersCount > prevCountRef.current) {
      const diff = followersCount - prevCountRef.current;
      
      // If we clicked the local follow button, add ourselves to the list
      const newFollowers = Array.from({ length: diff }).map((_, i) => ({
        name: "New Supporter",
        avatar: "+",
        relativeTime: "Just now",
        isNew: true
      }));

      setFollowers(prev => [...newFollowers, ...prev]);
    }
    prevCountRef.current = followersCount;
  }, [followersCount]);

  return (
    <div className="glass rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#111118]/80 to-[#0a0a0f]/80 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#53FC18]/10 border border-[#53FC18]/25 flex items-center justify-center text-[#53FC18] shadow-[0_0_15px_rgba(83,252,24,0.1)]">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[22px] font-black text-white leading-none tracking-tight">
                {loading ? (
                  <span className="skeleton h-6 w-16 inline-block rounded" />
                ) : (
                  followersCount.toLocaleString()
                )}
              </span>
              <span className="text-[11px] font-bold text-[#53FC18] uppercase tracking-widest">Followers</span>
            </div>
            <p className="text-[10px] text-white/30 font-medium mt-1">Live from Kick channel metrics</p>
          </div>
        </div>

        <a
          href="https://kick.com/reda-3x"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onFollowClick}
          className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold tracking-wide uppercase transition-all duration-300 active:scale-[0.98] ${
            hasFollowed
              ? "bg-white/[0.05] border border-white/10 text-white/60 shadow-none cursor-default"
              : "bg-[#53FC18] text-black shadow-[0_0_20px_rgba(83,252,24,0.25)] hover:bg-[#6dff35] hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(83,252,24,0.45)]"
          }`}
        >
          <svg className={`h-4 w-4 fill-current ${!hasFollowed && "animate-pulse"}`} viewBox="0 0 24 24">
            {hasFollowed ? (
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            ) : (
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            )}
          </svg>
          {hasFollowed ? "Following on Kick" : "Follow reda-3x"}
        </a>
      </div>

      <div>
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">Recent Followers</h3>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {followers.map((f, i) => (
            <div
              key={i}
              className={`flex-shrink-0 flex items-center gap-2 bg-white/[0.02] border rounded-xl px-3.5 py-2 hover:bg-white/[0.05] hover:border-white/[0.07] transition-all duration-200 ${
                f.isNew 
                  ? "border-[#53FC18] shadow-[0_0_12px_rgba(83,252,24,0.15)] animate-bounce" 
                  : "border-white/[0.04]"
              }`}
            >
              <div className={`h-7 w-7 rounded-full border flex items-center justify-center text-[10px] font-black ${
                f.isNew
                  ? "bg-[#53FC18]/15 border-[#53FC18]/45 text-[#53FC18]"
                  : "bg-rose-600/10 border-rose-600/30 text-rose-400"
              }`}>
                {f.avatar}
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-white/80 leading-tight tracking-wide">{f.name}</div>
                <div className={`text-[9px] leading-none mt-0.5 font-bold ${
                  f.isNew ? "text-[#53FC18]" : "text-white/30"
                }`}>
                  {f.relativeTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
