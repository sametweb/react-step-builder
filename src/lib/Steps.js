import React from "react";
import useMainState from "./useMainState";
import { useStepNavigation } from "./useStepNavigation";

export const StepContext = React.createContext();

const Steps = ({ totalSteps, children }) => {
  const [mainState, setMainState, handleChange] = useMainState({});
  const [steps, prevStep, nextStep, jumpToStep] = useStepNavigation(totalSteps);

  return (
    <StepContext.Provider
      value={{
        mainState,
        setMainState,
        handleChange,
        steps: { total: steps.total, current: steps.current },
        prevStep,
        nextStep,
        jumpToStep
      }}
    >
      <div className="steps_wrapper">{children}</div>
    </StepContext.Provider>
  );
};

export default Steps;
