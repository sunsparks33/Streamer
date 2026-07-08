"use client";

import React from "react";

export default function StreamGoals({ followersCount, followerGoal = 1500, donationGoal = 500, currentDonation = 185 }) {
  // Follower percentage calculation
  const followerPercent = Math.min((followersCount / followerGoal) * 100, 100);
  // Donation percentage calculation
  const donationPercent = Math.min((currentDonation / donationGoal) * 100, 100);

  return (
    <div className="glass rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#111118]/80 to-[#0a0a0f]/80 space-y-5">
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.04]">
        <div className="h-5 w-1 rounded-full bg-rose-600" />
        <h2 className="text-sm font-bold text-white tracking-tight uppercase">Stream Goals</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Follower Goal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white/60">Follower Goal</span>
            <span className="font-black text-[#53FC18] tabular-nums">
              {followersCount.toLocaleString()} <span className="text-white/20 font-medium">/</span> {followerGoal.toLocaleString()}
            </span>
          </div>
          {/* Progress Bar Container */}
          <div className="relative h-3 w-full bg-[#18181f] border border-white/[0.04] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#53FC18] rounded-full shadow-[0_0_12px_rgba(83,252,24,0.6)] transition-all duration-500 ease-out"
              style={{ width: `${followerPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-white/30 font-bold">
            <span>Progress</span>
            <span>{followerPercent.toFixed(1)}% Completed</span>
          </div>
        </div>

        {/* Donation Goal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white/60">Weekly Tip Goal</span>
            <span className="font-black text-amber-500 tabular-nums">
              ${currentDonation.toLocaleString()} <span className="text-white/20 font-medium">/</span> ${donationGoal.toLocaleString()}
            </span>
          </div>
          {/* Progress Bar Container */}
          <div className="relative h-3 w-full bg-[#18181f] border border-white/[0.04] rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-amber-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)] transition-all duration-500 ease-out"
              style={{ width: `${donationPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-white/30 font-bold">
            <span>Progress</span>
            <span>{donationPercent.toFixed(1)}% Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
