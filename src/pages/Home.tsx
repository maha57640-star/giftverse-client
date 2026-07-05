import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <Navbar />

      <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-6 text-6xl font-extrabold text-white">
          Create unforgettable
          <span className="block text-purple-500">
            digital gifts
          </span>
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-300">
          Photos, music, heartfelt letters, animations, and surprises—
          all packed into one beautiful gift link.
        </p>

        <button className="rounded-2xl bg-purple-600 px-8 py-4 text-lg font-semibold text-white transition hover:scale-105 hover:bg-purple-700">
          Start Creating
        </button>
      </main>
    </div>
  );
}