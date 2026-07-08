"use client";

import React, { useEffect, useState } from "react";

export default function LiveTicker({ followersCount, alerts }) {
  const [tickerItems, setTickerItems] = useState([
    "🔴 WATCH REDA-3X LIVE ON KICK.COM/REDA-3X",
    "💬 JOIN RED ROLEPLAY DISCORD SERVER: DISCORD.GG/T2XX6FS8J",
    "⚡ NEXT LIVESTREAM ANNOUNCEMENTS WILL BE POSTED IN DISCORD",
    "🎮 MTA ROLEPLAY VANITY URL: RED-RP.COM",
    "⭐ USE KICK EMOTES AND CHAT WITH KICK INTEGRATION LIVE"
  ]);

  // Append new live alerts (follows, tips, subs) dynamically to the ticker tape!
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      const latestAlert = alerts[alerts.length - 1];
      let alertMsg = "";

      if (latestAlert.type === "follow") {
        alertMsg = `🎉 NEW FOLLOWER: ${latestAlert.name.toUpperCase()} JUST JOINED THE HUB!`;
      } else if (latestAlert.type === "donation") {
        alertMsg = `💰 DONATION RECEIVED: ${latestAlert.name.toUpperCase()} TIPPED ${latestAlert.details}!`;
      } else if (latestAlert.type === "subscription") {
        alertMsg = `⭐ NEW SUBSCRIBER: ${latestAlert.name.toUpperCase()} SUBSCRIBED (${latestAlert.details.toUpperCase()})!`;
      }

      if (alertMsg) {
        setTickerItems(prev => [alertMsg, ...prev.slice(0, 7)]);
      }
    }
  }, [alerts]);

  // Combine items to make a continuous loop text
  const marqueeText = tickerItems.join("   ·   ");

  return (
    <div className="w-full bg-[#0a0a0f]/90 border-y border-white/[0.05] h-8 flex items-center overflow-hidden z-30 select-none">
      {/* Left Badge */}
      <div className="flex-shrink-0 bg-rose-600 px-3 h-full flex items-center justify-center gap-1.5 text-[9px] font-black text-white uppercase tracking-wider shadow-[4px_0_15px_rgba(225,29,72,0.25)] relative z-10 border-r border-rose-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
        Live Feed
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden h-full flex items-center">
        <div className="absolute flex whitespace-nowrap animate-marquee gap-8 pl-[100%] text-[10px] font-bold text-white/50 tracking-wider uppercase">
          {/* Scroll items */}
          <span className="flex items-center gap-6">
            {tickerItems.map((item, idx) => (
              <span 
                key={idx} 
                className={`flex items-center gap-2 ${
                  item.startsWith("🎉") || item.startsWith("💰") || item.startsWith("⭐")
                    ? "text-[#53FC18] font-extrabold shadow-[0_0_10px_rgba(83,252,24,0.1)]"
                    : ""
                }`}
              >
                {item}
                <span className="text-white/10 font-normal">|</span>
              </span>
            ))}
          </span>
          {/* Duplicate scroll items for seamless loop */}
          <span className="flex items-center gap-6" aria-hidden="true">
            {tickerItems.map((item, idx) => (
              <span 
                key={`dup-${idx}`} 
                className={`flex items-center gap-2 ${
                  item.startsWith("🎉") || item.startsWith("💰") || item.startsWith("⭐")
                    ? "text-[#53FC18] font-extrabold"
                    : ""
                }`}
              >
                {item}
                <span className="text-white/10 font-normal">|</span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
