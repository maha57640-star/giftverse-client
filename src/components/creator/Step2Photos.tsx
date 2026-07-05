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

import { useEffect, useState } from "react";

export default function Step2Photos({ giftData, setGiftData }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setGiftData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  const removePhoto = (index: number) => {
    setGiftData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // SAFE preview handling
  useEffect(() => {
    const urls = giftData.photos.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [giftData.photos]);

  return (
    <div className="rounded-2xl bg-white/10 p-8 text-white">
      <h2 className="mb-6 text-2xl font-bold">
        Upload Photos
      </h2>

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handlePhotoChange}
        className="mb-6"
      />

      {previews.length === 0 ? (
        <p className="text-gray-400">No photos uploaded</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {previews.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                className="h-32 w-full rounded-lg object-cover"
              />

              <button
                onClick={() => removePhoto(index)}
                className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}