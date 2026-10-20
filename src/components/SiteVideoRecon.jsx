import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Radio, Compass, Navigation, Eye } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function SiteVideoRecon() {
  const { badge, title, subtitle, feeds } = siteContent.droneRecon;
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState('00:00');
  const videoRef = useRef(null);

  const currentFeed = feeds[activeFeedIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [activeFeedIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = Math.floor(videoRef.current.currentTime);
    const mins = String(Math.floor(cur / 60)).padStart(2, '0');
    const secs = String(cur % 60).padStart(2, '0');
    setCurrentTime(`${mins}:${secs}`);
  };

  return (
    <section id="drone-recon" className="relative py-24 sm:py-32 bg-[#0B0C0E] text-white border-b border-neutral-800 architectural-grid-dark overflow-hidden">
      {/* Decorative Blueprint Corner Tag */}
      <div className="absolute top-4 left-4 font-mono-tech text-xs text-[#E87722] select-none pointer-events-none">
        + [DRONE-TELEMETRY // LIVE 60FPS]
      </div>
      <div className="absolute top-4 right-4 font-mono-tech text-xs text-neutral-500 select-none pointer-events-none">
        [KAARD AERIAL SURVEILLANCE] +
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E87722]/10 border border-[#E87722]/30 text-[#E87722] text-xs font-mono-tech uppercase mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {title.split('&')[0]}&{" "}
            <span className="font-editorial-italic font-extralight text-stone-300">
              {title.split('&')[1] || 'Aerial Recon'}
            </span>
          </h2>

          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Video Player Container with Telemetry HUD Overlay */}
        <div className="relative rounded-sm overflow-hidden border border-neutral-700 bg-black shadow-2xl">
          {/* Main Video Stream */}
          <div className="relative h-[340px] sm:h-[480px] lg:h-[600px] w-full bg-black">
            <video
              ref={videoRef}
              src={currentFeed.src}
              playsInline
              loop
              muted={isMuted}
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover"
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

            {/* Live Telemetry HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
              {/* Top HUD Bar */}
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-red-400 font-bold tracking-wider">REC</span>
                  <span className="text-neutral-400">|</span>
                  <span className="text-white">{currentTime}</span>
                  <span className="text-neutral-400">|</span>
                  <span className="text-[#E87722]">{currentFeed.telemetry.camera}</span>
                </div>

                <div className="hidden sm:flex items-center gap-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-neutral-300 text-[11px]">
                  <span>ALT: <strong className="text-white">{currentFeed.telemetry.alt}</strong></span>
                  <span>SPD: <strong className="text-white">{currentFeed.telemetry.speed}</strong></span>
                  <span>GPS: <strong className="text-[#E87722]">{currentFeed.telemetry.gps}</strong></span>
                </div>
              </div>

              {/* Center Crosshair Aim Graphic */}
              <div className="self-center flex flex-col items-center opacity-30">
                <div className="w-16 h-16 border border-white/60 rounded-full flex items-center justify-center relative">
                  <div className="w-2 h-2 bg-[#E87722] rounded-full" />
                  <div className="absolute top-0 bottom-0 w-px bg-white/40" />
                  <div className="absolute left-0 right-0 h-px bg-white/40" />
                </div>
                <span className="text-[9px] font-mono-tech text-white tracking-widest mt-1">
                  TARGET LOCK
                </span>
              </div>

              {/* Bottom HUD Info Bar */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-md bg-black/75 backdrop-blur-md p-3.5 rounded border border-white/15">
                  <span className="text-[10px] font-mono-tech text-[#E87722] uppercase tracking-wider block">
                    {currentFeed.sublabel}
                  </span>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                    {currentFeed.caption}
                  </p>
                </div>

                {/* Player Controls */}
                <div className="pointer-events-auto flex items-center gap-2 bg-black/80 backdrop-blur-md p-2 rounded border border-white/20 self-start sm:self-auto">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded hover:bg-white/10 text-white transition-colors"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded hover:bg-white/10 text-white transition-colors"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#E87722]" />}
                  </button>

                  <div className="h-4 w-px bg-neutral-700 mx-1" />

                  <span className="text-[11px] font-mono-tech text-neutral-400 px-2">
                    REEL 0{activeFeedIndex + 1} / 04
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Switcher Tabs Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-800 border-t border-neutral-700">
            {feeds.map((feed, idx) => {
              const isSelected = activeFeedIndex === idx;
              return (
                <button
                  key={feed.id}
                  onClick={() => setActiveFeedIndex(idx)}
                  className={`p-4 text-left transition-all ${
                    isSelected
                      ? 'bg-[#181B21] border-t-2 border-[#E87722]'
                      : 'bg-[#121418] hover:bg-[#15181E] border-t-2 border-transparent'
                  }`}
                >
                  <span className="text-[10px] font-mono-tech text-[#E87722] uppercase tracking-wider block">
                    {feed.label}
                  </span>
                  <span className={`text-xs font-semibold block mt-1 transition-colors ${
                    isSelected ? 'text-white' : 'text-neutral-400'
                  }`}>
                    {feed.sublabel.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
