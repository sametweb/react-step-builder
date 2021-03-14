import React from "react";
import {
	Steps,
	Step,
	NavigationComponentProps,
	StepsConfig,
} from "./lib-ts/index";
import Step1 from "./stepComponents/Step1";
import Step2 from "./stepComponents/Step2";
import Step3 from "./stepComponents/Step3";
import Step4 from "./stepComponents/Step4";

export const Navigation = (props: NavigationComponentProps) => {
	console.log({ navProps: props });
	return (
		<div>
			<button data-testid="global-prev" onClick={props.prev}>
				Global Previous
			</button>
			<button data-testid="global-next" onClick={props.next}>
				Global Next
			</button>
		</div>
	);
};

const App = () => {
	const config: StepsConfig = {
		before: (props) => <Navigation {...props} test="test" />,
		after: Navigation,
		navigation: {
			component: Navigation,
			location: "before",
		},
	};
	return (
		<div className="steps_wrapper">
			<h1>React Step Builder v2.0.7</h1>
			<Steps config={config}>
				<Step title="Hello" component={Step1} deneme={"deneme"} />
				<Step component={Step2} />
				<Step title="Contact Info" component={Step3} />
				<Step title="Overview" component={Step4} />
			</Steps>
		</div>
	);
};

export default App;
