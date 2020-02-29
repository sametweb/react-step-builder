import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Steps, Step, Button, Navigation } from "./lib";

import "./style.css";

const Step1 = props => {
  const { firstname, lastname } = props.mainState;
  console.log(props.locks);
  useEffect(() => {
    if (props.mainState.firstname && props.mainState.lastname) {
      props.unlockNextStep();
    } else {
      props.lockNextStep();
    }
  }, [firstname, lastname]);

  return (
    <div>
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
  const { email, password } = props.mainState;
  console.log(props.locks);
  useEffect(() => {
    if (props.mainState.email && props.mainState.password) {
      props.unlockNextStep();
    } else {
      props.lockNextStep();
    }
  }, [email, password]);

  return (
    <div>
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
  const { address, phone } = props.mainState;
  console.log(props.locks);
  useEffect(() => {
    if (props.mainState.address && props.mainState.phone) {
      props.unlockNextStep();
    } else {
      props.lockNextStep();
    }
  }, [address, phone]);

  return (
    <div>
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
    <div>
      <p>
        Name: {props.mainState.firstname} {props.mainState.lastname}
      </p>
      <p>Email: {props.mainState.email}</p>
      <p>Password: {props.mainState.password}</p>
      <p>Address: {props.mainState.address}</p>
      <p>Phone: {props.mainState.phone}</p>
    </div>
  );
};

const Persistent = () => {
  return (
    <div>
      <Button prev text="Prev" />
      <Button next text="Next" />
      <Navigation before="This is " after=". step" />
    </div>
  );
};

const App = () => {
  return (
    <div className="steps_wrapper">
      <Steps totalSteps={4} lockMode>
        <h1>React Step Builder</h1>
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
