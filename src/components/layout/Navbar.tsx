import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-6 py-5">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-white tracking-wide">
        🎁 GiftVerse
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        <Link
          to="/"
          className={`text-sm font-medium transition hover:text-white ${
            location.pathname === "/"
              ? "text-white"
              : "text-gray-400"
          }`}
        >
          Home
        </Link>

        <Link
          to="/create"
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition
            ${
              location.pathname === "/create"
                ? "bg-purple-600 text-white"
                : "bg-white text-black hover:scale-105"
            }
          `}
        >
          Create Gift
        </Link>

      </div>
    </nav>
  );
}