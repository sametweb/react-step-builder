import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { StepsProvider } from "./dist";
import App from "./App";

const calculateProgress = (current, total) =>
	Number(((current - 1) / (total - 1)).toFixed(2));

beforeEach(() => {
	render(
		<StepsProvider>
			<App />
		</StepsProvider>,
	);
});

describe("Testing", () => {
	test("Step1 renders on initial load", () => {
		const step1 = screen.getByTestId("step1");
		expect(step1).toBeVisible();
	});

	test("Clicking next button moves to the next step", () => {
		const nextButton = screen.getByTestId("next");
		nextButton.click();
		const step2 = screen.getByTestId("step2");
		expect(step2).toBeVisible();
	});

	test("Clicking prev button moves to the previous step", () => {
		const nextButton = screen.getByTestId("next");
		nextButton.click();
		const prevButton = screen.getByTestId("prev");
		prevButton.click();
		const step1 = screen.getByTestId("step1");
		expect(step1).toBeVisible();
	});

	test("Clicking jump 3 button jumps to the 3rd step", () => {
		const jumpButton = screen.getByTestId("jump");
		jumpButton.click();
		const step3 = screen.getByTestId("step3");
		expect(step3).toBeVisible();
	});

	test("Total count is correct", () => {
		const total = screen.getByTestId("total");
		expect(total).toHaveTextContent("Total: 4");
	});

	test("Current count updates correct", () => {
		const current = screen.getByTestId("current");
		const jumpButton = screen.getByTestId("jump");
		jumpButton.click();
		expect(current).toHaveTextContent("Current: 3");
	});

	test("Progress is correct", () => {
		const progress = screen.getByTestId("progress");
		expect(progress).toHaveTextContent("Progress: 0%");
	});

	test("Progress updates correctly", () => {
		const nextButton = screen.getByTestId("next");
		nextButton.click();
		const progressElement = screen.getByTestId("progress");
		const progress = calculateProgress(2, 4) * 100;
		expect(progressElement).toHaveTextContent(`Progress: ${progress}%`);
	});
});
