import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Gift = {
  title: string;
  receiver: string;
  letter: string;
  photos: string[];
  music?: string;
};

export default function GiftView() {
  const { id } = useParams();
  const [gift, setGift] = useState<Gift | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get(`http://10.10.11.152:5173/view/${id}`).then((res) => {
      setGift(res.data);

      // small delay for reveal animation
      setTimeout(() => setShow(true), 300);
    });
  }, [id]);

  if (!gift) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black text-white p-6">
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-700 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-4">
          {gift.title}
        </h1>

        {/* Receiver */}
        <h2 className="text-center text-lg text-purple-300 mb-6">
          To: {gift.receiver}
        </h2>

        {/* Letter */}
        <div className="bg-black/30 p-4 rounded-xl mb-6 whitespace-pre-wrap">
          {gift.letter}
        </div>

        {/* Photos */}
        {gift.photos?.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {gift.photos.map((p, i) => (
              <img
                key={i}
                src={`http://10.10.11.152:5173/view/${p}`}
                className="rounded-lg h-32 w-full object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}