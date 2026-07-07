import React from "react";

export default function KickPlayer() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
      <div className="aspect-video w-full">
        <iframe
          src="https://player.kick.com/REDAFF1K"
          className="h-full w-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}
