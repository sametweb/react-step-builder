import React, { useState } from "react";
import { StepBuilder, StepNode } from "./StepBuilder";

export const StepContext = React.createContext();

const useStepState = (INITIAL_VALUE) => {
  const [state, setState] = useState(INITIAL_VALUE);

  function setStepState(key, value) {
    setState({ ...state, [key]: value });
  }

  function handleChange(event) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  return [state, setStepState, handleChange];
};

export function Step({ component: Component, ...theRest }) {
  const context = React.useContext(StepContext);
  const { current, step } = theRest;

  return current === step.order && <Component {...context} {...theRest} />;
}

export function Steps({ children, name }) {
  const [steps, setSteps] = useState(new StepBuilder(name));
  const [stepState, setStepState, handleChange] = useStepState({});
  const [current, setCurrent] = useState(1);

  var step_titles = children.map((step, order) => {
    return step.props.title || `Step ${order + 1}`;
  });

  var stepNodes = steps.build(step_titles);

  function next() {
    var next_step = steps.next();
    setSteps(steps);
    setCurrent(next_step);
  }

  function prev() {
    var prev_step = steps.prev();
    setSteps(steps);
    setCurrent(prev_step);
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
    state: stepState,
    setState: setStepState,
    handleChange,
    next,
    prev,
  };

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
