import { useMemo } from "react";
import { motion } from "framer-motion";

export default function FinalScreen() {
  const hearts = useMemo(() => {
    return Array.from({ length: 12 }).map(() => ({
      x: Math.random() * 300 - 150,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 2,
      size: 16 + Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#14001f] via-[#300055] to-black flex items-center justify-center">

      {/* Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[180px]"
      />

      {/* Hearts */}
      {hearts.map((h, i) => (
        <motion.div
          key={i}
          initial={{
            y: 300,
            x: h.x,
            opacity: 0,
          }}
          animate={{
            y: -400,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
          }}
          style={{ fontSize: h.size }}
          className="absolute"
        >
          💜
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-20 text-center px-6"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-7xl"
        >
          💜
        </motion.div>

        <h1 className="mt-6 text-4xl font-bold text-white">
          Thank You
        </h1>

        <p className="mt-4 text-lg text-purple-200 max-w-md">
          Hope this little surprise brought a smile.
        </p>

        <p className="mt-3 text-purple-300">
          Memories like this stay forever.
        </p>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-12 text-purple-400 text-sm"
        >
          ✨ Made with GiftVerse ✨
        </motion.div>
      </motion.div>

    </div>
  );
}