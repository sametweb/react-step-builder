import * as React from "react";
import { StepBuilder } from "./StepBuilder";
var defaultContext = {
    state: {},
    title: "",
    beforeStepChange: function () { },
    setState: function () { },
    getState: function () { },
    handleChange: function () { },
    next: function () { },
    prev: function () { },
    jump: function () { },
    allSteps: function () { return []; },
    current: 0,
    step: {
        order: 0,
        title: "",
        nextStep: 0,
        prevStep: 0,
        progress: 0,
        hasPrev: function () { return false; },
        hasNext: function () { return false; },
        isFirst: function () { return false; },
        isLast: function () { return false; },
    },
};
var StepContext = React.createContext(defaultContext);
function useStepState(INITIAL_VALUE) {
    var myState = React.useState(INITIAL_VALUE);
    var state = myState[0];
    var setState = myState[1];
    /**
     * Stores data in state with the provided key.
     */
    var setStepState = function (key, value) {
        var new_state = JSON.parse(JSON.stringify(state));
        new_state[key] = value;
        setState(new_state);
    };
    /**
     * Returns the data from state for the provided key.
     */
    var getStepState = function (key) {
        if (!state[key]) {
            state[key] = "";
        }
        return state[key];
    };
    /**
     * Handler method for syntetic React events. Can be provided as a callback function to 'onChange' property of form elements.
     */
    var handleChange = function (event) {
        var key = event.target.name, value = event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value;
        var new_state = JSON.parse(JSON.stringify(state));
        new_state[key] = value;
        setState(new_state);
    };
    return [state, setStepState, getStepState, handleChange];
}
/**
 * This is a higher order component that returns your step component
 * with global state of the steps and helper methods.
 */
export function Step(props) {
    var Component = props.component, title = props.title, beforeStepChange = props.beforeStepChange;
    var context = React.useContext(StepContext);
    context.title = title;
    context.beforeStepChange = beforeStepChange;
    React.useEffect(function () {
        return function () {
            if (context.current === context.step.order && beforeStepChange)
                beforeStepChange();
        };
    }, [context.current, context.step.order, beforeStepChange]);
    if (context.current === context.step.order) {
        return (<Component {...context} current={context.current} step={context.step}/>);
    }
    return null;
}
export function Steps(_a) {
    var children = _a.children;
    var mySteps = React.useState(StepBuilder()), steps = mySteps[0], setSteps = mySteps[1];
    var myStepState = useStepState({}), state = myStepState[0], set = myStepState[1], get = myStepState[2], handleChange = myStepState[3];
    var myCurrent = React.useState(1), current = myCurrent[0], setCurrent = myCurrent[1];
    var stepTitles = children.map(function (step, order) {
        return step.props.title;
    });
    var stepDataCollection = steps.build(stepTitles);
    /**
     * Moves to the next step
     */
    function next() {
        var nextStep = steps.next();
        setSteps(steps);
        setCurrent(nextStep);
    }
    /**
     * Moves to the previous step
     */
    function prev() {
        var prevStep = steps.prev();
        setSteps(steps);
        setCurrent(prevStep);
    }
    /**
     * Moves to the step with provided step order
     */
    function jump(step) {
        var jumpedStep = steps.jump(step);
        setSteps(steps);
        setCurrent(jumpedStep);
    }
    function allSteps() {
        return stepDataCollection.map(function (_a) {
            var order = _a.order, title = _a.title;
            return ({
                order: order,
                title: title,
            });
        });
    }
    children = children.map(function (child, id) {
        var new_child = Object.assign({}, child);
        new_child.props = Object.assign({}, child.props);
        new_child.props.step = stepDataCollection[id];
        new_child.props.current = current;
        new_child.props.step.progress = current / children.length;
        return new_child;
    });
    var value = {
        current: current,
        state: state,
        setState: set,
        getState: get,
        handleChange: handleChange,
        next: next,
        prev: prev,
        jump: jump,
        allSteps: allSteps,
        step: stepDataCollection[current - 1],
    };
    return <StepContext.Provider value={value}>{children}</StepContext.Provider>;
}
//# sourceMappingURL=index.jsx.map