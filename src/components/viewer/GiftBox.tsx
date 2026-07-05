import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import closedGift from "../../assets/gift-box.png";
import giftBottom from "../../assets/giftbox-open.png";
import giftLid from "../../assets/gift-lid.png";

type Props = {
  onFinished: () => void;
  onPlayMusic: () => void | Promise<void>;
};


export default function GiftBox({
  onFinished,
  onPlayMusic,
}: Props) {
  const [opened, setOpened] = useState(false);

  const openGift = async () => {
    if (opened) return;

    setOpened(true);

    // Start music once
    await onPlayMusic();

    // Wait for animation to finish
    setTimeout(() => {
      onFinished();
    }, 2600);
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#12001d] via-[#300055] to-black">
      {/* Purple Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute h-[700px] w-[700px] rounded-full bg-purple-700/20 blur-[180px]"
      />

      <div className="relative">
        {!opened && (
          <motion.img
            src={closedGift}
            onClick={openGift}
            whileHover={{
              scale: 1.05,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, -1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="w-[340px] cursor-pointer select-none"
          />
        )}

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              className="relative h-[340px] w-[340px]"
            >
              {/* Golden Glow */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.8, 2.3],
                }}
                transition={{
                  duration: 1.8,
                }}
                className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-300 blur-[120px]"
              />

              {/* Box Bottom */}
              <motion.img
                src={giftBottom}
                initial={{ y: 0 }}
                animate={{
                  y: 35,
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="absolute inset-0 w-[340px]"
              />

              {/* Box Lid */}
              <motion.img
                src={giftLid}
                initial={{
                  y: 0,
                  rotate: 0,
                }}
                animate={{
                  y: -180,
                  x: 60,
                  rotate: 22,
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeOut",
                }}
                style={{
                  transformOrigin: "bottom center",
                  zIndex: 20,
                }}
                className="absolute inset-0 w-[340px]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!opened && (
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="absolute bottom-20 text-3xl font-bold text-white"
        >
          🎁 Tap to Open
        </motion.p>
      )}
    </div>
  );
}