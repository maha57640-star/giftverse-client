import type { ChangeEvent } from "react";

type GiftData = {
  title: string;
  receiver: string;
  letter: string;
  photos: File[];
  music: File | null;
};

type Props = {
  giftData: GiftData;
  setGiftData: React.Dispatch<React.SetStateAction<GiftData>>;
};

export default function Step4Music({
  giftData,
  setGiftData,
}: Props) {
  const handleMusicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // basic validation (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("Music file too large (max 10MB)");
      return;
    }

    setGiftData((prev) => ({
      ...prev,
      music: file,
    }));
  };

  const removeMusic = () => {
    setGiftData((prev) => ({
      ...prev,
      music: null,
    }));
  };

  return (
    <div className="rounded-2xl bg-white/10 p-8 text-white">
      <h2 className="mb-6 text-2xl font-bold">
        Upload Music
      </h2>

      <input
  type="file"
  accept=".mp3,.wav,.ogg,.m4a,.aac,.flac,.mpeg,audio/*"
  onChange={handleMusicChange}
  className="mb-6"
/>

      {giftData.music ? (
        <div className="flex items-center justify-between rounded-xl bg-white/10 p-4">
          <span className="text-green-400">
            🎵 {giftData.music.name}
          </span>

          <button
            onClick={removeMusic}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white"
          >
            Remove
          </button>
        </div>
      ) : (
        <p className="text-gray-400">
          No music selected
        </p>
      )}
    </div>
  );
}