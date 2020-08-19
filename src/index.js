import React from "react";
import ReactDOM from "react-dom";
import { Steps, Step } from "./lib";

import "./style.css";

const Step1 = (props) => {
  console.log(props);
  return (
    <div className="step">
      First Name: <input name="firstname" onChange={props.handleChange} />
      Last Name: <input name="lastname" onChange={props.handleChange} />
      <span>
        <a onClick={() => props.setState("color", "green")}>Green</a> -{" "}
        <a onClick={() => props.setState("color", "blue")}>Blue</a>
      </span>
      <button onClick={props.prev} disabled={!props.prev_step}>
        Previous
      </button>
      <button onClick={props.next}>Next</button>
    </div>
  );
};

const Step2 = (props) => {
  console.log(props);
  return (
    <div className="step">
      Email: <input name="email" onChange={props.handleChange} />
      Password: <input name="password" onChange={props.handleChange} />
      <button onClick={props.next}>Next</button>
    </div>
  );
};

const Step3 = (props) => {
  console.log(props);
  return (
    <div className="step">
      Address: <input name="address" onChange={props.handleChange} />
      Phone: <input name="phone" onChange={props.handleChange} />
      <button onClick={props.next}>Next</button>
    </div>
  );
};

const Step4 = (props) => {
  console.log(props);
  return (
    <div className="step">
      <p>
        <strong>Name:</strong>
      </p>
      <p>
        <strong>Email:</strong>
      </p>
      <p>
        <strong>Password:</strong>
      </p>
      <p>
        <strong>Address:</strong>
      </p>
      <p>
        <strong>Phone:</strong>
      </p>
    </div>
  );
};

const App = () => {
  return (
    <div className="steps_wrapper">
      <h1>React Step Builder v1.1.0</h1>
      <Steps name="This is the registration step">
        <Step title="" component={Step1} />
        <Step title="Login Info" component={Step2} />
        <Step title="Contact Info" component={Step3} />
        <Step title="Overview" component={Step4} />
      </Steps>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
