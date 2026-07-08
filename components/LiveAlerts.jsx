"use client";

import React from "react";

export default function LiveAlerts({ alerts, onRemove }) {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 pointer-events-none w-full max-w-[320px] sm:max-w-[360px]">
      {alerts.map((alert) => {
        let themeClasses = "";
        let icon = null;
        let title = "";
        let subtitle = "";

        if (alert.type === "follow") {
          themeClasses = "border-[#53FC18]/30 shadow-[0_0_20px_rgba(83,252,24,0.15)] bg-black/80";
          title = "New Follower!";
          subtitle = `${alert.name} followed reda-3x`;
          icon = (
            <div className="h-9 w-9 rounded-lg bg-[#53FC18]/10 border border-[#53FC18]/35 flex items-center justify-center text-[#53FC18]">
              <svg className="h-5 w-5 fill-current animate-pulse" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          );
        } else if (alert.type === "donation") {
          themeClasses = "border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] bg-black/80";
          title = "New Donation!";
          subtitle = `${alert.name} tipped ${alert.details}`;
          icon = (
            <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/35 flex items-center justify-center text-amber-500">
              <svg className="h-5 w-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          );
        } else if (alert.type === "subscription") {
          themeClasses = "border-fuchsia-500/30 shadow-[0_0_20px_rgba(217,70,239,0.15)] bg-black/80";
          title = "New Subscriber!";
          subtitle = `${alert.name} subscribed ${alert.details ? `(${alert.details})` : ""}`;
          icon = (
            <div className="h-9 w-9 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/35 flex items-center justify-center text-fuchsia-500">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          );
        }

        return (
          <div
            key={alert.id}
            className={`pointer-events-auto flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 animate-slide-in-right ${themeClasses}`}
          >
            {icon}
            <div className="flex-1 text-left">
              <div className="text-[12px] font-black text-white leading-tight tracking-tight uppercase">
                {title}
              </div>
              <div className="text-[11px] font-medium text-white/60 leading-none mt-1">
                {subtitle}
              </div>
            </div>
            <button
              onClick={() => onRemove(alert.id)}
              className="text-white/20 hover:text-white/50 transition-colors p-1"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
