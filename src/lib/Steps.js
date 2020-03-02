import React from "react";

export const StepContext = React.createContext();

const useMainState = INITIAL_VALUE => {
  const [state, setState] = React.useState(INITIAL_VALUE);
  const setMainState = newState => setState({ ...state, ...newState });
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  return [state, setMainState, handleChange];
};

export const useStepNavigation = total => {
  const [current, setCurrent] = React.useState(1);
  const prevStep = () => setCurrent(current > 2 ? current - 1 : 1);
  const nextStep = () => setCurrent(current < total ? current + 1 : total);
  const jumpToStep = step => setCurrent(Number(step));
  return [{ current, total }, prevStep, nextStep, jumpToStep];
};

export const Step = ({ component: Component, order, persist }) => {
  const context = React.useContext(StepContext);
  const { current } = context.steps;
  return order === current || persist ? <Component {...context} /> : false;
};
const Steps = ({ total, children }) => {
  const [mainState, setMainState, handleChange] = useMainState({});
  const [steps, prevStep, nextStep, jumpToStep] = useStepNavigation(total);
  const value = {
    mainState,
    setMainState,
    handleChange,
    steps,
    prevStep,
    nextStep,
    jumpToStep
  };
  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

export default Steps;
