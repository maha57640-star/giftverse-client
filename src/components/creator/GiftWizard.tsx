import { useState } from "react";
import StepIndicator from "./StepIndicator";
import Step1Details from "./Step1Details";
import Step2Photos from "./Step2Photos";
import Step3Letter from "./Step3Letter";
import Step4Music from "./Step4Music";
import Step5Preview from "./Step5Preview";

type GiftData = {
  title: string;
  receiver: string;
  letter: string;
  photos: File[];
  music: File | null;
};

export default function GiftWizard() {
  const [step, setStep] = useState(1);

  const [giftData, setGiftData] = useState<GiftData>({
    title: "",
    receiver: "",
    letter: "",
    photos: [],
    music: null,
  });

  const validateStep = () => {
    if (step === 1) {
      return giftData.title.trim() && giftData.receiver.trim();
    }

    if (step === 2) {
      return giftData.photos.length > 0;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) {
      alert("Please complete required fields before continuing");
      return;
    }

    if (step < 5) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Details
            giftData={giftData}
            setGiftData={setGiftData}
          />
        );

      case 2:
        return (
          <Step2Photos
            giftData={giftData}
            setGiftData={setGiftData}
          />
        );

      case 3:
        return (
          <Step3Letter
            giftData={giftData}
            setGiftData={setGiftData}
          />
        );

      case 4:
        return (
          <Step4Music
            giftData={giftData}
            setGiftData={setGiftData}
          />
        );

      case 5:
        return <Step5Preview giftData={giftData} />;

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <StepIndicator currentStep={step} />

      <div className="mb-8">{renderStep()}</div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="rounded-xl bg-gray-700 px-6 py-3 text-white disabled:opacity-40"
        >
          Back
        </button>

        <button
          onClick={nextStep}
          disabled={step === 5}
          className="rounded-xl bg-purple-600 px-6 py-3 text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}