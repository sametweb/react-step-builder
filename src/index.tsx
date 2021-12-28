import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StepsProvider } from "./dist";
import "./style.css";
ReactDOM.render(
	<StepsProvider>
		<App />
	</StepsProvider>,
	document.querySelector("#root"),
);
