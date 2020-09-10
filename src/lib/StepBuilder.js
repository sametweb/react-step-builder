// prettier-ignore
export const StepBuilder = () => ({
  /**
   * Main function for building the Step structure
   */

    start: 1,
    current: 1,
    size: null,
  /**
   * Builds the steps by connecting each step to each other in an order
   * @param {Array} steps - Array of step titles
   * @return {Array} Returns an array of connected steps
   */
  build: function (steps) {
    this.size = steps.length;

    return steps.map((title, order) => {
      let newStep = StepNode(title);

      newStep.order = order + 1;

      let prev = order === 0 ? null : newStep.order - 1;
      let next = order === this.size - 1 ? null : newStep.order + 1;

      newStep.nextStep = next;
      newStep.prevStep = prev;

      return newStep;
    });
  },

  /**
   * Moves to the next step if there is any available, and returns
   * the order number. If the current step is the last one, it returns
   * the current step.
   * @return {number} Order of the next available step
   */
  next: function () {
    this.current = this.current === this.size ? this.current : this.current + 1;
    return this.current;
  },

  /**
   * Moves to the previous step if there is any available, and returns
   * the order number. If the current step is the first one, it returns
   * the current step.
   * @return {number} Order of the previous available step
   */
  prev: function () {
    this.current = this.current === 1 ? 1 : this.current - 1;
    return this.current;
  },

  /**
   * Jumps to the provided step and returns the order number. If the step
   * is not available, returns the current step number.
   * @param {number} step_order The order of the step to jump to.
   * @return {number} Order of the jumped step
   */
  jump: function (stepId) {
    if (stepId > 0 && stepId <= this.size) {
      this.current = stepId;
    }
    return this.current;
  }
})

// prettier-ignore
export const StepNode = (title) => {

  return {

    order: null,
    title: title,
    nextStep: null,
    prevStep: null,
    /**
     * Checks if the step is the first one in the steps list
     * @return {boolean}
     */
    isFirst: function () {
      return !this.prevStep;
    },

    /**
     * Checks if the step is the last one in the steps list
     * @return {boolean}
     */
    isLast: function () {
      return !this.nextStep;
    },

    /**
     * Checks if the current step has a previous step
     * @return {boolean}
     */
    hasPrev: function () {
      return Boolean(this.prevStep);
    },

    /**
     * Checks if the current step has a next step
     * @return {boolean}
     */
    hasNext: function () {
      return Boolean(this.nextStep);
    }
  }
}
