import React from "react";

export default (props) => {
	console.log(props);
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
			{props.hasPrev() && <button onClick={props.prev}>Previous</button>}
			{
				<button
					data-testid="last-next"
					onClick={props.next}
					disabled={props.isLast()}
				>
					Next
				</button>
			}
			<div>
				{props.allSteps.map(({ order, title }) => (
					<p key={order}>
						<span data-testid={`order ${order}`}>{order}</span>{" "}
						<span data-testid={`title ${order}`}>{title}</span>
					</p>
				))}
			</div>
		</div>
	);
};
