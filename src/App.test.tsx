import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App, { StepsComponent } from "./App";
import { StepsProvider } from "./lib-ts";

const calculateProgress = (current: number, total: number) =>
	Number(((current - 1) / (total - 1)).toFixed(2));

const onStepChange = vi.fn();

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

	it("Clicking next button moves to the next step", async () => {
		const nextButton = screen.getByTestId("next");
		await act(async () => {
			nextButton.click();
		});
		await waitFor(() => {
			const step2 = screen.getByTestId("step2");
			expect(step2).toBeVisible();
		});
	});

	it("Clicking prev button moves to the previous step", async () => {
		const nextButton = screen.getByTestId("next");
		await act(async () => {
			nextButton.click();
		});
		await waitFor(() => {
			expect(screen.getByTestId("step2")).toBeVisible();
		});
		const prevButton = screen.getByTestId("prev");
		await act(async () => {
			prevButton.click();
		});
		await waitFor(() => {
			const step1 = screen.getByTestId("step1");
			expect(step1).toBeVisible();
		});
	});

	it("Clicking jump 3 button jumps to the 3rd step", async () => {
		const jumpButton = screen.getByTestId("jump");
		await act(async () => {
			jumpButton.click();
		});
		await waitFor(() => {
			const step3 = screen.getByTestId("step3");
			expect(step3).toBeVisible();
		});
	});

	it("Total count is correct", () => {
		const total = screen.getByTestId("total");
		expect(total).toHaveTextContent("Total: 4");
	});

	it("Current count updates correctly", async () => {
		const current = screen.getByTestId("current");
		const jumpButton = screen.getByTestId("jump");
		await act(async () => {
			jumpButton.click();
		});
		await waitFor(() => {
			expect(current).toHaveTextContent("Current: 3");
		});
	});

	it("Progress is correct", () => {
		const progress = screen.getByTestId("progress");
		expect(progress).toHaveTextContent("Progress: 0%");
	});

	it("Progress updates correctly", async () => {
		const nextButton = screen.getByTestId("next");
		await act(async () => {
			nextButton.click();
		});
		await waitFor(() => {
			const progressElement = screen.getByTestId("progress");
			const progress = calculateProgress(2, 4) * 100;
			expect(progressElement).toHaveTextContent(`Progress: ${progress}%`);
		});
	});
});

describe("StepsProvider props", () => {
	it("Steps start from provided number", async () => {
		render(
			<StepsProvider>
				<StepsComponent startsFrom={2} onStepChange={onStepChange} />
			</StepsProvider>,
		);
		await waitFor(() => {
			const step2 = screen.getByTestId("step2");
			expect(step2).toBeVisible();
		});
	});

	it("If startsFrom is out of range, first step is rendered by default", async () => {
		render(
			<StepsProvider>
				<StepsComponent startsFrom={10} onStepChange={onStepChange} />
			</StepsProvider>,
		);
		await waitFor(() => {
			const step1 = screen.getByTestId("step1");
			expect(step1).toBeVisible();
		});
	});
});

describe("Steps props", () => {
	beforeEach(() => {
		onStepChange.mockClear();
		render(
			<StepsProvider>
				<StepsComponent startsFrom={1} onStepChange={onStepChange} />
			</StepsProvider>,
		);
	});
	it("onStepChange runs on every step change", async () => {
		const nextButton = screen.getByTestId("next");
		await act(async () => {
			nextButton.click();
		});
		await waitFor(() => {
			expect(onStepChange).toHaveBeenCalledTimes(1);
		});
	});
});
