"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  src?: string;
  className?: string;
}

export function MusicPlayer({
  src = "/audio/Wedding%20Nasheed%20-%20Muhammad%20Al%20Muqit%20_%20Lyrics%20Arabic%20%2B%20Terjemahan%20_%20%F0%9D%98%88%F0%9D%98%B3%F0%9D%98%A2%F0%9D%98%A3%F0%9D%98%AA%F0%9D%98%A4%20%F0%9D%98%95%F0%9D%98%A2%F0%9D%98%B4%F0%9D%98%A9%F0%9D%98%A6%F0%9D%98%A6%F0%9D%98%A5%20_%20%D9%85%D8%AD%D9%85%D8%AF%20%D8%A7%D9%84%D9%85%D9%82%D9%8A%D8%B7.mp3",
  className,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onCanPlay = () => setReady(true);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("ended", onEnded);

    const attemptAutoPlay = () => {
      audio.volume = 0.5;
      audio.loop = true;
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    attemptAutoPlay();
    window.addEventListener("pointerdown", attemptAutoPlay, { once: true });
    window.addEventListener("keydown", attemptAutoPlay, { once: true });

    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", attemptAutoPlay);
      window.removeEventListener("keydown", attemptAutoPlay);
    };
  }, []);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        audio.volume = 0.5;
        audio.loop = true;
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" autoPlay aria-hidden />
      <motion.button
        onClick={togglePlay}
        className={cn(
          "group relative flex h-10 w-10 items-center justify-center rounded-full",
          "border border-[#D4AF37]/30 bg-[color:var(--card-bg)] backdrop-blur-sm",
          "text-[#D4AF37] shadow-[0_2px_12px_rgba(212,175,55,0.1)]",
          "transition-all duration-300 hover:border-[#D4AF37]/60 hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]",
          className
        )}
        aria-label={playing ? "Pause musik" : "Putar musik latar"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {playing ? (
            <motion.span
              key="pause"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Pause className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="play"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Music2 className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>

        {playing && (
          <span
            className="absolute inset-0 rounded-full animate-ping border border-[#D4AF37]/20"
            aria-hidden
          />
        )}
      </motion.button>
    </>
  );
}
