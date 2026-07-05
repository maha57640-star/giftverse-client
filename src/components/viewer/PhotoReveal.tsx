import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  photos: string[];
  onFinished: () => void;
};

export default function PhotoReveal({ photos, onFinished }: Props) {
  const [visiblePhotos, setVisiblePhotos] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [canFinish, setCanFinish] = useState(false);

  const isMobile = window.innerWidth < 768;

  const positions = isMobile
    ? [
        { x: -70, y: -100, rotate: -8 },
        { x: 0, y: -120, rotate: 0 },
        { x: 70, y: -100, rotate: 8 },
        { x: -60, y: 30, rotate: -6 },
        { x: 60, y: 30, rotate: 6 },
        { x: 0, y: 120, rotate: 0 },
      ]
    : [
        { x: -180, y: -120, rotate: -10 },
        { x: 0, y: -150, rotate: 0 },
        { x: 180, y: -120, rotate: 10 },
        { x: -150, y: 60, rotate: -8 },
        { x: 150, y: 60, rotate: 8 },
        { x: 0, y: 180, rotate: 0 },
      ];

  // Show photos one by one
  useEffect(() => {
    if (visiblePhotos < photos.length) {
      const timer = setTimeout(() => {
        setVisiblePhotos((prev) => prev + 1);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [visiblePhotos, photos.length]);

  // Check if all images are loaded
  useEffect(() => {
    if (loadedCount === photos.length && photos.length > 0) {
      const timer = setTimeout(() => {
        setCanFinish(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loadedCount, photos.length]);

  // Finish ONLY after everything is ready + animation done
  useEffect(() => {
    if (!canFinish) return;

    const timer = setTimeout(() => {
      onFinished();
    }, 2500);

    return () => clearTimeout(timer);
  }, [canFinish, onFinished]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-[#14001f] via-[#2d004d] to-black">
      <AnimatePresence>
        {photos.slice(0, visiblePhotos).map((photo, index) => {
          const position =
            positions[index] ||
            positions[positions.length - 1];

          return (
            <motion.img
              key={index}
              src={photo}
              alt={`Photo ${index + 1}`}
              onLoad={() =>
                setLoadedCount((prev) => prev + 1)
              }
              initial={{
                x: 0,
                y: 180,
                scale: 0.1,
                opacity: 0,
              }}
              animate={{
                x: position.x,
                y: position.y,
                scale: 1,
                opacity: 1,
                rotate: position.rotate,
              }}
              transition={{
                duration: 0.9,
                type: "spring",
                stiffness: 120,
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-40
                w-32
                -translate-x-1/2
                -translate-y-1/2
                rounded-xl
                border-4
                border-white
                object-cover
                shadow-2xl
                md:h-56
                md:w-44
              "
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}