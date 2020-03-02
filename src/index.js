import React from "react";
import ReactDOM from "react-dom";
import { Steps, Step, Button, Navigation } from "./lib";

import "./style.css";

const Step1 = props => {
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
    </div>
  );
};

const Step2 = props => {
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

const Step3 = props => {
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

const Step4 = props => {
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

const Persistent = () => {
  return (
    <div>
      <div className="navigation">
        <Button prev text="Prev" />
        <Navigation
          text="&#x25C9;"
          active="active-button"
          visited="visited-button"
        />
        <Button next text="Next" />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="steps_wrapper">
      <Steps total={4}>
        <h1>React Step Builder v1.1.0</h1>
        <Step order={1} component={Step1} />
        <Step order={2} component={Step2} />
        <Step order={3} component={Step3} />
        <Step order={4} component={Step4} />
        <Step persist component={Persistent} />
      </Steps>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
