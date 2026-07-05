import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";

type Props = {
  giftData: {
    title: string;
    receiver: string;
    letter: string;
    photos: File[];
    music: File | null;
  };
};

const API_URL = "https://giftverse-backend2.onrender.com";
const WEBSITE_URL = "https://giftverse-client.vercel.app/";

export default function Step5Preview({ giftData }: Props) {
  const [loading, setLoading] = useState(false);
  const [giftId, setGiftId] = useState<string | null>(null);

  const previewPhotos = useMemo(() => {
    return giftData.photos.map((file) => URL.createObjectURL(file));
  }, [giftData.photos]);

  useEffect(() => {
    return () => {
      previewPhotos.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewPhotos]);

  const createGift = async () => {
    if (!giftData.title.trim() || !giftData.receiver.trim()) {
      alert("Title and Receiver are required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", giftData.title);
      formData.append("receiver", giftData.receiver);
      formData.append("letter", giftData.letter);

      giftData.photos.forEach((photo) => {
        formData.append("photos", photo);
      });

      if (giftData.music) {
        formData.append("music", giftData.music);
      }

      const res = await axios.post(`${API_URL}/gift`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setGiftId(res.data._id);
    } catch (error) {
      console.error(error);
      alert("Failed to create gift");
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = giftId
    ? `${WEBSITE_URL}/view/${giftId}`
    : "";

  return (
    <div className="rounded-3xl bg-white/10 p-8 text-white backdrop-blur-xl">
      <h2 className="mb-6 text-center text-3xl font-bold">
        🎁 Gift Preview
      </h2>

      {/* Title */}
      <div className="mb-5">
        <p className="text-gray-300">Title</p>
        <h3 className="text-2xl font-semibold">
          {giftData.title || "-"}
        </h3>
      </div>

      {/* Receiver */}
      <div className="mb-5">
        <p className="text-gray-300">Receiver</p>
        <h3 className="text-xl">
          {giftData.receiver || "-"}
        </h3>
      </div>

      {/* Letter */}
      <div className="mb-6">
        <p className="mb-2 text-gray-300">Letter</p>

        <div className="rounded-xl bg-white/5 p-4 whitespace-pre-wrap">
          {giftData.letter || "No letter written yet"}
        </div>
      </div>

      {/* Photos */}
      <div className="mb-6">
        <p className="mb-2 text-gray-300">Photos</p>

        {previewPhotos.length === 0 ? (
          <p className="text-gray-400">
            No photos uploaded
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {previewPhotos.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-28 w-full rounded-xl object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {/* Music */}
      <div className="mb-8">
        <p className="mb-2 text-gray-300">Music</p>

        {giftData.music ? (
          <p className="text-green-400">
            🎵 {giftData.music.name}
          </p>
        ) : (
          <p className="text-gray-400">
            No music selected
          </p>
        )}
      </div>

      {!giftId ? (
        <button
          onClick={createGift}
          disabled={loading}
          className="w-full rounded-xl bg-purple-600 py-3 text-lg font-bold hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Creating Gift..." : "🎁 Create Gift"}
        </button>
      ) : (
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-green-400">
            🎉 Gift Created Successfully
          </h2>

          <p className="mt-3 text-purple-200">
            Scan the QR code to open your gift.
          </p>

          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl bg-white p-5 shadow-lg">
              <QRCode value={shareUrl} size={220} />
            </div>
          </div>

          <p className="mt-6 break-all text-sm text-gray-300">
            {shareUrl}
          </p>
        </div>
      )}
    </div>
  );
}