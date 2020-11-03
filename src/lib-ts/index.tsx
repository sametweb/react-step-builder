import React, { ComponentType, useContext, useEffect, useState } from "react";

type StateValue = string | number | boolean | bigint | symbol;

type State = {
	[key: string]: StateValue;
};

type StepsProps = {
	children: (StepProps[] | StepProps) & (JSX.Element[] | JSX.Element);
};

interface StepProps {
	title?: string;
	component: ComponentType<StepComponentProps>;

	beforeStepChange?: (data?: any) => any;
}

type AllSteps = { order: number; title?: string }[];
type OrderCheckFn = () => boolean;
type MoveFn = () => void;
type JumpFn = (step: number) => void;
type GetState = (key: keyof State) => State[keyof State];
type SetState = (key: keyof State, value: StateValue) => void;
type HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface StepComponentProps {
	order: number;
	title?: string;
	progress?: number;
	next?: MoveFn;
	prev?: MoveFn;
	jump?: JumpFn;
	isFirst?: OrderCheckFn;
	isLast?: OrderCheckFn;
	hasPrev?: OrderCheckFn;
	hasNext?: OrderCheckFn;
	allSteps?: AllSteps;
	state?: State;
	setState?: SetState;
	getState?: GetState;
	handleChange?: HandleChange;
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
	size: 0,
	current: 1,
	progress: 0,
	allSteps: [],
	state: {},
	handleChange: (event) => {},
	setState: (key, value) => {},
	getState: (key) => "",
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
			title: (child as StepProps).title || "Step " + (order + 1),
			order: order + 1,
		};
	});

	const size = childSteps.length;

	const [current, setCurrent] = useState<number>(1);
	const [stepState, setStepState] = useState<State>({});
	const [progress, setProgress] = useState<number>(current / size);

	useEffect(() => {
		setProgress(current / size);
	}, [current]);

	/**
	 * Moves to the next step.
	 */
	const next: MoveFn = () => {
		if (current < size) {
			setCurrent(current + 1);
		}
	};

	/**
	 * Moves to the previous step.
	 */
	const prev: MoveFn = () => {
		if (current > 1) {
			setCurrent(current - 1);
		}
	};

	/**
	 * Moves to the specified step.
	 */
	const jump: JumpFn = (step) => {
		if (step >= 1 && step <= size) {
			setCurrent(step);
		}
	};

	/**
	 * Fetches the state value of given key from state object. Returns empty string if it is not available.
	 */
	const getState: GetState = (key) => {
		if (!stepState[key]) stepState[key] = "";
		return stepState[key];
	};
	/**
	 * Updates the value of a given key in state object.
	 */
	const setState: SetState = (key, value) => {
		const newState = Object.assign({}, stepState);
		newState[key] = value;
		setStepState(newState);
	};

	const handleChange: HandleChange = (event) => {
		const key = event.currentTarget.name;
		const value =
			event.currentTarget.type === "checkbox"
				? event.currentTarget.checked
				: event.currentTarget.value;

		const newState = Object.assign({}, stepState);
		newState[key] = value;
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
export function Step<P extends StepProps>(
	{ title, component: Component, beforeStepChange }: StepProps,
	theRest: P,
) {
	const StepsContextValue: StepsContext = useContext(StepsContext);
	const { order }: StepContext = useContext(StepContext);

	const { size, current } = StepsContextValue;
	/**
	 * Checks if the component is the first step.
	 */
	const isFirst: OrderCheckFn = () => order === 1;
	/**
	 * Checks if the component is the last step.
	 */
	const isLast: OrderCheckFn = () => order === size;
	/**
	 * Checks if the component has a next step.
	 */
	const hasNext: OrderCheckFn = () => order < size;
	/**
	 * Checks if the component has a previous step.
	 */
	const hasPrev: OrderCheckFn = () => order > 1;

	useEffect(() => {
		return () => {
			current === order && beforeStepChange && beforeStepChange();
		};
	}, []);

	if (order === current) {
		return (
			<Component
				{...theRest}
				{...StepsContextValue}
				title={title}
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
