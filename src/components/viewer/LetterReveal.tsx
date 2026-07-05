import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { TypeAnimation } from "react-type-animation";

type Props = {
  title: string;
  receiver: string;
  letter: string;
  music?: string;
  onFinished: () => void;
};

export default function LetterReveal({
  title,
  receiver,
  letter,
  music,
  onFinished,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (music) {
      const audio = new Audio(music);
      audio.volume = 0.5;
      audio.play().catch(() => {});
      audioRef.current = audio;
    }

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [music]);

  useEffect(() => {
    const timer = setTimeout(onFinished, 15000);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#170027] via-[#4B0082] to-[#0D001A] overflow-hidden">

      {typeof window !== "undefined" && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <motion.div
        initial={{ y: 400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-[700px] max-w-[92vw] rounded-3xl bg-white/10 backdrop-blur-xl p-10 text-white"
      >
        <h1 className="text-3xl font-bold text-center text-fuchsia-200">
          {title}
        </h1>

        <p className="mt-6 text-xl">
          Dear <span className="text-pink-300">{receiver}</span>,
        </p>

        <div className="mt-6 text-lg whitespace-pre-wrap">
          <TypeAnimation sequence={[letter]} speed={50} cursor />
        </div>

        <p className="mt-8 text-right text-pink-300 font-bold">
          ❤️ With Love
        </p>
      </motion.div>
    </div>
  );
}