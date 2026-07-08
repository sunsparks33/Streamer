"use client";

import React from "react";

export default function MtaCharacterCard({ profilePic }) {
  // Fallback avatar if profile pic is not loaded
  const avatarUrl = profilePic || "https://kick.com/api/v2/channels/reda-3x/placeholder";

  return (
    <div className="glass rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#111118]/90 to-[#0a0a0f]/90 space-y-4">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="h-5 w-1 rounded-full bg-[#53FC18]" />
          <h2 className="text-sm font-bold text-white tracking-tight uppercase">RED RolePlay Character ID</h2>
        </div>
        <span className="text-[9px] font-black bg-[#53FC18]/10 border border-[#53FC18]/20 text-[#53FC18] px-2 py-0.5 rounded-full uppercase tracking-wider">
          Active RP
        </span>
      </div>

      {/* ID Card Layout */}
      <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] relative overflow-hidden">
        {/* Holographic glowing lines in background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#53FC18]/5 to-transparent pointer-events-none" />

        {/* Character Portrait */}
        <div className="relative flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden border border-white/10 bg-black/40 shadow-inner group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt="Character Portrait"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Camera Frame Corners Overlay */}
          <div className="absolute inset-1.5 border border-white/10 pointer-events-none rounded" />
          <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#53FC18]" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#53FC18]" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#53FC18]" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#53FC18]" />
        </div>

        {/* Details Grid */}
        <div className="flex-1 w-full grid grid-cols-2 gap-y-3.5 gap-x-4 text-left">
          {/* Character Name */}
          <div className="col-span-2 pb-2 border-b border-white/[0.03]">
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest leading-none block">Full Name</span>
            <span className="text-sm font-black text-white leading-none mt-1 block tracking-wide">Reda_3x</span>
          </div>

          {/* Faction / Occupation */}
          <div>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest leading-none block">Faction</span>
            <span className="text-[11px] font-bold text-[#53FC18] leading-none mt-1 block">RED Gang Leader</span>
          </div>

          {/* Level / Respect */}
          <div>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest leading-none block">Level / Reputation</span>
            <span className="text-[11px] font-bold text-white/80 leading-none mt-1 block">LVL 24 / Veteran</span>
          </div>

          {/* Signature Vehicle */}
          <div>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest leading-none block">Signature Car</span>
            <span className="text-[11px] font-semibold text-white/60 leading-none mt-1 block">BMW M5 E60 / G63</span>
          </div>

          {/* Properties */}
          <div>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest leading-none block">Properties</span>
            <span className="text-[11px] font-semibold text-white/60 leading-none mt-1 block">Los Santos Mansion</span>
          </div>
        </div>
      </div>
    </div>
  );
}
