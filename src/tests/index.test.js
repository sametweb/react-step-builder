import React from "react";
import TestRenderer, { act } from "react-test-renderer";

import { Step, Steps } from "../lib-ts";

const mockFn = jest.fn();

const Step1 = () => <></>;
const Step2 = () => <></>;
const Step3 = () => <></>;
const Step4 = () => <></>;

const testRenderer = TestRenderer.create(
	<Steps>
		<Step component={Step1} title="My first step" beforeStepChange={mockFn} />
		<Step component={Step2} />
		<Step component={Step3} />
		<Step component={Step4} />
	</Steps>,
);

const testInstance = testRenderer.root;

const props1 = testInstance.findByType(Step1).props;

test("beforeStepChange is called before step changes", () => {
	act(() => props1.next());

	expect(mockFn).toHaveBeenCalled();

	mockFn.mockClear();
});

test("Orders are updated correctly after next/prev/jump", () => {
	expect(props1.order).toBe(1);

	act(() => props1.prev());
	const findStep1 = () => testInstance.find(Step1);
	expect(findStep1).not.toThrow();

	act(() => props1.next());
	const props2 = testInstance.findByType(Step2).props;
	expect(props2.order).toBe(2);

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

test("Titles are updated correctly", () => {
	expect(props1.title).toBe("My first step");

	act(() => props1.next());
	const props2 = testInstance.findByType(Step2).props;
	expect(props2.title).toBe("Step 2");
});

test("isFirst, isLast, hasPrev, hasNext", () => {
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

test("allSteps", () => {
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

test("progress", () => {
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

test("state updates correctly", () => {
	act(() => {
		props1.handleChange({
			currentTarget: { name: "firstname", value: "Samet" },
		});
	});

	const newProps1 = testInstance.findByType(Step1).props;
	expect(newProps1.state.firstname).toBe("Samet");

	act(() => {
		props1.setState("over18", true);
	});

	const newProps2 = testInstance.findByType(Step1).props;
	expect(newProps2.state.over18).toBe(true);
});
