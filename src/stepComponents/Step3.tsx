import React from "react";
import { StepComponentProps } from "../dist";

const Step3 = (props: StepComponentProps) => {
	return (
		<div className="step">
			Address:{" "}
			<input
				name="address"
				data-testid="address"
				value={props.getState("address", "")}
				onChange={props.handleChange}
			/>
			Phone:{" "}
			<input
				name="phone"
				data-testid="phone"
				value={props.getState("phone", "")}
				onChange={props.handleChange}
			/>
			{props.hasPrev() && <button onClick={props.prev}>Previous</button>}
			{props.hasNext() && <button onClick={props.next}>Next</button>}
		</div>
	);
};

export default Step3;
