import Navbar from "@/components/Navbar";
import KickPlayer from "@/components/KickPlayer";
import KickChat from "@/components/KickChat";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col justify-start">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* Left Column: Player & About Info (75% on Desktop) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Live Indicator + Title Card */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
              <div className="flex items-center gap-3">
                {/* Blinking Live Badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-500 text-xs font-black uppercase tracking-wider border border-red-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  LIVE
                </span>
                <div>
                  <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-100">
                    {"1_bp's Broadcast Room"}
                  </h1>
                  <p className="text-xs text-zinc-400">Streaming live on Kick.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Status:</span>
                <span className="text-xs font-semibold text-red-400 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                  Online
                </span>
              </div>
            </div>

            {/* Stream Player */}
            <KickPlayer />

            {/* Stream Description Info */}
            <div className="p-5 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
              <h2 className="text-base font-semibold text-zinc-100">About 1_bp</h2>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                Welcome! Dive into top-tier gameplay, live developer sessions, or casual hangout streams. Make sure to check out the chat on the right and drop a follow!
              </p>
            </div>
          </div>

          {/* Right Column: Chatbox (25% on Desktop) */}
          <div className="lg:col-span-1 h-full lg:sticky lg:top-[88px]">
            <KickChat />
          </div>

        </div>
      </main>
    </div>
  );
}
