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

  const stepLocks = [...Array(totalSteps).keys()].map((x, i) => ({
    step: x + 1,
    locked: !lockMode || i === 0 ? false : true
  }));

  const [locks, setLocks] = React.useState(stepLocks);

  const unlockNextStep = () =>
    setLocks(
      locks.map(item =>
        item.step <= currentStep + 1 ? { ...item, locked: false } : item
      )
    );

  const lockNextStep = () => {
    setLocks(
      locks.map(item =>
        item.step === currentStep + 1 ? { ...item, locked: true } : item
      )
    );
  };

  const prevStep = () => setCurrentStep(currentStep > 2 ? currentStep - 1 : 1);
  const nextStep = () =>
    setCurrentStep(currentStep < totalSteps ? currentStep + 1 : totalSteps);
  const jumpToStep = step => setCurrentStep(Number(step));

  return [
    { current: currentStep, total: totalSteps },
    locks,
    lockNextStep,
    unlockNextStep,
    prevStep,
    nextStep,
    jumpToStep
  ];
};

const Steps = ({ totalSteps, lockMode, children }) => {
  const [mainState, setMainState, handleChange] = useMainState({});
  const [
    steps,
    locks,
    lockNextStep,
    unlockNextStep,
    prevStep,
    nextStep,
    jumpToStep
  ] = useStepNavigation(totalSteps, lockMode);

  return (
    <StepContext.Provider
      value={{
        mainState,
        setMainState,
        handleChange,
        steps: { total: steps.total, current: steps.current },
        locks,
        lockNextStep,
        unlockNextStep,
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
