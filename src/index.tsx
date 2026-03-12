import ReactDOM from "react-dom";
import App from "./App";
import { StepsProvider } from "./lib-ts";
import "./style.css";
ReactDOM.render(
	<StepsProvider>
		<App />
	</StepsProvider>,
	document.querySelector("#root"),
);
