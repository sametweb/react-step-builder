/* eslint-disable import/first */
import React, {
	ComponentType,
	DetailedHTMLProps,
	InputHTMLAttributes,
	ReactElement,
	useContext,
	useEffect,
	useState,
} from "react";

type InputValue = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>["value"];

type CheckboxValue = DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>["checked"];

interface State {
	[key: string]: InputValue | CheckboxValue;
}

type StepsProps = {
	children: ReactElement<StepProps> | ReactElement<StepProps>[];
};

type BeforeStepChange = (...data: any[]) => any;

interface StepProps {
	title?: string;
	/** Component to be rendered as a step */
	component: ComponentType<StepComponentProps>;
	/** A callback function to run before step change occurs */
	beforeStepChange?: BeforeStepChange;
}

type EventType = React.ChangeEvent<HTMLInputElement> &
	React.ChangeEvent<HTMLTextAreaElement>;

type AllSteps = { order: number; title?: string }[];
type OrderCheckFn = () => boolean;
type MoveFn = () => void;
type JumpFn = (step: number) => void;
type GetState = (key: keyof State, defaultValue: State[keyof State]) => any;
type SetState = (key: keyof State, value: State[keyof State]) => void;
type HandleChange = (event: EventType) => void;

export interface StepComponentProps {
	/** Order number of the current step component */
	order: number;
	/** Title of the current step component */
	title: string;
	/** Progress of current component, value between 0 and 1 */
	progress: number;
	/** Function to move to the next step */
	next: MoveFn;
	/** Function to move to the previous step */
	prev: MoveFn;
	/** Function to jump to the given step */
	jump: JumpFn;
	/** Function to check if the step is the first */
	isFirst: OrderCheckFn;
	/** Function to check if the step is the last */
	isLast: OrderCheckFn;
	/** Function to check if the step has any previous step*/
	hasPrev: OrderCheckFn;
	/** Function to check if the step has any next step*/
	hasNext: OrderCheckFn;
	/** Array of all available steps' title and order number*/
	allSteps: AllSteps;
	/** Combined state value of all steps */
	state: State;
	/** Function to set/update state by key */
	setState: SetState;
	/** Function to retrieve a state value by key */
	getState: GetState;
	/** `onChange` event handler for form elements */
	handleChange: HandleChange;
}

interface StepsContext {
	size: number;
	current: number;
	progress: number;
	allSteps: AllSteps;
	state: State;
	handleChange: HandleChange;
	setState: SetState;
	getState: GetState;
	next: MoveFn;
	prev: MoveFn;
	jump: JumpFn;
}

interface StepContext {
	order: number;
}

const StepsContext = React.createContext<StepsContext>({
	// Dummy values for satisfying the type checker
	// Gets updated before being passed down
	size: 0,
	current: 1,
	progress: 0,
	allSteps: [],
	state: {},
	handleChange: (event) => {},
	setState: (key, value) => {},
	getState: (key, defaultValue) => {},
	next: () => {},
	prev: () => {},
	jump: (id) => {},
});

const StepContext = React.createContext<StepContext>({ order: 0 });

/**
 * Wrapper component for `Step` components.
 */
export function Steps({ children }: StepsProps) {
	const childSteps = React.Children.toArray(children);

	const allSteps: AllSteps = childSteps.map((child, order) => {
		return {
			title:
				(child as { props: StepProps }).props.title || "Step " + (order + 1),
			order: order + 1,
		};
	});

	const size = childSteps.length;

	const _current = useState<number>(1);
	const current = _current[0];
	const setCurrent = _current[1];

	const _stepState = useState<State>({});
	const stepState = _stepState[0];
	const setStepState = _stepState[1];

	const _progress = useState<number>(0);
	const progress = _progress[0];
	const setProgress = _progress[1];

	useEffect(() => {
		if (current === 1) setProgress(0);
		else if (current === size) setProgress(1);
		else setProgress((current - 1) / (size - 1));
	}, [current, setProgress, size]);

	const next: MoveFn = () => {
		if (current < size) {
			setCurrent(current + 1);
		}
	};

	const prev: MoveFn = () => {
		if (current > 1) {
			setCurrent(current - 1);
		}
	};

	const jump: JumpFn = (step) => {
		if (step >= 1 && step <= size) {
			setCurrent(step);
		}
	};

	const getState: GetState = (key, defaultValue) => {
		if (key in stepState) {
			return stepState[key];
		}
		return defaultValue;
	};

	const setState: SetState = (key, value) => {
		const newState = Object.assign({}, stepState);
		newState[key] = value;
		setStepState(newState);
	};

	const handleChange: HandleChange = (event) => {
		const key = event.currentTarget.name;
		const inputType = event.currentTarget.type;
		const value =
			inputType === "checkbox"
				? event.currentTarget.checked
				: event.currentTarget.value;

		const newState = Object.assign({}, stepState);
		newState[key] = value as InputValue & CheckboxValue;
		setStepState(newState);
	};

	const context = {
		size,
		current,
		progress,
		allSteps,
		state: stepState,
		handleChange,
		setState,
		getState,
		next,
		prev,
		jump,
	};

	return (
		<StepsContext.Provider value={context}>
			{React.Children.map(children, (child, order) => (
				<StepContext.Provider value={{ order: order + 1 }}>
					{child}
				</StepContext.Provider>
			))}
		</StepsContext.Provider>
	);
}

/**
 * Wrapper component for each individual step.
 */
export function Step<T extends StepProps>(props: T) {
	const { order }: StepContext = useContext(StepContext);
	const { title, component: Component, beforeStepChange } = props;
	const stepsContextValue: StepsContext = useContext(StepsContext);

	const { size, current } = stepsContextValue;

	const isFirst: OrderCheckFn = () => order === 1;
	const isLast: OrderCheckFn = () => order === size;
	const hasNext: OrderCheckFn = () => order < size;
	const hasPrev: OrderCheckFn = () => order > 1;

	useEffect(() => {
		return () => {
			if (current === order && beforeStepChange) beforeStepChange();
		};
	}, [current, order, beforeStepChange]);

	if (order === current) {
		const newProps: Partial<StepProps> = Object.assign({}, props);
		delete newProps.component;

		const defaultTitle = "Step " + order;

		return (
			<Component
				{...newProps}
				{...stepsContextValue}
				title={title || defaultTitle}
				order={order}
				hasPrev={hasPrev}
				hasNext={hasNext}
				isFirst={isFirst}
				isLast={isLast}
			/>
		);
	}

	return null;
}
