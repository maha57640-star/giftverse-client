import { useState } from "react";

type Props = {
  onNext: (data: { title: string; receiver: string }) => void;
};

export default function GiftForm({ onNext }: Props) {
  const [title, setTitle] = useState("");
  const [receiver, setReceiver] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !receiver.trim()) {
      setError("Both fields are required");
      return;
    }

    setError("");

    onNext({
      title: title.trim(),
      receiver: receiver.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-6 rounded-3xl bg-white/10 p-8 backdrop-blur-md"
    >
      <div>
        <label className="mb-2 block text-white">Gift Title</label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Birthday Surprise"
          className="w-full rounded-xl border border-gray-600 bg-transparent p-3 text-white outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-white">Receiver Name</label>

        <input
          type="text"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          placeholder="John"
          className="w-full rounded-xl border border-gray-600 bg-transparent p-3 text-white outline-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700"
      >
        Continue
      </button>
    </form>
  );
}