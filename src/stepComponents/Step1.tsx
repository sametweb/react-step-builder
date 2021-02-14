import React from "react";
import { StepComponentProps } from "../lib-ts";

const Step1 = (props: StepComponentProps) => {
	console.log({ props });
	return (
		<div className="step">
			First Name:{" "}
			<input
				name="firstname"
				data-testid="firstname"
				value={props.getState("firstname", "")}
				onChange={props.handleChange}
			/>
			Last Name:{" "}
			<input
				name="lastname"
				data-testid="lastname"
				value={props.getState("lastname", "")}
				onChange={props.handleChange}
			/>
			Over 18?{" "}
			<input
				type="checkbox"
				name="over18"
				data-testid="checkbox"
				checked={props.getState("over18", false)}
				onChange={props.handleChange}
			/>
			<span>
				<button
					data-testid="green"
					onClick={() => props.setState("color", "green")}
				>
					Green
				</button>
				<button
					data-testid="blue"
					onClick={() => props.setState("color", "blue")}
				>
					Blue
				</button>
			</span>
			{
				<>
					<button disabled={props.isFirst()} onClick={props.prev}>
						Previous
					</button>
					<button onClick={props.prev} data-testid="first-visible-prev">
						Visible Prev
					</button>
				</>
			}
			{props.hasNext() && <button onClick={props.next}>Next</button>}
			<button data-testid="jump3" onClick={() => props.jump(3)}>
				Jump to 3. Step
			</button>
			<button data-testid="jump5" onClick={() => props.jump(5)}>
				Jump to 5. Step
			</button>
		</div>
	);
};

export default Step1;
