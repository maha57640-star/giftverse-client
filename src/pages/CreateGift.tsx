import GiftWizard from "../components/creator/GiftWizard";

export default function CreateGift() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 px-6 py-10">
      <h1 className="mb-10 text-center text-4xl font-bold text-white">
        Create Your Gift
      </h1>

      <GiftWizard />
    </div>
  );
}