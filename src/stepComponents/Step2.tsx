import React from "react";
import { StepComponentProps } from "../dist";

const Step2 = (props: StepComponentProps) => {
	return (
		<div className="step">
			Email:{" "}
			<input
				name="email"
				data-testid="email"
				value={props.getState("email", "")}
				onChange={props.handleChange}
			/>
			Password:{" "}
			<input
				name="password"
				data-testid="password"
				value={props.getState("password", "")}
				onChange={props.handleChange}
			/>
			{props.hasPrev() && <button onClick={props.prev}>Previous</button>}
			{props.hasNext() && <button onClick={props.next}>Next</button>}
		</div>
	);
};

export default Step2;
