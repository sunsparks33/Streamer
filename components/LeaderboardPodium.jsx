"use client";

import React, { useState, useEffect } from "react";

export default function LeaderboardPodium({ alerts }) {
  // Initial leaderboard state
  const [leaders, setLeaders] = useState([
    { name: "anass_rizk", amount: 150.00, rank: 1, color: "from-amber-400 via-yellow-500 to-amber-600", glow: "shadow-[0_0_25px_rgba(245,158,11,0.35)]", border: "border-amber-400/40" },
    { name: "mouad_dev", amount: 100.00, rank: 2, color: "from-slate-300 via-zinc-400 to-slate-500", glow: "shadow-[0_0_20px_rgba(209,213,219,0.25)]", border: "border-slate-300/30" },
    { name: "yassine_r", amount: 75.00, rank: 3, color: "from-orange-400 via-amber-700 to-orange-600", glow: "shadow-[0_0_15px_rgba(180,83,9,0.2)]", border: "border-orange-500/20" }
  ]);

  // Listen to new donation alerts to automatically update the leaderboard in real-time!
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      const latestAlert = alerts[alerts.length - 1];
      if (latestAlert.type === "donation") {
        const name = latestAlert.name.toLowerCase();
        // Parse donation amount (e.g. "$50.00" -> 50.00)
        const amountNum = parseFloat(latestAlert.details.replace(/[^0-9.]/g, "")) || 0;
        
        if (amountNum > 0) {
          setLeaders(prev => {
            let updated = [...prev];
            const existingIdx = updated.findIndex(l => l.name.toLowerCase() === name);

            if (existingIdx !== -1) {
              // Add to existing amount
              updated[existingIdx].amount += amountNum;
            } else {
              // Add new user if they beat the 3rd rank wla we can just rank them
              updated.push({
                name,
                amount: amountNum,
                rank: 4, // temporary rank
                color: "",
                glow: "",
                border: ""
              });
            }

            // Sort by amount descending
            updated.sort((a, b) => b.amount - a.amount);

            // Re-assign ranks and styles for top 3
            return updated.slice(0, 3).map((item, idx) => {
              const rank = idx + 1;
              let color = "";
              let glow = "";
              let border = "";

              if (rank === 1) {
                color = "from-amber-400 via-yellow-500 to-amber-600";
                glow = "shadow-[0_0_25px_rgba(245,158,11,0.4)]";
                border = "border-amber-400/50";
              } else if (rank === 2) {
                color = "from-slate-300 via-zinc-400 to-slate-500";
                glow = "shadow-[0_0_20px_rgba(209,213,219,0.3)]";
                border = "border-slate-300/40";
              } else {
                color = "from-orange-400 via-amber-700 to-orange-600";
                glow = "shadow-[0_0_15px_rgba(180,83,9,0.25)]";
                border = "border-orange-500/30";
              }

              return {
                ...item,
                rank,
                color,
                glow,
                border
              };
            });
          });
        }
      }
    }
  }, [alerts]);

  // Find users for layout placement
  const gold = leaders.find(l => l.rank === 1);
  const silver = leaders.find(l => l.rank === 2);
  const bronze = leaders.find(l => l.rank === 3);

  return (
    <div className="glass rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#111118]/80 to-[#0a0a0f]/80 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="h-5 w-1 rounded-full bg-yellow-500" />
          <h2 className="text-sm font-bold text-white tracking-tight uppercase">Top Supporters</h2>
        </div>
        <span className="text-[9px] font-black bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
          Automatic Live Feed
        </span>
      </div>

      {/* Podium Container */}
      <div className="flex items-end justify-center gap-4 pt-10 pb-2 max-w-sm mx-auto">
        
        {/* 2nd Place - Silver */}
        {silver && (
          <div className="flex flex-col items-center flex-1 group">
            {/* User Avatar wla Initial letter */}
            <div className={`h-11 w-11 rounded-full bg-[#181822] border-2 ${silver.border} flex items-center justify-center text-xs font-black text-white/90 shadow-lg transition-transform duration-300 group-hover:-translate-y-1.5`}>
              {silver.name.charAt(0).toUpperCase()}
            </div>
            {/* Name & Amount */}
            <div className="text-center mt-2.5 space-y-0.5">
              <div className="text-[10px] font-bold text-white/80 truncate max-w-[80px]" title={silver.name}>
                {silver.name}
              </div>
              <div className="text-[9px] font-black text-zinc-400">
                ${silver.amount.toFixed(2)}
              </div>
            </div>
            {/* Pillar */}
            <div className={`mt-3 w-16 h-20 rounded-t-xl bg-gradient-to-b ${silver.color} ${silver.glow} flex items-center justify-center text-slate-900 font-black text-xl border-t border-white/20`}>
              2
            </div>
          </div>
        )}

        {/* 1st Place - Gold */}
        {gold && (
          <div className="flex flex-col items-center flex-1 group relative z-10">
            {/* Crown Icon */}
            <div className="absolute -top-7 text-yellow-400 animate-bounce">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            {/* User Avatar */}
            <div className={`h-14 w-14 rounded-full bg-[#181822] border-2 ${gold.border} flex items-center justify-center text-sm font-black text-white ${gold.glow} transition-transform duration-300 group-hover:-translate-y-2`}>
              {gold.name.charAt(0).toUpperCase()}
            </div>
            {/* Name & Amount */}
            <div className="text-center mt-2.5 space-y-0.5">
              <div className="text-[11px] font-black text-white truncate max-w-[90px]" title={gold.name}>
                {gold.name}
              </div>
              <div className="text-[10px] font-black text-yellow-400">
                ${gold.amount.toFixed(2)}
              </div>
            </div>
            {/* Pillar */}
            <div className={`mt-3 w-16 h-28 rounded-t-xl bg-gradient-to-b ${gold.color} ${gold.glow} flex items-center justify-center text-yellow-950 font-black text-2xl border-t border-white/30`}>
              1
            </div>
          </div>
        )}

        {/* 3rd Place - Bronze */}
        {bronze && (
          <div className="flex flex-col items-center flex-1 group">
            {/* User Avatar */}
            <div className={`h-10 w-10 rounded-full bg-[#181822] border-2 ${bronze.border} flex items-center justify-center text-xs font-black text-white/70 shadow-lg transition-transform duration-300 group-hover:-translate-y-1`}>
              {bronze.name.charAt(0).toUpperCase()}
            </div>
            {/* Name & Amount */}
            <div className="text-center mt-2.5 space-y-0.5">
              <div className="text-[10px] font-bold text-white/70 truncate max-w-[80px]" title={bronze.name}>
                {bronze.name}
              </div>
              <div className="text-[9px] font-black text-orange-400/80">
                ${bronze.amount.toFixed(2)}
              </div>
            </div>
            {/* Pillar */}
            <div className={`mt-3 w-16 h-14 rounded-t-xl bg-gradient-to-b ${bronze.color} ${bronze.glow} flex items-center justify-center text-amber-950 font-black text-lg border-t border-white/10`}>
              3
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
