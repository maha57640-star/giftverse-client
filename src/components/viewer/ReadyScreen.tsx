import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onYes: () => void;
};

export default function ReadyScreen({ onYes }: Props) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNo = () => {
    setNoPos({
      x: Math.random() * 250 - 125,
      y: Math.random() * 140 - 70,
    });
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#13001f] via-[#4b0082] to-black flex items-center justify-center">

      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute w-[700px] h-[700px] rounded-full bg-fuchsia-600/20 blur-[180px]"
      />

      {/* Floating Hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: 400,
            x: Math.random() * window.innerWidth,
            opacity: 0,
          }}
          animate={{
            y: -500,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute text-3xl"
        >
          💜
        </motion.div>
      ))}

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          y: 80,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-20 w-[92%] max-w-lg rounded-3xl border border-white/20 bg-white/10 p-10 text-center backdrop-blur-xl shadow-2xl"
      >

        {/* Gift */}
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
            y: [0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="text-7xl"
        >
          🎁
        </motion.div>

        <h1 className="mt-6 text-4xl font-bold text-white">
          Your Surprise Awaits
        </h1>

        <p className="mt-4 text-lg leading-8 text-purple-200">
          Someone created a beautiful memory just for you.
        </p>

        <p className="mt-2 text-purple-300">
          Are you ready to open it?
        </p>

        {/* Buttons */}
        <div className="relative mt-12 flex h-20 items-center justify-center gap-10">

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={onYes}
            className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-xl font-bold text-white shadow-xl"
          >
            💜 Yes
          </motion.button>

          <motion.button
            animate={noPos}
            transition={{
              type: "spring",
              stiffness: 250,
            }}
            onMouseEnter={moveNo}
            onClick={moveNo}
            className="rounded-2xl bg-gray-700 px-8 py-4 text-xl font-bold text-white shadow-xl"
          >
            🙈 No
          </motion.button>

        </div>

      </motion.div>

    </div>
  );
}