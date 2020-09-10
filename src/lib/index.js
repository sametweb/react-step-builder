import React, { useState } from "react";
import { StepBuilder } from "./StepBuilder";

var StepContext = React.createContext();

export function useStepState(INITIAL_VALUE) {
  var myState = useState(INITIAL_VALUE);
  var state = myState[0];
  var setState = myState[1];
  /**
   * Stores data in state with the provided key.
   * @param {string} key - Key value for data to be stored. Must be unique accross entire state of all steps.
   * @param {string} value - Data to be stored.
   */
  function setStepState(key, value) {
    state[key] = value;
    setState(state);
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
    /* 
      1. Deep copy of state is required
         JSON.parse and JSON.stringify does that

    */
    var key = event.target.name,
      value = event.target.value;

    var new_state = JSON.parse(JSON.stringify(state));
    new_state[key] = value;
    setState(new_state);
  }

  return [state, setStepState, getStepState, handleChange];
}

/**
 * This is a higher order component that returns your step component
 * with global state of the steps and helper methods.
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
 * - `jump: ƒ(<step>)`
 * - `setState: ƒ(<key, value>)`
 * - `state: <object>`
 * - `step: { order: <number>, nextStep: <number>, prevStep: <number>, title: <string> }`
 */
export function Step(props) {
  var Component = props.component,
    current = props.current,
    step = props.step;

  var context = React.useContext(StepContext);

  if (current === step.order) {
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
export function Steps(props) {
  var children = props.children;

  var mySteps = useState(StepBuilder()),
    steps = mySteps[0],
    setSteps = mySteps[1];

  // [state, set, get, handleChange]
  var myStepState = useStepState({}),
    state = myStepState[0],
    set = myStepState[1],
    get = myStepState[2],
    handleChange = myStepState[3];

  var myCurrent = useState(1),
    current = myCurrent[0],
    setCurrent = myCurrent[1];

  var stepTitles = children.map(function (step, order) {
    return step.props.title || "Step ".concat(order + 1);
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

  /**
   * Moves to the step with provided step order
   * @param {number} stepOrder - Step order number to jump
   */
  function jump(step) {
    var jumpedStep = steps.jump(step);
    setSteps(steps);
    setCurrent(jumpedStep);
  }

  children = children.map(function (child, id) {
    var new_child = Object.assign({}, child);
    new_child.props = Object.assign({}, child.props);
    new_child.props.step = stepNodes[id];
    new_child.props.current = current;
    return new_child;
    // return {
    //   ...child,
    //   props: {
    //     ...child.props,
    //     step: stepNodes[id],
    //     current,
    //   },
    // };
  });

  var value = {
    state: state,
    setState: set,
    getState: get,
    handleChange,
    next,
    prev,
    jump,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
