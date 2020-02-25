import { useState } from "react";

export const useStepNavigation = totalSteps => {
  const [currentStep, setCurrentStep] = useState(1);

  const prevStep = () => setCurrentStep(currentStep > 2 ? currentStep - 1 : 1);
  const nextStep = () =>
    setCurrentStep(currentStep < totalSteps ? currentStep + 1 : totalSteps);
  const jumpToStep = step => setCurrentStep(Number(step));

  return [
    { current: currentStep, total: totalSteps },
    prevStep,
    nextStep,
    jumpToStep
  ];
};
