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
