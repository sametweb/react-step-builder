import React, { useContext } from "react";
import { StepContext } from "./Steps";

export const Button = ({ next, prev, text, ...theRest }) => {
  const context = useContext(StepContext);
  const { prevStep, nextStep, steps } = context;

  return (prev && steps.current === 1) ||
    (next && steps.current === steps.total) ? null : (
    <button onClick={next ? nextStep : prev ? prevStep : null} {...theRest}>
      {text}
    </button>
  );
};

export const Navigation = ({ text, before, after }) => {
  const context = useContext(StepContext);
  const { jumpToStep, steps } = context;
  const stepsArray = [...Array(steps.total).keys()].map(x => x + 1);

  return stepsArray.map(step => (
    <button
      key={step}
      onClick={() => jumpToStep(step)}
      disabled={steps.current === step}
    >
      {text || `${before || ""}${step}${after || ""}`}
    </button>
  ));
};
