import * as React from "react";
import { StepBuilder } from "./StepBuilder";

var defaultContext = {
	state: {},
	title: "",
	beforeStepChange: () => {},
	setState: () => {},
	getState: () => {},
	handleChange: () => {},
	next: () => {},
	prev: () => {},
	jump: () => {},
	allSteps: () => [],
	current: 0,
	step: {
		order: 0,
		title: "",
		nextStep: 0,
		prevStep: 0,
		progress: 0,
		hasPrev: () => false,
		hasNext: () => false,
		isFirst: () => false,
		isLast: () => false,
	},
};
var StepContext = React.createContext<StepProps>(defaultContext);

type state = { [key: string]: any };

type SetStepState = (key: keyof state, value: any) => void;
type GetStepState = (key: keyof state) => state[keyof state];
type HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
type UseStepStateReturnType = [state, SetStepState, GetStepState, HandleChange];

type StepData = {
	order: number;
	title: string;
	nextStep: number;
	prevStep: number;
	hasNext: () => boolean;
	hasPrev: () => boolean;
	isFirst: () => boolean;
	isLast: () => boolean;
};
export type StepProps = {
	title?: string;
	beforeStepChange?: () => any;
	state: state;
	step: StepData;
	current: number;
	next: () => void;
	prev: () => void;
	jump: (step: number) => void;
	getState: GetStepState;
	setState: SetStepState;
	handleChange: HandleChange;
	allSteps: () => Array<{ order: number; title: String }>;
};
interface StepParams {
	title?: string;
	component: React.FunctionComponent<StepProps>;
	beforeStepChange?: () => any;
}

function useStepState(INITIAL_VALUE: state): UseStepStateReturnType {
	var myState = React.useState(INITIAL_VALUE);
	var state = myState[0];
	var setState = myState[1];

	/**
	 * Stores data in state with the provided key.
	 */
	let setStepState: SetStepState = function (key, value) {
		var new_state = JSON.parse(JSON.stringify(state));
		new_state[key] = value;
		setState(new_state);
	};

	/**
	 * Returns the data from state for the provided key.
	 */
	let getStepState: GetStepState = function (key) {
		if (!state[key]) {
			state[key] = "";
		}
		return state[key];
	};

	/**
	 * Handler method for syntetic React events. Can be provided as a callback function to 'onChange' property of form elements.
	 */
	let handleChange: HandleChange = function (event) {
		var key = event.target.name,
			value =
				event.target.type === "checkbox"
					? event.target.checked
					: event.target.value;

		var new_state = JSON.parse(JSON.stringify(state));
		new_state[key] = value;
		setState(new_state);
	};

	return [state, setStepState, getStepState, handleChange];
}

/**
 * This is a higher order component that returns your step component
 * with global state of the steps and helper methods.
 */
export function Step(props: StepParams) {
	var Component: React.FunctionComponent<StepProps> = props.component,
		title = props.title,
		beforeStepChange = props.beforeStepChange;

	var context = React.useContext(StepContext);
	context.title = title;
	context.beforeStepChange = beforeStepChange;

	React.useEffect(() => {
		return () => {
			if (context.current === context.step.order && beforeStepChange)
				beforeStepChange();
		};
	}, [context.current, context.step.order, beforeStepChange]);

	if (context.current === context.step.order) {
		return (
			<Component {...context} current={context.current} step={context.step} />
		);
	}
	return null;
}

/**
 * Wrapper component for Step components.
 * @summary Step components must be wrapped in `<Steps />` component
 * @example
 *   <Steps>
 *     <Step title="My first step" component={Step1} />
 *     <Step title="My second step" component={Step2} />
 *   </Steps>
 */

interface StepsProps {
	children: JSX.Element[];
}

export function Steps({ children }: StepsProps) {
	var mySteps = React.useState(StepBuilder()),
		steps = mySteps[0],
		setSteps = mySteps[1];

	var myStepState = useStepState({}),
		state = myStepState[0],
		set = myStepState[1],
		get = myStepState[2],
		handleChange = myStepState[3];

	var myCurrent = React.useState(1),
		current = myCurrent[0],
		setCurrent = myCurrent[1];

	var stepTitles = children.map(function (step, order) {
		return step.props.title;
	});

	var stepDataCollection = steps.build(stepTitles);

	/**
	 * Moves to the next step
	 */
	function next() {
		var nextStep = steps.next();
		setSteps(steps);
		setCurrent(nextStep);
	}

	/**
	 * Moves to the previous step
	 */
	function prev() {
		var prevStep = steps.prev();
		setSteps(steps);
		setCurrent(prevStep);
	}

	/**
	 * Moves to the step with provided step order
	 */
	function jump(step: number) {
		var jumpedStep = steps.jump(step);
		setSteps(steps);
		setCurrent(jumpedStep);
	}

	/**
	 * Returns an array of all steps with order and title property
	 */
	interface StepNodesType {
		order: number;
		title: string;
	}
	function allSteps() {
		return stepDataCollection.map(({ order, title }: StepNodesType) => ({
			order,
			title,
		}));
	}

	children = children.map(function (child, id) {
		var new_child = Object.assign({}, child);
		new_child.props = Object.assign({}, child.props);
		new_child.props.step = stepDataCollection[id];
		new_child.props.current = current;
		new_child.props.step.progress = current / children.length;
		return new_child;
	});

	var value = {
		current: current,
		state: state,
		setState: set,
		getState: get,
		handleChange,
		next,
		prev,
		jump,
		allSteps,
		step: stepDataCollection[current - 1],
	};

	return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
