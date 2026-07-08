"use client";

import React, { useState, useEffect } from "react";

export default function DiscordWidget({ 
  serverId = "1084146853702008872", 
  inviteUrl = "https://discord.gg/T2Xx6fS8J",
  totalMembers = "25,000"
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    async function fetchWidget() {
      try {
        const r = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`);
        if (r.ok) {
          const d = await r.json();
          setData(d);
        }
      } catch (e) {
        console.error("Error fetching Discord widget:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchWidget();
  }, [serverId]);

  const onlineCount = data?.presence_count || 0;
  const serverName = data?.name || "RED RolePlay";
  const joinUrl = data?.instant_invite || inviteUrl;
  const allMembers = data?.members || [];
  const previewMembers = allMembers.slice(0, 6);

  return (
    <div className="glass rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br from-[#111118]/80 to-[#0a0a0f]/80 space-y-4 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="h-5 w-1 rounded-full bg-[#5865F2]" />
          <h2 className="text-sm font-bold text-white tracking-tight uppercase">Discord Guild</h2>
        </div>

        {/* Status Indicators */}
        {!loading && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Online Count */}
            {onlineCount > 0 && (
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#5865F2]/10 border border-[#5865F2]/25 text-[10px] font-bold text-[#5865F2] uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5865F2] animate-pulse mr-1" />
                {onlineCount.toLocaleString()} Online
              </div>
            )}
            {/* Total Members */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold text-white/40 uppercase tracking-wider">
              {totalMembers} Members
            </div>
          </div>
        )}
      </div>

      {/* Main Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Discord Icon */}
          <div className="h-11 w-11 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center text-[#5865F2] shadow-[0_0_15px_rgba(88,101,242,0.1)]">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M20.3 4.4A19.1 19.1 0 0 0 15.6 3c-.2.4-.4.9-.6 1.3a17.6 17.6 0 0 0-5.3 0A12.9 12.9 0 0 0 9.1 3 19.2 19.2 0 0 0 4.4 4.4 20 20 0 0 0 1 18.2a19.4 19.4 0 0 0 5.9 2.9 14.4 14.4 0 0 0 1.3-2 12.6 12.6 0 0 1-2-.9l.5-.4a13.7 13.7 0 0 0 11.7 0l.5.4a12.7 12.7 0 0 1-2 .9 14.2 14.2 0 0 0 1.3 2A19.3 19.3 0 0 0 23 18.2 19.9 19.9 0 0 0 20.3 4.4ZM8.5 15.4c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Zm7 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Z" />
            </svg>
          </div>

          <div className="text-left">
            <h3 className="text-xs font-bold text-white/80 leading-snug tracking-wide">{serverName}</h3>
            <p className="text-[10px] text-white/30 font-medium">Join voice channels, get announcements & browse active members.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {allMembers.length > 0 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                expanded
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-white/70 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {expanded ? "Hide Members" : "Show Members"}
            </button>
          )}
          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:w-auto group inline-flex items-center justify-center gap-2 rounded-xl bg-[#5865F2] px-5 py-2.5 text-xs font-bold text-white tracking-wide uppercase transition-all duration-300 shadow-[0_0_20px_rgba(88,101,242,0.25)] hover:bg-[#6d78f5] hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(88,101,242,0.45)] active:scale-[0.98]"
          >
            Join Server
          </a>
        </div>
      </div>

      {/* Collapsible Inline Active Members Grid */}
      {expanded && allMembers.length > 0 && (
        <div className="pt-4 border-t border-white/[0.04] space-y-3 animate-fade-in-up">
          <div className="flex items-center justify-between text-[9px] font-bold text-white/30 uppercase tracking-widest">
            <span>Online Members ({allMembers.length})</span>
            <span>Currently Active</span>
          </div>

          {/* Compact 3-Column Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
            {allMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-1.5 rounded-lg bg-white/[0.01] border border-white/[0.03] hover:bg-[#5865F2]/[0.05] hover:border-[#5865F2]/20 transition-all duration-200"
              >
                <div className="relative h-6 w-6 rounded-full overflow-hidden bg-[#18181f] border border-white/5 flex-shrink-0">
                  {member.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.avatar_url}
                      alt={member.username}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-[7px] font-bold text-[#5865F2] bg-[#5865F2]/10">
                      {member.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  {/* Status indicator dot */}
                  <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full ring-[1px] ring-[#0a0a0f] bg-[#23a55a]" />
                </div>
                
                <div className="text-left min-w-0 flex-1">
                  <div className="text-[10px] font-bold text-white/80 truncate leading-tight" title={member.username}>
                    {member.username}
                  </div>
                  {member.game && (
                    <div className="text-[8px] text-[#5865F2]/80 font-semibold truncate" title={`Playing ${member.game.name}`}>
                      {member.game.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Online Members Avatars Footer (only shown when collapsed) */}
      {!expanded && !loading && previewMembers.length > 0 && (
        <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.03] animate-fade-in">
          <div className="flex -space-x-2.5 overflow-hidden">
            {previewMembers.map((member, idx) => (
              <div
                key={idx}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0a0a0f] overflow-hidden bg-[#18181f] border border-white/5"
                title={member.username}
              >
                {member.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.avatar_url}
                    alt={member.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[8px] font-bold text-[#5865F2] bg-[#5865F2]/10">
                    {member.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            ))}
          </div>
          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
            Active Community Members Online
          </span>
        </div>
      )}
    </div>
  );
}
