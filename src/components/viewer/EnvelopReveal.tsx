import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import giftBoxOpen from "../../assets/giftbox-open.png";
import envelope from "../../assets/envelope.png";

type Props = {
  onFinished: () => void;
};

export default function EnvelopeReveal({ onFinished }: Props) {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    if (opened) return;

    setOpened(true);

    setTimeout(() => {
      onFinished();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#14001f] via-[#300055] to-black">

      {/* Purple Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute w-[700px] h-[700px] rounded-full bg-purple-700/20 blur-[180px]"
      />

      {/* Gift Box Bottom */}
      <img
        src={giftBoxOpen}
        alt="Gift Box"
        className="absolute bottom-24 w-[320px] z-10"
      />

      <AnimatePresence>

        {!opened && (
          <motion.img
            src={envelope}
            alt="Envelope"
            onClick={handleClick}
            initial={{
              y: 220,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              y: -20,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="absolute z-20 w-60 cursor-pointer"
          />
        )}

      </AnimatePresence>

      {opened && (
        <motion.img
          src={envelope}
          initial={{
            scale: 1,
            opacity: 1,
          }}
          animate={{
            scale: 1.2,
            opacity: 0,
            y: -120,
          }}
          transition={{
            duration: 1,
          }}
          className="absolute z-20 w-60"
        />
      )}

      {!opened && (
        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="absolute bottom-10 text-2xl font-bold text-white"
        >
          ✉️ Tap the Envelope
        </motion.p>
      )}

    </div>
  );
}