import * as React from "react";

type BeforeNextGuard = () => boolean | Promise<boolean>;

interface IStepsContext {
	current: number;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	size: number;
	setSize: React.Dispatch<React.SetStateAction<number>>;
	beforeNextRef: React.MutableRefObject<BeforeNextGuard | undefined>;
	isLast: boolean;
	isFirst: boolean;
	hasPrev: boolean;
	hasNext: boolean;
	progress: number;
	next: () => Promise<boolean>;
	prev: () => void;
	jump: (step: number) => void;
	reset: () => void;
}

const noop = () => {};
const noopRef = { current: undefined } as React.MutableRefObject<
	BeforeNextGuard | undefined
>;

const StepsContext = React.createContext<IStepsContext>({
	current: 1,
	setCurrent: noop,
	size: 0,
	setSize: noop,
	beforeNextRef: noopRef,
	isLast: false,
	isFirst: false,
	hasPrev: false,
	hasNext: false,
	progress: 0,
	next: () => Promise.resolve(false),
	prev: noop,
	jump: noop,
	reset: noop,
});

export const StepsProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [current, setCurrent] = React.useState(1);
	const [size, setSize] = React.useState(0);
	const beforeNextRef = React.useRef<BeforeNextGuard | undefined>(undefined);

	const next = async () => {
		const guard = beforeNextRef.current;
		if (guard) {
			const allowed = await guard();
			if (!allowed) return false;
		}
		const nextStep = current + 1;
		if (nextStep <= size) {
			setCurrent(nextStep);
			return true;
		}
		return false;
	};

	const prev = () => {
		const prevStep = current - 1;
		prevStep >= 1 && setCurrent(prevStep);
	};

	const jump = (step: number) => {
		step >= 1 && step <= size && setCurrent(step);
	};

	const reset = () => {
		setCurrent(1);
	};

	const isLast = current === size;
	const isFirst = current === 1;
	const hasPrev = current > 1;
	const hasNext = current < size;
	const progress =
		size <= 1 ? 0 : Number(((current - 1) / (size - 1)).toFixed(2));

	const contextValue = {
		current,
		setCurrent,
		size,
		setSize,
		beforeNextRef,
		isLast,
		isFirst,
		hasPrev,
		progress,
		next,
		prev,
		jump,
		reset,
		hasNext,
	};

	return (
		<StepsContext.Provider value={contextValue}>
			{children}
		</StepsContext.Provider>
	);
};

export interface StepChangeContext {
	from: number;
	to: number;
}

export interface StepsProps {
	children: React.ReactNode;
	onStepChange?: (context?: StepChangeContext) => void;
	beforeNext?: BeforeNextGuard;
	startsFrom?: number;
}

export const Steps: React.FC<StepsProps> = (props) => {
	const stepsContext = React.useContext(StepsContext);
	const { current, setCurrent, setSize, beforeNextRef } = stepsContext;
	const [isInitialRender, setIsInitialRender] = React.useState(true);
	const prevStepRef = React.useRef(current);

	// Register the beforeNext guard into context
	React.useEffect(() => {
		beforeNextRef.current = props.beforeNext;
	}, [props.beforeNext]);

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
		prevStepRef.current = startsFrom;
	}, []);

	React.useEffect(() => {
		const size = React.Children.count(props.children);
		setSize(size);
	}, [props.children]);

	React.useEffect(() => {
		if (!isInitialRender) {
			props.onStepChange?.({ from: prevStepRef.current, to: current });
		}
		prevStepRef.current = current;
	}, [current]);

	const steps = React.Children.map(props.children, (child, index) => {
		const step = index + 1;
		const stepsChild = React.cloneElement(child as React.ReactElement<any>);
		return current === step && stepsChild;
	});

	return <>{steps}</>;
};

export const useSteps = () => {
	const stepsContext = React.useContext(StepsContext);

	const {
		prev,
		next,
		jump,
		reset,
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
		reset,
		isFirst,
		isLast,
		hasPrev,
		hasNext,
		progress,
		total,
		current,
	};
};
