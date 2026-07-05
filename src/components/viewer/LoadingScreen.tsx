import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#13001f] via-[#2d0052] to-black flex flex-col items-center justify-center">

      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute h-[700px] w-[700px] rounded-full bg-purple-600/20 blur-[180px]"
      />

      {/* Floating Gift */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-8xl z-10"
      >
        🎁
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-8 text-5xl font-bold text-white"
      >
        GiftVerse
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="mt-4 text-lg text-purple-200"
      >
        Preparing your surprise...
      </motion.p>

      {/* Loading Bar */}
      <div className="mt-12 h-2 w-72 overflow-hidden rounded-full bg-white/20">

        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-full w-28 bg-gradient-to-r from-pink-400 to-purple-400"
        />

      </div>

      {/* Bottom Text */}
      <motion.p
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-10 text-sm text-gray-300"
      >
        Loading your memories...
      </motion.p>
    </div>
  );
}