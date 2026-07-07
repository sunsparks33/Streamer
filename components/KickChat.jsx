import React from "react";

export default function KickChat() {
  return (
    <div className="w-full h-[500px] lg:h-[calc(100vh-112px)] overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
      <iframe
        src="https://kick.com/REDAFF1K/chatroom"
        className="w-full h-full"
        frameBorder="0"
        scrolling="no"
      />
    </div>
  );
}
