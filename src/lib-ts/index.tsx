import * as React from "react";

interface IStepsContext {
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	size: number;
	setSize: React.Dispatch<React.SetStateAction<number>>;
	isLast: boolean;
	isFirst: boolean;
	hasPrev: boolean;
	hasNext: boolean;
	progress: number;
	next: () => void;
	prev: () => void;
	jump: (step: number) => void;
}

const StepsContext = React.createContext<IStepsContext>({
	current: 1,
	setCurrent: () => {},
	size: 0,
	setSize: () => {},
	isLast: false,
	isFirst: false,
	hasPrev: false,
	hasNext: false,
	progress: 0,
	next: () => {},
	prev: () => {},
	jump: () => {},
});

export const StepsProvider: React.ComponentType = ({ children }) => {
	const [current, setCurrent] = React.useState(1);
	const [size, setSize] = React.useState(0);

	const next = React.useCallback(() => {
		const nextStep = current + 1;
		nextStep <= size && setCurrent(nextStep);
	}, [current, size]);

	const prev = React.useCallback(() => {
		const prevStep = current - 1;
		prevStep >= 1 && setCurrent(prevStep);
	}, [current]);

	const jump = React.useCallback(
		(step: number) => {
			step >= 1 && step <= size && setCurrent(step);
		},
		[size],
	);

	const isLast = current === size;
	const isFirst = current === 1;
	const hasPrev = current > 1;
	const hasNext = current < size;
	const progress = Number(((current - 1) / (size - 1)).toFixed(2));

	const contextValue = React.useMemo(
		() => ({
			current,
			setCurrent,
			size,
			setSize,
			isLast,
			isFirst,
			hasPrev,
			progress,
			next,
			prev,
			jump,
			hasNext,
		}),
		[
			current,
			hasNext,
			hasPrev,
			isFirst,
			isLast,
			jump,
			next,
			prev,
			progress,
			size,
		],
	);

	return (
		<StepsContext.Provider value={contextValue}>
			{children}
		</StepsContext.Provider>
	);
};

export interface StepsProps {
	onStepChange?: () => void;
	startsFrom?: number;
}

export const Steps: React.ComponentType<StepsProps> = (props) => {
	const stepsContext = React.useContext(StepsContext);
	const { current, setCurrent, setSize } = stepsContext;
	const [isInitialRender, setIsInitialRender] = React.useState(true);

	React.useEffect(() => {
		setIsInitialRender(false);
		const { startsFrom = 1 } = props;
		const size = React.Children.count(props.children);
		if (startsFrom > size) {
			setCurrent(1);
			console.warn(
				"React Step Builder: startsFrom is greater than the number of steps. First step will be rendered by default.",
			);
		} else {
			setCurrent(startsFrom);
		}
	}, [props, setCurrent]);

	React.useEffect(() => {
		const size = React.Children.count(props.children);
		setSize(size);
	}, [props.children, setSize]);

	React.useEffect(() => {
		!isInitialRender && props.onStepChange?.();
	}, [current, isInitialRender, props]);

	const steps = React.Children.map(props.children, (child, index) => {
		const step = index + 1;
		const stepsChild = React.cloneElement(child as React.ReactElement<any>);
		return current === step && stepsChild;
	});

	return <>{steps}</>;
};

export const useSteps = () => {
	const stepsContext = React.useContext(StepsContext);
	if (!stepsContext) throw new Error("step context is not available");

	const {
		prev,
		next,
		jump,
		isFirst,
		isLast,
		hasPrev,
		hasNext,
		progress,
		size: total,
		current,
	} = stepsContext;
	return {
		prev,
		next,
		jump,
		isFirst,
		isLast,
		hasPrev,
		hasNext,
		progress,
		total,
		current,
	};
};
