import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { StepsProvider } from "./dist";
import App, { StepsComponent } from "./App";
import { act } from "react-dom/test-utils";

const calculateProgress = (current, total) =>
	Number(((current - 1) / (total - 1)).toFixed(2));

const onStepChange = jest.fn();

describe("Testing", () => {
	beforeEach(() => {
		render(
			<StepsProvider>
				<App />
			</StepsProvider>,
		);
	});

	it("Step1 renders on initial load", () => {
		const step1 = screen.getByTestId("step1");
		expect(step1).toBeVisible();
	});

	it("Clicking next button moves to the next step", () => {
		const nextButton = screen.getByTestId("next");
		nextButton.click();
		const step2 = screen.getByTestId("step2");
		expect(step2).toBeVisible();
	});

	it("Clicking prev button moves to the previous step", () => {
		const nextButton = screen.getByTestId("next");
		nextButton.click();
		const prevButton = screen.getByTestId("prev");
		prevButton.click();
		const step1 = screen.getByTestId("step1");
		expect(step1).toBeVisible();
	});

	it("Clicking jump 3 button jumps to the 3rd step", () => {
		const jumpButton = screen.getByTestId("jump");
		jumpButton.click();
		const step3 = screen.getByTestId("step3");
		expect(step3).toBeVisible();
	});

	it("Total count is correct", () => {
		const total = screen.getByTestId("total");
		expect(total).toHaveTextContent("Total: 4");
	});

	it("Current count updates correct", () => {
		const current = screen.getByTestId("current");
		const jumpButton = screen.getByTestId("jump");
		jumpButton.click();
		expect(current).toHaveTextContent("Current: 3");
	});

	it("Progress is correct", () => {
		const progress = screen.getByTestId("progress");
		expect(progress).toHaveTextContent("Progress: 0%");
	});

	it("Progress updates correctly", () => {
		const nextButton = screen.getByTestId("next");
		nextButton.click();
		const progressElement = screen.getByTestId("progress");
		const progress = calculateProgress(2, 4) * 100;
		expect(progressElement).toHaveTextContent(`Progress: ${progress}%`);
	});
});

describe("Methods through props", () => {
	beforeEach(() => {
		render(
			<StepsProvider>
				<StepsComponent onStepChange={onStepChange} />
			</StepsProvider>,
		);
	});
	it("onStepChange runs on every step change", () => {
		const nextButton = screen.getByTestId("next");
		act(() => {
			nextButton.click();
		});
		expect(onStepChange).toHaveBeenCalledTimes(1);
	});
});
