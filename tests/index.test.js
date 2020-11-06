import React from "react";
import TestRenderer from "react-test-renderer";

// react-step-builder wrapper components
import { Steps, Step } from "../src/lib/index";

// Step Components
import Step1 from "../src/stepComponents/Step1";
import Step2 from "../src/stepComponents/Step2";
import Step3 from "../src/stepComponents/Step3";
import Step4 from "../src/stepComponents/Step4";

// Sample beforeStepChange function
const beforeStepChange = jest.fn(() => "");

// render a test tree
const stepsTree = TestRenderer.create(
	<Steps>
		<Step component={Step1} title="My First Step" />
		<Step component={Step2} beforeStepChange={beforeStepChange} />
		<Step component={Step3} />
		<Step component={Step4} randomProp="test" />
	</Steps>,
).root;

test("Props have all properties", () => {
	const props = stepsTree.findByType(Step1).props;

	expect(props).toHaveProperty(
		"title",
		"order",
		"progress",
		"next",
		"prev",
		"jump",
		"isFirst",
		"isLast",
		"hasPrev",
		"hasNext",
		"allSteps",
		"state",
		"setState",
		"getState",
		"handleChange",
	);
	expect(props.title).toBe("My First Step");
	expect(props.order).toBe(1);
	expect(props.progress).toBe(0);
});

test("next / prev / jump functionality", () => {
	test.todo("buttons enabled/disabled");
	test.todo("next/prev click");
});

test("state update", () => {
	test.todo("type in an input");
	test.todo("select a checkbox");
	test.todo("manual setState check");
});

test("arbitrary prop passing from Step to step component", () => {
	test.todo("Step4 prop.randomProp");
});

test("beforeStepChange runs before step switch", () => {
	test.todo("Switch from Step2 to another step");
});
