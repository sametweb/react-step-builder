export var StepBuilder = function () { return ({
    /**
     * Main function for building the Step structure
     */
    start: 1,
    current: 1,
    size: 0,
    /**
     * Builds the steps by connecting each step to each other in an order
     */
    build: function (steps) {
        var _this = this;
        this.size = steps.length;
        return steps.map(function (title, order) {
            var newStep = StepNode(title);
            newStep.order = order + 1;
            var prev = order === 0 ? 0 : newStep.order - 1;
            var next = order === _this.size - 1 ? 0 : newStep.order + 1;
            newStep.nextStep = next;
            newStep.prevStep = prev;
            newStep.progress = newStep.order / steps.length;
            return newStep;
        });
    },
    /**
     * Moves to the next step if there is any available, and returns
     * the order number. If the current step is the last one, it returns
     * the current step.
     */
    next: function () {
        this.current = this.current === this.size ? this.current : this.current + 1;
        return this.current;
    },
    /**
     * Moves to the previous step if there is any available, and returns
     * the order number. If the current step is the first one, it returns
     * the current step.
     */
    prev: function () {
        this.current = this.current === 1 ? 1 : this.current - 1;
        return this.current;
    },
    /**
     * Jumps to the provided step and returns the order number. If the step
     * is not available, returns the current step number.
     */
    jump: function (stepId) {
        if (stepId > 0 && stepId <= this.size) {
            this.current = stepId;
        }
        return this.current;
    },
}); };
export var StepNode = function (title) {
    return {
        order: 0,
        title: title,
        nextStep: 0,
        prevStep: 0,
        progress: 0,
        /**
         * Checks if the step is the first one in the steps list
         */
        isFirst: function () {
            return !this.prevStep;
        },
        /**
         * Checks if the step is the last one in the steps list
         */
        isLast: function () {
            return !this.nextStep;
        },
        /**
         * Checks if the current step has a previous step
         */
        hasPrev: function () {
            return Boolean(this.prevStep);
        },
        /**
         * Checks if the current step has a next step
         */
        hasNext: function () {
            return Boolean(this.nextStep);
        },
    };
};
//# sourceMappingURL=StepBuilder.js.map