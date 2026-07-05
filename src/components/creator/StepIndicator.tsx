type Props = {
  currentStep: number;
};

export default function StepIndicator({ currentStep }: Props) {
  const steps = ["Details", "Photos", "Letter", "Music", "Preview"];

  return (
    <div className="mb-10 flex justify-center gap-3 flex-wrap">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const isActive = currentStep === stepNumber;
        const isDone = currentStep > stepNumber;

        return (
          <div
            key={step}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300
              ${
                isActive
                  ? "bg-purple-600 text-white scale-110"
                  : isDone
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300"
              }
            `}
          >
            {isDone ? "✔ " : ""}{step}
          </div>
        );
      })}
    </div>
  );
}