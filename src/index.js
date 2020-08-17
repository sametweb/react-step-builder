import React from "react";
import ReactDOM from "react-dom";
import { Steps, Step } from "./lib";

import "./style.css";

const Step1 = (props) => {
  console.log({ props });
  return (
    <div className="step">
      First Name:{" "}
      <input
        name="firstname"
        value={props.mainState.firstname || ""}
        onChange={props.handleChange}
      />
      Last Name:{" "}
      <input
        name="lastname"
        value={props.mainState.lastname || ""}
        onChange={props.handleChange}
      />
      <button onClick={props.nextStep}>Next</button>
    </div>
  );
};

const Step2 = (props) => {
  console.log({ props });
  return (
    <div className="step">
      Email:{" "}
      <input
        name="email"
        value={props.mainState.email || ""}
        onChange={props.handleChange}
      />
      Password:{" "}
      <input
        name="password"
        value={props.mainState.password || ""}
        onChange={props.handleChange}
      />
    </div>
  );
};

const Step3 = (props) => {
  return (
    <div className="step">
      Address:{" "}
      <input
        name="address"
        value={props.mainState.address || ""}
        onChange={props.handleChange}
      />
      Phone:{" "}
      <input
        name="phone"
        value={props.mainState.phone || ""}
        onChange={props.handleChange}
      />
    </div>
  );
};

const Step4 = (props) => {
  return (
    <div className="step">
      <p>
        <strong>Name:</strong> {props.mainState.firstname}{" "}
        {props.mainState.lastname}
      </p>
      <p>
        <strong>Email:</strong> {props.mainState.email}
      </p>
      <p>
        <strong>Password:</strong> {props.mainState.password}
      </p>
      <p>
        <strong>Address:</strong> {props.mainState.address}
      </p>
      <p>
        <strong>Phone:</strong> {props.mainState.phone}
      </p>
    </div>
  );
};

const App = () => {
  return (
    <div className="steps_wrapper">
      <h1>React Step Builder v1.1.0</h1>
      <Steps total={4}>
        <Step title="Personal Info" component={Step1} />
        <Step title="Login Info" component={Step2} />
        <Step title="Contact Info" component={Step3} />
        <Step title="Overview" component={Step4} />
      </Steps>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
