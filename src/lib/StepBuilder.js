export class StepBuilder {
  /**
   * Main class for building the Step structure
   */

  constructor() {
    this.start = 1;
    this.current = 1;
    this.size = null;
  }
  /**
   * Builds the steps by connecting each step to each other in an order
   * @param {Array} steps - Array of step titles
   * @return {Array} Returns an array of connected steps
   */
  build(steps) {
    this.size = steps.length;

    return steps.map((title, order) => {
      var newStep = new StepNode(title);

      newStep.order = order + 1;

      var prev = order === 0 ? null : newStep.order - 1;
      var next = order === this.size - 1 ? null : newStep.order + 1;

      newStep.nextStep = next;
      newStep.prevStep = prev;

      return newStep;
    });
  }

  /**
   * Moves to the next step if there is any available, and returns the order number. If the current step is the last one, it returns the current step.
   * @return {number} Order of the next available step
   */
  next() {
    this.current = this.current === this.size ? this.current : this.current + 1;
    return this.current;
  }

  /**
   * Moves to the previous step if there is any available, and returns the order number. If the current step is the first one, it returns the current step.
   * @return {number} Order of the previous available step
   */
  prev() {
    this.current = this.current === 1 ? 1 : this.current - 1;
    return this.current;
  }

  /**
   * Jumps to the provided step and returns the order number. If the step is not available, returns the current step number.
   * @param {number} step_order The order of the step to jump to.
   * @return {number} Order of the jumped step
   */
  jump(stepId) {
    if (stepId > 0 && stepId <= this.size) {
      this.current = stepId;
    }
    return this.current;
  }
}

class StepNode {
  constructor(title) {
    this.order = null;
    this.title = title;
    this.nextStep = null;
    this.prevStep = null;
  }

  /**
   * Checks if the step is the first one in the steps list
   * @return {boolean}
   */
  isFirst() {
    return !Boolean(this.prevStep);
  }

  /**
   * Checks if the step is the last one in the steps list
   * @return {boolean}
   */
  isLast() {
    return !Boolean(this.nextStep);
  }

  /**
   * Checks if the current step has a previous step
   * @return {boolean}
   */
  hasPrev() {
    return Boolean(this.prevStep);
  }

  /**
   * Checks if the current step has a next step
   * @return {boolean}
   */
  hasNext() {
    return Boolean(this.nextStep);
  }
}
