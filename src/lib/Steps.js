import React from "react";
import { StepBuilder, StepNode } from "./StepBuilder";

export const StepContext = React.createContext();

const useMainState = (INITIAL_VALUE) => {
  const [state, setState] = React.useState(INITIAL_VALUE);
  const setMainState = (newState) => setState({ ...state, ...newState });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  return [state, setMainState, handleChange];
};
export const useStepNavigation = (RegistrationSteps) => {
  const [current, setCurrent] = React.useState(1);
  const prevStep = () => setCurrent(RegistrationSteps.prev());
  const nextStep = () => setCurrent(RegistrationSteps.next());
  const jumpToStep = (step) => setCurrent(RegistrationSteps.jump(step));
  return [{ current }, prevStep, nextStep, jumpToStep];
};

export const Step = ({ component: Component, ...theRest }) => {
  const context = React.useContext(StepContext);
  const { current } = context.steps;
  return current === theRest.order && <Component {...context} />;
};
const Steps = ({ children }) => {
  const RegistrationSteps = new StepBuilder("registration");

  var stepNodes = children.map((step) => {
    var new_step = new StepNode(step.props.title, Boolean(step.props.persist));
    return new_step;
  });

  stepNodes = RegistrationSteps.build(stepNodes);

  children = children.map((child, id) => {
    return { ...child, props: { ...child.props, ...stepNodes[id] } };
  });

  console.log({ RegistrationSteps });

  const [mainState, setMainState, handleChange] = useMainState({});
  const [steps, prevStep, nextStep, jumpToStep] = useStepNavigation(
    RegistrationSteps
  );
  const value = {
    mainState,
    setMainState,
    handleChange,
    steps,
    prevStep,
    nextStep,
    jumpToStep,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
};

export default Steps;
