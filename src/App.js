import React from "react";
import { Steps, Step } from "./lib";

const Step1 = (props) => {
  // Test Change 4
  console.log(props);
  return (
    <div className="step">
      First Name:{" "}
      <input
        name="firstname"
        value={props.getState("firstname")}
        onChange={props.handleChange}
      />
      Last Name:{" "}
      <input
        name="lastname"
        value={props.getState("lastname")}
        onChange={props.handleChange}
      />
      <span>
        <button onClick={() => props.setState("color", "green")}>Green</button>
        <button onClick={() => props.setState("color", "blue")}>Blue</button>
      </span>
      {props.step.hasPrev() && <button onClick={props.prev}>Previous</button>}
      {props.step.hasNext() && <button onClick={props.next}>Next</button>}
      <button onClick={() => props.jump(3)}>Jump to 3. Step</button>
      <button onClick={() => props.jump(5)}>Jump to 5. Step</button>
    </div>
  );
};

const Step2 = (props) => {
  return (
    <div className="step">
      Email:{" "}
      <input
        name="email"
        value={props.getState("email")}
        onChange={props.handleChange}
      />
      Password:{" "}
      <input
        name="password"
        value={props.getState("password")}
        onChange={props.handleChange}
      />
      {props.step.hasPrev() && <button onClick={props.prev}>Previous</button>}
      {props.step.hasNext() && <button onClick={props.next}>Next</button>}
    </div>
  );
};

const Step3 = (props) => {
  return (
    <div className="step">
      Address:{" "}
      <input
        name="address"
        value={props.getState("address")}
        onChange={props.handleChange}
      />
      Phone:{" "}
      <input
        name="phone"
        value={props.getState("phone")}
        onChange={props.handleChange}
      />
      {props.step.hasPrev() && <button onClick={props.prev}>Previous</button>}
      {props.step.hasNext() && <button onClick={props.next}>Next</button>}
    </div>
  );
};

const Step4 = (props) => {
  return (
    <div className="step">
      <p>
        <strong>Name:</strong> {props.getState("firstname")}{" "}
        {props.getState("lastname")}
      </p>
      <p>
        <strong>Email:</strong> {props.getState("email")}
      </p>
      <p>
        <strong>Password:</strong> {props.getState("password")}
      </p>
      <p>
        <strong>Address:</strong> {props.getState("address")}
      </p>
      <p>
        <strong>Phone:</strong> {props.getState("phone")}
      </p>
      <p>
        <strong>Color Choice:</strong> {props.getState("color")}
      </p>
      {props.step.hasPrev() && <button onClick={props.prev}>Previous</button>}
      {props.step.hasNext() && <button onClick={props.next}>Next</button>}
    </div>
  );
};

const App = () => {
  return (
    <div className="steps_wrapper">
      <h1>React Step Builder v1.1.0</h1>
      <Steps>
        <Step title="" component={Step1} />
        <Step title="Login Info" component={Step2} />
        <Step title="Contact Info" component={Step3} />
        <Step title="Overview" component={Step4} />
      </Steps>
    </div>
  );
};

export default App;
