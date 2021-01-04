import React from "react";
import TestRenderer, { act } from "react-test-renderer";

import { Step, Steps } from "../lib-ts";

const mockFn = jest.fn();

const Step1 = () => <></>;
const Step2 = () => <></>;
const Step3 = () => <></>;
const Step4 = () => <></>;
const Navigation = () => <></>;

const testRenderer = TestRenderer.create(
	<Steps config={{ navigation: { component: Navigation, location: "before" } }}>
		<Step component={Step1} title="My first step" beforeStepChange={mockFn} />
		<Step component={Step2} />
		<Step component={Step3} />
		<Step component={Step4} />
	</Steps>,
);

const testInstance = testRenderer.root;

const props1 = testInstance.findByType(Step1).props;

describe("beforeStepChange", () => {
	it("is called before step changes", () => {
		act(() => props1.next());

		expect(mockFn).toHaveBeenCalled();

		mockFn.mockClear();
	});
});

describe("utility functions", () => {
	it("Orders are updated correctly after next/prev/jump", () => {
		act(() => props1.prev());
		const findStep1 = () => testInstance.find(Step1);
		expect(findStep1).not.toThrow();

		act(() => props1.next());
		const props2 = testInstance.findByType(Step2).props;
		expect(props2.order).toBe(2);

		act(() => props2.jump(10));
		const findStep2 = () => testInstance.find(Step2);
		expect(findStep2).not.toThrow();

		act(() => props2.jump(4));
		const props4 = testInstance.findByType(Step4).props;
		expect(props4.order).toBe(4);

		act(() => props4.next());
		const findStep4 = () => testInstance.find(Step4);
		expect(findStep4).not.toThrow();

		act(() => props4.prev());
		const props3 = testInstance.findByType(Step3).props;
		expect(props3.order).toBe(3);
	});

	it("isFirst, isLast, hasPrev, hasNext", () => {
		expect(props1.isFirst()).toBe(true);
		expect(props1.isLast()).toBe(false);
		expect(props1.hasPrev()).toBe(false);
		expect(props1.hasNext()).toBe(true);

		act(() => props1.next());
		const props2 = testInstance.findByType(Step2).props;
		expect(props2.isFirst()).toBe(false);
		expect(props2.isLast()).toBe(false);
		expect(props2.hasPrev()).toBe(true);
		expect(props2.hasNext()).toBe(true);

		act(() => props2.jump(4));
		const props4 = testInstance.findByType(Step4).props;
		expect(props4.isFirst()).toBe(false);
		expect(props4.isLast()).toBe(true);
		expect(props4.hasPrev()).toBe(true);
		expect(props4.hasNext()).toBe(false);
	});
});

describe("Initial values are correct", () => {
	it("Titles are updated correctly", () => {
		expect(props1.title).toBe("My first step");

		act(() => props1.next());
		const props2 = testInstance.findByType(Step2).props;
		expect(props2.title).toBe("Step 2");
	});

	it("order", () => {
		expect(props1.order).toBe(1);
	});

	it("allSteps", () => {
		expect(props1.allSteps).toHaveLength(4);

		expect(props1.allSteps[0]).toEqual(
			expect.objectContaining({
				order: 1,
				title: "My first step",
			}),
		);

		expect(props1.allSteps[1]).toEqual(
			expect.objectContaining({
				order: 2,
				title: "Step 2",
			}),
		);
		expect(props1.allSteps[2]).toEqual(
			expect.objectContaining({
				order: 3,
				title: "Step 3",
			}),
		);
		expect(props1.allSteps[3]).toEqual(
			expect.objectContaining({
				order: 4,
				title: "Step 4",
			}),
		);
	});

	it("progress", () => {
		expect(props1.progress).toBe(0);

		act(() => props1.jump(4));
		const props4 = testInstance.findByType(Step4).props;
		expect(props4.progress).toBe(1);

		act(() => props4.prev());
		const props3 = testInstance.findByType(Step3).props;
		const newProgress = (props3.order - 1) / (props3.allSteps.length - 1);
		expect(props3.progress).toBe(newProgress);

		act(() => props3.jump(1));
	});
});

describe("state updates correctly", () => {
	it("handleChange with input", () => {
		expect(props1.getState("firstname", "")).toBe("");
		expect(props1.getState("over18", false)).toBe(false);

		act(() => {
			props1.handleChange({
				currentTarget: { name: "firstname", value: "Samet" },
			});
		});

		const newProps1 = testInstance.findByType(Step1).props;
		expect(newProps1.state.firstname).toBe("Samet");
	});

	it("handleChange with checkbox", () => {
		act(() => {
			props1.handleChange({
				currentTarget: { type: "checkbox", name: "over18", checked: true },
			});
		});

		const props2 = testInstance.findByType(Step1).props;
		expect(props2.state.over18).toBe(true);
	});

	it("setState and getState", () => {
		act(() => {
			props1.setState("lastname", "Mutevelli");
		});

		const newProps1 = testInstance.findByType(Step1).props;
		expect(newProps1.getState("lastname", "")).toBe("Mutevelli");
	});
});

describe("global navigation", () => {
	it("takes parameters correctly", () => {
		const navProps = testInstance.findByType(Navigation).props;
		expect(navProps.size).toBe(4);
		expect(navProps.current).toBe(1);
		expect(navProps.progress).toBe(0);
	});

	it("buttons work correctly", () => {
		const navProps = testInstance.findByType(Navigation).props;

		act(() => navProps.next());

		const newNavProps = testInstance.findByType(Navigation).props;

		expect(newNavProps.current).toBe(2);
		expect(newNavProps.size).toBe(4);
		expect(newNavProps.progress).toBe(
			(newNavProps.current - 1) / (newNavProps.size - 1),
		);
	});
});
