import React from "react";
import { Steps, Step } from "./lib";
import Step1 from "./stepComponents/Step1";
import Step2 from "./stepComponents/Step2";
import Step3 from "./stepComponents/Step3";
import Step4 from "./stepComponents/Step4";

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
