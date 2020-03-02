import React, { useContext } from "react";
import { StepContext } from "./Steps";

export const Button = ({ next, prev, text, ...theRest }) => {
  const context = useContext(StepContext);
  const { prevStep, nextStep, steps } = context;
  const { current, total } = steps;
  return (
    <button
      onClick={next ? nextStep : prev ? prevStep : null}
      disabled={(prev && current === 1) || (next && current === total)}
      {...theRest}
    >
      {text}
    </button>
  );
};

export const Navigation = ({ text, before, after, active, visited }) => {
  const context = useContext(StepContext);
  const { jumpToStep, steps } = context;
  const stepsArray = [...Array(steps.total).keys()].map(x => x + 1);

  return stepsArray.map(step => (
    <button
      key={step}
      onClick={() => jumpToStep(step)}
      disabled={steps.current === step}
      className={
        step === steps.current ? active : step < steps.current ? visited : null
      }
    >
      {text || `${before || ""}${step}${after || ""}`}
    </button>
  ));
};
