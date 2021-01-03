import React from "react";
import { Steps, Step, NavigationComponentProps } from "./lib-ts/index";
import Step1 from "./stepComponents/Step1";
import Step2 from "./stepComponents/Step2";
import Step3 from "./stepComponents/Step3";
import Step4 from "./stepComponents/Step4";

const Navigation = (props: NavigationComponentProps) => {
	console.log(props);
	return (
		<div>
			<button onClick={props.prev}>Previous</button>
			<button onClick={props.next}>Next</button>
		</div>
	);
};

const App = () => {
	return (
		<div className="steps_wrapper">
			<h1>React Step Builder v1.1.0</h1>
			<Steps
				config={{
					navigation: {
						component: Navigation,
						location: "before",
					},
				}}
			>
				<Step title="Hello" component={Step1} deneme={"deneme"} />
				<Step component={Step2} />
				<Step title="Contact Info" component={Step3} />
				<Step title="Overview" component={Step4} />
			</Steps>
		</div>
	);
};

export default App;
