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

export default function Step3Letter({
  giftData,
  setGiftData,
}: Props) {
  const handleChange = (value: string) => {
    if (value.length <= 1000) {
      setGiftData((prev) => ({
        ...prev,
        letter: value,
      }));
    }
  };

  return (
    <div className="rounded-2xl bg-white/10 p-8 text-white">
      <h2 className="mb-6 text-2xl font-bold">
        Write Your Letter
      </h2>

      <textarea
        value={giftData.letter || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Write your heartfelt message..."
        rows={10}
        className="w-full rounded-xl border border-gray-300 bg-white p-4 text-black outline-none"
      />

      <div className="mt-3 text-right text-sm text-gray-300">
        {giftData.letter?.length || 0}/1000
      </div>
    </div>
  );
}