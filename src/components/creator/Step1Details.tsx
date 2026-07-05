import type { Dispatch, SetStateAction } from "react";

type GiftData = {
  title: string;
  receiver: string;
  letter: string;
  photos: File[];
  music: File | null;
};

type Step1DetailsProps = {
  giftData: GiftData;
  setGiftData: Dispatch<SetStateAction<GiftData>>;
};

export default function Step1Details({
  giftData,
  setGiftData,
}: Step1DetailsProps) {
  const updateField = (key: keyof GiftData, value: string) => {
    setGiftData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="rounded-2xl bg-white/10 p-8 text-white">
      <h2 className="mb-5 text-2xl font-bold">
        Gift Details
      </h2>

      <input
        type="text"
        value={giftData.title}
        onChange={(e) => updateField("title", e.target.value)}
        placeholder="Gift Title"
        className="mb-4 w-full rounded-xl border border-gray-300 bg-white p-3 text-black"
      />

      <input
        type="text"
        value={giftData.receiver}
        onChange={(e) => updateField("receiver", e.target.value)}
        placeholder="Receiver Name"
        className="w-full rounded-xl border border-gray-300 bg-white p-3 text-black"
      />
    </div>
  );
}