import * as React from "react";

interface IStepsContext {
	current: number;
	size: number;
	isLast: boolean;
	isFirst: boolean;
	hasPrev: boolean;
	hasNext: boolean;
	progress: number;
	next: () => void;
	prev: () => void;
	jump: (step: number) => void;
	setSize: React.Dispatch<React.SetStateAction<number>>;
}

const StepsContext = React.createContext<IStepsContext>({
	current: 1,
	size: 0,
	isLast: false,
	isFirst: false,
	hasPrev: false,
	hasNext: false,
	progress: 0,
	next: () => {},
	prev: () => {},
	jump: () => {},
	setSize: () => {},
});

export const StepsProvider: React.ComponentType = ({ children }) => {
	const [current, setCurrent] = React.useState(1);
	const [size, setSize] = React.useState(0);

	const next = () => {
		const nextStep = current + 1;
		nextStep <= size && setCurrent(nextStep);
	};

	const prev = () => {
		const prevStep = current - 1;
		prevStep >= 1 && setCurrent(prevStep);
	};

	const jump = (step: number) => {
		step >= 1 && step <= size && setCurrent(step);
	};

	const isLast = current === size;
	const isFirst = current === 1;
	const hasPrev = current > 1;
	const hasNext = current < size;
	const progress = Number(((current - 1) / (size - 1)).toFixed(2));

	const contextValue = {
		current,
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
	};

	return (
		<StepsContext.Provider value={contextValue}>
			{children}
		</StepsContext.Provider>
	);
};

export const Steps: React.FC = (props) => {
	const stepsContext = React.useContext(StepsContext);
	const { current, setSize } = stepsContext;

	React.useEffect(() => {
		const size = React.Children.count(props.children);
		setSize(size);
	}, [props.children]);

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
