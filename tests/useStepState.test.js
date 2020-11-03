import { renderHook, act } from "@testing-library/react-hooks";
import { useStepState } from "../src/dist/index.js";

describe("test useStepState", () => {
	// result.current[0] == state
	// result.current[1] == setState()
	// result.current[2] == getState()
	// result.current[3] == handleChange()

	it("setState method", () => {
		const { result } = renderHook(() => useStepState({}));

		expect(result.current[0]).toEqual({});

		act(() => {
			result.current[1]("key", "value");
		});

		expect(result.current[0]).toHaveProperty("key", "value");
	});

	it("getState method", () => {
		const { result } = renderHook(() => useStepState({}));

		act(() => {
			result.current[1]("key", "value");
		});

		let key = "";

		act(() => {
			key = result.current[2]("key");
		});

		expect(key).toBe(result.current[0].key);
	});

	it("handleChange method", () => {
		const { result } = renderHook(() => useStepState({}));

		expect(result.current[0]).toEqual(expect.objectContaining({}));

		let event = {
			target: {
				name: "firstname",
				value: "Joh",
			},
		};

		act(() => {
			result.current[3](event);
		});

		event.target.value = "John";

		act(() => {
			result.current[3](event);
		});

		expect(result.current[0]).toHaveProperty("firstname");
	});
});
