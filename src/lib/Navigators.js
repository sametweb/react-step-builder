import React, { useContext } from "react";
import { StepContext } from "./Steps";

export const Button = ({ next, prev, text, ...theRest }) => {
  const context = useContext(StepContext);
  const { prevStep, nextStep, steps, locks } = context;

  return (prev && steps.current === 1) ||
    (next && steps.current === steps.total) ? null : (
    <button
      onClick={next ? nextStep : prev ? prevStep : null}
      disabled={
        next && locks.filter(item => item.step === steps.current + 1)[0].locked
      }
      {...theRest}
    >
      {text}
    </button>
  );
};

export const Navigation = ({ text, before, after }) => {
  const context = useContext(StepContext);
  const { jumpToStep, steps, locks } = context;
  const stepsArray = [...Array(steps.total).keys()].map(x => x + 1);

  return stepsArray.map(step => {
    return (
      <button
        key={step}
        onClick={() => jumpToStep(step)}
        disabled={locks.filter(item => item.step === step)[0].locked} //steps.current === step ||
      >
        {text || `${before || ""}${step}${after || ""}`}
      </button>
    );
  });
};
