import React from "react";
import { Steps, Step } from "./lib";

const Step1 = (props) => {
	return (
		<div className="step">
			First Name:{" "}
			<input
				name="firstname"
				data-testid="firstname"
				value={props.getState("firstname")}
				onChange={props.handleChange}
			/>
			Last Name:{" "}
			<input
				name="lastname"
				data-testid="lastname"
				value={props.getState("lastname")}
				onChange={props.handleChange}
			/>
			Over 18?{" "}
			<input
				type="checkbox"
				name="over18"
				data-testid="checkbox"
				checked={props.getState("over18")}
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
				<button disabled={props.step.isFirst()} onClick={props.prev}>
					Previous
				</button>
			}
			{props.step.hasNext() && <button onClick={props.next}>Next</button>}
			<button data-testid="jump3" onClick={() => props.jump(3)}>
				Jump to 3. Step
			</button>
			<button data-testid="jump5" onClick={() => props.jump(5)}>
				Jump to 5. Step
			</button>
		</div>
	);
};

const Step2 = (props) => {
	return (
		<div className="step">
			Email:{" "}
			<input
				name="email"
				data-testid="email"
				value={props.getState("email")}
				onChange={props.handleChange}
			/>
			Password:{" "}
			<input
				name="password"
				data-testid="password"
				value={props.getState("password")}
				onChange={props.handleChange}
			/>
			{props.step.hasPrev() && <button onClick={props.prev}>Previous</button>}
			{props.step.hasNext() && <button onClick={props.next}>Next</button>}
		</div>
	);
};

const Step3 = (props) => {
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

const Step4 = (props) => {
	return (
		<div className="step">
			<p>
				<strong>Name:</strong>
				<span data-testid="final_name">
					{props.getState("firstname")} {props.getState("lastname")}
				</span>
			</p>
			<p>
				<strong>Email:</strong>
				<span data-testid="final_email">{props.getState("email")}</span>
			</p>
			<p>
				<strong>Password:</strong>
				<span data-testid="final_pass">{props.getState("password")}</span>
			</p>
			<p>
				<strong>Address:</strong>
				<span data-testid="final_address">{props.getState("address")}</span>
			</p>
			<p>
				<strong>Phone:</strong>
				<span data-testid="final_phone">{props.getState("phone")}</span>
			</p>
			<p>
				<strong>Color Choice:</strong>
				<span data-testid="final_color">{props.getState("color")}</span>
			</p>
			{props.step.hasPrev() && <button onClick={props.prev}>Previous</button>}
			{
				<button
					data-testid="last-next"
					onClick={props.next}
					disabled={props.step.isLast()}
				>
					Next
				</button>
			}
			<div>
				{props.allSteps().map(({ order, title }) => (
					<p key={order}>
						<span data-testid={`order ${order}`}>{order}</span>{" "}
						<span data-testid={`title ${order}`}>{title}</span>
					</p>
				))}
			</div>
		</div>
	);
};

const App = () => {
	return (
		<div className="steps_wrapper">
			<h1>React Step Builder v1.1.0</h1>
			<Steps>
				<Step title="" component={Step1} />
				<Step title="Login Info" component={Step2} />
				<Step title="Contact Info" component={Step3} />
				<Step title="Overview" component={Step4} />
			</Steps>
		</div>
	);
};

export default App;
