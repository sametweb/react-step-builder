import React from "react";
import { Steps, useSteps } from "./dist";

const App = () => {
	const { prev, next, progress, jump, total, current } = useSteps();

	return (
		<div className="steps_wrapper">
			<h1>React Step Builder v2.0.7</h1>
			<Steps>
				<div data-testid="step1">
					<h1>Step 1</h1>
					<p>This is Step 1.</p>
				</div>
				<div data-testid="step2">
					<h1>Step 2</h1>
					<p>This is Step 2.</p>
				</div>
				<div data-testid="step3">
					<h1>Step 3</h1>
					<p>This is Step 3.</p>
				</div>
				<div data-testid="step4">
					<h1>Step 4</h1>
					<p>This is Step 4.</p>
				</div>
			</Steps>
			<button data-testid="prev" onClick={prev}>
				Prev
			</button>
			<button data-testid="next" onClick={next}>
				Next
			</button>
			<button data-testid="jump" onClick={() => jump(3)}>
				Jump to Step 3
			</button>
			<div data-testid="total">Total: {total}</div>
			<div data-testid="current">Current: {current}</div>
			<div data-testid="progress">Progress: {progress * 100}%</div>
		</div>
	);
};

export default App;
