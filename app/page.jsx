import Navbar from "@/components/Navbar";
import KickPlayer from "@/components/KickPlayer";
import KickChat from "@/components/KickChat";

const lastStreams = [
  {
    title: "RED-RP | Darija MTA: Lkhdma M3a Lkhout & Ganging Up #45",
    duration: "04:12:45",
    views: "1.8K views",
    date: "Yesterday",
  },
  {
    title: "RED-RP | MTA Morocco: T7ramiyat & Police Chases #44",
    duration: "03:52:10",
    views: "2.4K views",
    date: "3 days ago",
  },
  {
    title: "RED-RP | Server Launch Event & Custom Car Reveal #43",
    duration: "05:15:30",
    views: "3.1K views",
    date: "1 week ago",
  },
];

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

        {/* Last Livestreams Section */}
        <section className="mt-12 border-t border-zinc-800/80 pt-10 pb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-zinc-100 uppercase">
                Last Livestreams
              </h2>
            </div>
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              {lastStreams.length} Videos Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lastStreams.map((vod, idx) => (
              <div key={idx} className="group cursor-pointer overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/30 hover:shadow-[0_10px_30px_-10px_rgba(239,68,68,0.2)]">
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
                  {/* Grid pattern background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Pulsing Play icon */}
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10 border border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-zinc-950 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 rounded bg-zinc-950/80 px-2 py-0.5 text-[10px] font-bold text-zinc-300 tracking-wider">
                    {vod.duration}
                  </span>
                  
                  {/* Video Type Badge */}
                  <span className="absolute top-3 left-3 rounded bg-red-600/10 border border-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-wide">
                    VOD
                  </span>
                </div>

                {/* Info Segment */}
                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-bold text-zinc-100 group-hover:text-red-500 transition-colors leading-snug">
                    {vod.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-zinc-500 font-medium">
                    <span>{vod.views}</span>
                    <span>•</span>
                    <span>{vod.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
