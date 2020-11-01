import React from "react";

export default (props) => {
	console.log(props);
	return (
		<div className="step">
			Address:{" "}
			<input
				name="address"
				data-testid="address"
				value={props.getState("address")}
				onChange={props.handleChange}
			/>
			Phone:{" "}
			<input
				name="phone"
				data-testid="phone"
				value={props.getState("phone")}
				onChange={props.handleChange}
			/>
			{props.step.hasPrev() && <button onClick={props.prev}>Previous</button>}
			{props.step.hasNext() && <button onClick={props.next}>Next</button>}
		</div>
	);
};
