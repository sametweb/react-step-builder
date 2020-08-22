const { StepBuilder, StepNode } = require("../src/lib/StepBuilder");

const test_steps = ["Step1", "Step2", "Step3"];
describe("StepBuilder", () => {
  describe("constructor()", () => {
    const steps = new StepBuilder();
    it("creates the object with start=1, current=1, size=null properties", () => {
      expect(steps.start).toBe(1);
      expect(steps.current).toBe(1);
      expect(steps.size).toBe(null);
    });
  });

  describe(".build()", () => {
    const steps = new StepBuilder();
    const built = steps.build(test_steps);

    it("sets steps.size to the step count", () => {
      expect(steps.size).toBe(test_steps.length);
    });

    it("returns an array of StepNode objects", () => {
      expect(Array.isArray(built)).toBe(true);
    });

    it("StepNodes have order, nextStep, prevStep properties", () => {
      built.forEach((node) => {
        expect(node.order).toEqual(expect.any(Number));
        expect(node).toHaveProperty("order");
        expect(node).toHaveProperty("nextStep");
        expect(node).toHaveProperty("prevStep");
      });
    });

    it("StepNodes methods isFirst, isLast, hasPrev, hasNext", () => {
      built.forEach((node, i) => {
        let order = i + 1;
        if (order === 1) {
          expect(node.isFirst()).toBe(true);
          expect(node.isLast()).toBe(false);
          expect(node.hasPrev()).toBe(false);
          expect(node.hasNext()).toBe(true);
        } else if (order === 3) {
          expect(node.isFirst()).toBe(false);
          expect(node.isLast()).toBe(true);
          expect(node.hasPrev()).toBe(true);
          expect(node.hasNext()).toBe(false);
        } else {
          expect(node.isFirst()).toBe(false);
          expect(node.isLast()).toBe(false);
          expect(node.hasPrev()).toBe(true);
          expect(node.hasNext()).toBe(true);
        }
      });
    });
  });

  describe(".next()", () => {
    const steps = new StepBuilder();
    steps.build(test_steps);
    it("sets this.current to +1", () => {
      expect(steps.current).toBe(1);
      steps.next();
      expect(steps.current).toBe(2);
    });
    it("this.current remains same if it's last step", () => {
      steps.next();
      expect(steps.current).toBe(3);
      steps.next();
      expect(steps.current).toBe(3);
    });
  });

  describe(".prev()", () => {
    const steps = new StepBuilder();
    steps.build(test_steps);
    it("sets this.current to -1", () => {
      steps.next(); // 2
      steps.next(); // 3
      steps.prev(); // 2
      expect(steps.current).toBe(2);
    });
    it("this.current remains same if it's first step", () => {
      steps.prev(); // 1
      expect(steps.current).toBe(1);
      steps.prev(); // 1
      expect(steps.current).toBe(1);
    });
  });

  describe(".jump(step_id)", () => {
    const steps = new StepBuilder();
    steps.build(test_steps);
    it("sets this.current to step_id", () => {
      steps.jump(3);
      expect(steps.current).toBe(3);
      steps.jump(2);
      expect(steps.current).toBe(2);
    });
    it("this.current remains same if step_id doesn't exist", () => {
      steps.jump(5); // still 2 from previous jump
      expect(steps.current).toBe(2);
    });
  });
});
