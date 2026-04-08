"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";

type Props = {
  name: string;
  message: string;
};

export default function BirthdayWish({ name, message }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎆 Confetti
  const firework = () => {
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.6 }
    });
  };

  // 🎆 Continuous confetti
  useEffect(() => {
    if (!open) return;

    audioRef.current?.play().catch(() => {});

    const interval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.7 }
      });
    }, 900);

    return () => clearInterval(interval);
  }, [open]);

  // ⏱️ Step reveal
  useEffect(() => {
    if (!open) return;

    const timers = [
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 3200)
    ];

    return () => timers.forEach(clearTimeout);
  }, [open]);

  return (
    <div
      onClick={firework}
      onTouchStart={firework}
      className="min-h-screen flex items-center justify-center px-4 text-white overflow-hidden relative touch-manipulation select-none bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* 🎵 Music */}
      <audio ref={audioRef} loop>
        <source src="/birthday.mp3" type="audio/mpeg" />
      </audio>

      {!open ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="z-10 w-full max-w-xs px-6 py-4 rounded-2xl bg-black/30 backdrop-blur-md text-base sm:text-lg font-bold shadow-2xl"
        >
          🎁 Tap to Open Magic
        </motion.button>
      ) : (
        <motion.div
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl p-6 rounded-3xl text-center shadow-2xl"
        >
          {/* 🎉 Title */}
          {step >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold mb-4"
            >
              🎉 Happy Birthday {name} 🎉
            </motion.h1>
          )}

          {/* 🖼️ Draggable Image */}
          {step >= 2 && (
            <motion.div
              drag
              dragElastic={0.2}
              dragMomentum={false}
              whileTap={{ scale: 1.1 }}
              animate={{ x: [0, 80, -80, 0], y: [0, -40, 40, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="flex justify-center mb-4 cursor-grab active:cursor-grabbing"
            >
              <Image
                src="/brother.jpg"
                alt="Brother"
                width={110}
                height={110}
                className="rounded-full border-4 border-pink-400 shadow-xl object-cover"
              />
            </motion.div>
          )}

          {/* ⌨️ Typing Message */}
          {step >= 3 && (
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed min-h-[60px]">
              <Typewriter words={[message]} loop={1} cursor typeSpeed={50} />
            </p>
          )}

          {/* 🎵 Music Button */}

          {/* 🎊 Emojis */}
          {step >= 4 && <div className="mt-4 text-2xl">🎂 🎈 🎊</div>}
        </motion.div>
      )}

      {/* 🌈 Gradient Animation */}
      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
      `}</style>
    </div>
  );
}
