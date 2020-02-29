import React from "react";

export const StepContext = React.createContext();

const useMainState = INITIAL_VALUE => {
  const [state, setState] = React.useState(INITIAL_VALUE);

  const setMainState = newState => setState({ ...state, ...newState });

  const handleChange = event =>
    setState({ ...state, [event.target.name]: event.target.value });

  return [state, setMainState, handleChange];
};

export const useStepNavigation = (totalSteps, lockMode) => {
  const [currentStep, setCurrentStep] = React.useState(1);

  const prevStep = () => setCurrentStep(currentStep > 2 ? currentStep - 1 : 1);
  const nextStep = () =>
    setCurrentStep(currentStep < totalSteps ? currentStep + 1 : totalSteps);
  const jumpToStep = step => setCurrentStep(Number(step));

  return [
    { current: currentStep, total: totalSteps, lock: currentStep + 1 },
    prevStep,
    nextStep,
    jumpToStep
  ];
};

const Steps = ({ totalSteps, lockMode, children }) => {
  const [mainState, setMainState, handleChange] = useMainState({});
  const [steps, prevStep, nextStep, jumpToStep] = useStepNavigation(
    totalSteps,
    lockMode
  );
  console.log({
    mainState,
    setMainState,
    handleChange,
    steps: { total: steps.total, current: steps.current, lock: steps.lock },
    prevStep,
    nextStep,
    jumpToStep
  });
  return (
    <StepContext.Provider
      value={{
        mainState,
        setMainState,
        handleChange,
        steps: { total: steps.total, current: steps.current, lock: steps.lock },
        prevStep,
        nextStep,
        jumpToStep
      }}
    >
      {children}
    </StepContext.Provider>
  );
};

export default Steps;
