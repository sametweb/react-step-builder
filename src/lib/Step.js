import React from "react";
import { StepContext } from "./Steps";

const Step = ({ component: Component, order, persist }) => {
  const context = React.useContext(StepContext);

  if (order === context.steps.current || persist) {
    return <Component {...context} />;
  }
  return false;
};

export default Step;
