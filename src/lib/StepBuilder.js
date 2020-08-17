export class StepBuilder {
  /**
   * Main class for building the Step structure
   * @param {string} name - Give a name for your steps
   */

  constructor(name) {
    this.name = name;
    this.start = null;
    this.current = null;
    this.size = null;
  }
  /**
   * Builds the steps by connecting each step to each other in an order
   * @param {Array} steps - Array of step objects with id and title property
   * @return {Array} Returns an array of connected steps
   */
  build(steps) {
    var steps_list = [];
    this.size = steps.reduce((total, step) => {
      total += 1;
      return total;
    }, 0);

    steps.forEach((step) => {
      var new_step = new StepNode(step.title);
      steps_list.push(new_step);
    });

    steps_list.forEach((step, order) => {
      step.order = order + 1;
      if (order === 0) {
        this.start = 1;
        this.current = 1;
      }

      var prev = order === 0 ? null : step.order - 1;
      var next = order === this.size - 1 ? null : step.order + 1;

      step.next_step = next;
      step.prev_step = prev;
    });

    return steps_list;
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
    var my_current = { ...this.current };
    while (my_current.id !== step_id) {
      my_current = my_current.slice();
    }
    if (my_current.id === step_id) {
      this.current = my_current;
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
