import React from "react";
import ReactDOM from "react-dom";
import { Steps, Step } from "./lib";

const Step1 = () => <div>Step1</div>;

const Step2 = () => <div>Step2</div>;

const Step3 = () => <div>Step3</div>;

const Persistent = props => {
  return (
    <div>
      <button onClick={() => props.prevStep()}>Previous Step</button>
      <button onClick={() => props.nextStep()}>Next Step</button> Persistent
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Steps totalSteps={3}>
        <Step order={1} component={Step1} />
        <Step order={2} component={Step2} />
        <Step order={3} component={Step3} />
        <Step persist component={Persistent} />
      </Steps>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
