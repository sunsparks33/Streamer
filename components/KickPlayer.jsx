"use client";

import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const pad = (n) => String(n).padStart(2, '0');
  if (hrs > 0) {
    return `${hrs}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

export default function KickPlayer({ isLive = false, activeVOD = null, onCloseVOD = () => {} }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls when playing
  useEffect(() => {
    if (!playing) return;
    const handleMove = () => {
      setShowControls(true);
    };
    const videoContainer = containerRef.current;
    if (videoContainer) {
      videoContainer.addEventListener("mousemove", handleMove);
      videoContainer.addEventListener("touchstart", handleMove);
    }
    
    const timer = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (videoContainer) {
        videoContainer.removeEventListener("mousemove", handleMove);
        videoContainer.removeEventListener("touchstart", handleMove);
      }
    };
  }, [playing, currentTime]);

  useEffect(() => {
    if (activeVOD && activeVOD.source) {
      const video = videoRef.current;
      if (!video) return;

      // Reset states
      setPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setShowControls(true);

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(activeVOD.source);
        hls.attachMedia(video);
        hlsRef.current = hls;
        
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(err => console.log("Autoplay blocked:", err));
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari fallback
        video.src = activeVOD.source;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(err => console.log("Autoplay blocked:", err));
        });
      }

      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }
  }, [activeVOD]);

  useEffect(() => {
    if (!activeVOD) return;
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setPlaying(true);
    const handlePause = () => {
      setPlaying(false);
      setShowControls(true);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [activeVOD]);

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setShowControls(true);
    } else {
      video.play().catch(err => console.error(err));
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const seekTime = Number(e.target.value);
    video.currentTime = seekTime;
    setCurrentTime(seekTime);
    setShowControls(true);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const vol = Number(e.target.value);
    video.volume = vol;
    setVolume(vol);
    video.muted = vol === 0;
    setMuted(vol === 0);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setFullscreen(true)).catch(err => console.error(err));
    } else {
      document.exitFullscreen().then(() => setFullscreen(false)).catch(err => console.error(err));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // VOD Active Player UI
  if (activeVOD) {
    return (
      <div className="w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
        <div 
          ref={containerRef}
          className="aspect-video w-full relative bg-black select-none group"
          onClick={togglePlay}
        >
          <video 
            ref={videoRef}
            className="w-full h-full object-contain cursor-pointer"
            playsInline
          />

          {/* Controls Overlay */}
          <div className={`absolute inset-0 z-20 flex flex-col justify-between bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/70 p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            
            {/* Top Bar: Title & Close Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-600 text-zinc-950 text-[10px] font-black uppercase tracking-wider">
                  VOD PLAYBACK
                </span>
                <span className="text-xs font-semibold text-zinc-100 line-clamp-1 max-w-[200px] sm:max-w-xs md:max-w-md">
                  {activeVOD.session_title || activeVOD.title}
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseVOD();
                }}
                className="rounded-lg bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-400 hover:bg-red-600 hover:text-zinc-950 hover:border-red-600 transition-all duration-200"
              >
                Close Video
              </button>
            </div>

            {/* Bottom Bar: Seek & Control Buttons */}
            <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
              {/* Timeline Slider */}
              <div className="flex items-center gap-3">
                <input 
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 hover:h-1.5 transition-all duration-200"
                  style={{
                    background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(currentTime / (duration || 1)) * 100}%, #27272a ${(currentTime / (duration || 1)) * 100}%, #27272a 100%)`
                  }}
                />
              </div>

              {/* Action Buttons row */}
              <div className="flex items-center justify-between text-zinc-200">
                {/* Left actions: Play, Time, Volume */}
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button onClick={togglePlay} className="hover:text-red-500 transition-colors">
                    {playing ? (
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Time Indicator */}
                  <span className="text-[11px] font-medium text-zinc-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  {/* Volume Controls */}
                  <div className="flex items-center gap-2 group/volume">
                    <button onClick={toggleMute} className="hover:text-red-500 transition-colors">
                      {muted || volume === 0 ? (
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM4.3 8.3H1.5v7.4h2.8l4.7 4.7v-16.8L4.3 8.3zM12 4L8.8 7.2v9.6L12 20V4z" />
                        </svg>
                      ) : volume < 0.5 ? (
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M3 9v6h4l5 5V4L9 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      )}
                    </button>
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={muted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-0 opacity-0 group-hover/volume:w-16 group-hover/volume:opacity-100 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 transition-all duration-300"
                      style={{
                        background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(muted ? 0 : volume) * 100}%, #27272a ${(muted ? 0 : volume) * 100}%, #27272a 100%)`
                      }}
                    />
                  </div>
                </div>

                {/* Right actions: Fullscreen */}
                <button onClick={toggleFullscreen} className="hover:text-red-500 transition-colors">
                  {fullscreen ? (
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Live / Offline View
  if (!isLive) {
    return (
      <div className="w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
        <div className="aspect-video w-full relative flex flex-col items-center justify-center bg-zinc-950 p-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-md">
            <div className="mb-4 h-16 w-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 shadow-xl">
              <svg className="h-8 w-8 animate-pulse text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5l-15-15" />
              </svg>
            </div>
            
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-3">
              Stream Offline
            </span>
            
            <h3 className="text-xl font-extrabold text-zinc-100 uppercase tracking-tight sm:text-2xl">
              1_bp is currently offline
            </h3>
            
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
              Check out the live chat on the right to interact with the community or join the Discord server to know when the next stream starts!
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://kick.com/reda-3x"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-red-600 text-zinc-950 text-xs font-black uppercase tracking-wider transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                Visit Kick Profile
              </a>
              <a
                href="https://discord.gg/T2Xx6fS8J"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-zinc-800 hover:text-zinc-100"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50">
      <div className="aspect-video w-full">
        <iframe
          src="https://player.kick.com/reda-3x"
          className="h-full w-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}
