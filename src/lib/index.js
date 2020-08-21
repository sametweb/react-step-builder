import React, { useState } from "react";
import { StepBuilder } from "./StepBuilder";

const StepContext = React.createContext();

const useStepState = (INITIAL_VALUE) => {
  const [state, setState] = useState(INITIAL_VALUE);

  /**
   * Stores data in state with the provided key.
   * @param {string} key - Key value for data to be stored. Must be unique accross entire state of all steps.
   * @param {string} value - Data to be stored.
   */
  function setStepState(key, value) {
    setState({ ...state, [key]: value });
  }

  /**
   * Returns the data from state for the provided key.
   * @param {string} key - Key value for data to be retrieved.
   * @return {string} Data to be retrieved from state.
   */
  function getStepState(key) {
    return state[key] || "";
  }

  /**
   * Handler method for syntetic React events. Can be provided as a callback function to 'onChange' property of form elements.
   */
  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  return [state, setStepState, getStepState, handleChange];
};

/**
 * This is a higher order component that returns your step component with global state of the steps and helper methods.
 *
 *  @param {string} title - Title for step component. Not required. Default: "Step {order}"
 *  @param {React.Component} component - Step component to render.
 *
 * @example <Step title="Step title here" component={YourStepComponent} />
 *
 * @props
 * Here are default props provided to each step component
 * - `current: <number>`
 * - `getState: ƒ(<key>)`
 * - `handleChange: ƒ(<event>)`
 * - `next: ƒ()`
 * - `prev: ƒ()`
 * - `setState: ƒ(<key, value>)`
 * - `state: <object>`
 * - `step: { order: <number>, nextStep: <number>, prevStep: <number>, title: <string> }`
 */
export function Step({ component: Component, current, step }) {
  const context = React.useContext(StepContext);

  if (current === step.order) {
    console.log({ ...context, current, step });
    return <Component {...context} current={current} step={step} />;
  }
  return false;
}

/**
 * Wrapper component for Step components.
 * @summary Step components must be wrapped in `<Steps />` component
 * @example
 *   <Steps>
 *     <Step title="My first step" component={Step1} />
 *     <Step title="My second step" component={Step2} />
 *   </Steps>
 */
export function Steps({ children }) {
  const [steps, setSteps] = useState(new StepBuilder());
  const [state, set, get, handleChange] = useStepState({});
  const [current, setCurrent] = useState(1);

  var stepTitles = children.map((step, order) => {
    return step.props.title || `Step ${order + 1}`;
  });

  var stepNodes = steps.build(stepTitles);

  /**
   * Moves to the next step
   */
  function next() {
    var nextStep = steps.next();
    setSteps(steps);
    setCurrent(nextStep);
  }

  /**
   * Moves to the previous step
   */
  function prev() {
    var prevStep = steps.prev();
    setSteps(steps);
    setCurrent(prevStep);
  }

  children = children.map((child, id) => {
    return {
      ...child,
      props: {
        ...child.props,
        step: stepNodes[id],
        current,
      },
    };
  });

  const value = {
    state: state,
    setState: set,
    getState: get,
    handleChange,
    next,
    prev,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
