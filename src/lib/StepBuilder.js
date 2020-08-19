export class StepBuilder {
  /**
   * Main class for building the Step structure
   * @param {string} name - Give a name for your steps
   */

  constructor(name) {
    this.name = name;
    this.start = 1;
    this.current = 1;
    this.size = null;
  }
  /**
   * Builds the steps by connecting each step to each other in an order
   * @param {Array} steps - Array of step objects with id and title property
   * @return {Array} Returns an array of connected steps
   */
  build(steps) {
    this.size = steps.length;

    return steps.map((title, order) => {
      var new_step = new StepNode(title);

      new_step.order = order + 1;

      var prev = order === 0 ? null : new_step.order - 1;
      var next = order === this.size - 1 ? null : new_step.order + 1;

      new_step.next_step = next;
      new_step.prev_step = prev;

      return new_step;
    });
  }

  next() {
    this.current = this.current === this.size ? this.current : this.current + 1;
    return this.current;
  }

  prev() {
    this.current = this.current === 1 ? 1 : this.current - 1;
    return this.current;
  }

  jump(step_id) {
    if (step_id > 0 && step_id < this.size) {
      this.current = step_id;
    }
    return this.current;
  }
}

export class StepNode {
  constructor(title) {
    this.order = null;
    this.title = title;
    this.next_step = null;
    this.prev_step = null;
  }

  is_first() {
    return !Boolean(this.prev_step);
  }

  is_last() {
    return !Boolean(this.next_step);
  }
}
