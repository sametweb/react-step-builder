import React, { useContext, useEffect, useState } from "react";
var StepsContext = React.createContext({
    size: 0,
    current: 1,
    progress: 0,
    allSteps: [],
    state: {},
    handleChange: function (event) { },
    setState: function (key, value) { },
    getState: function (key) { return ""; },
    next: function () { },
    prev: function () { },
    jump: function (id) { },
});
var StepContext = React.createContext({ order: 0 });
/**
 * Wrapper component for `Step` components.
 */
export function Steps(_a) {
    var children = _a.children;
    var childSteps = React.Children.toArray(children);
    var allSteps = childSteps.map(function (child, order) {
        return {
            title: child.title || "Step " + (order + 1),
            order: order + 1,
        };
    });
    var size = childSteps.length;
    var _b = useState(1), current = _b[0], setCurrent = _b[1];
    var _c = useState({}), stepState = _c[0], setStepState = _c[1];
    var _d = useState(current / size), progress = _d[0], setProgress = _d[1];
    useEffect(function () {
        setProgress(current / size);
    }, [current]);
    /**
     * Moves to the next step.
     */
    var next = function () {
        if (current < size) {
            setCurrent(current + 1);
        }
    };
    /**
     * Moves to the previous step.
     */
    var prev = function () {
        if (current > 1) {
            setCurrent(current - 1);
        }
    };
    /**
     * Moves to the specified step.
     */
    var jump = function (step) {
        if (step >= 1 && step <= size) {
            setCurrent(step);
        }
    };
    /**
     * Fetches the state value of given key from state object. Returns empty string if it is not available.
     */
    var getState = function (key) {
        if (!stepState[key])
            stepState[key] = "";
        return stepState[key];
    };
    /**
     * Updates the value of a given key in state object.
     */
    var setState = function (key, value) {
        var newState = Object.assign({}, stepState);
        newState[key] = value;
        setStepState(newState);
    };
    var handleChange = function (event) {
        var key = event.currentTarget.name;
        var value = event.currentTarget.type === "checkbox"
            ? event.currentTarget.checked
            : event.currentTarget.value;
        var newState = Object.assign({}, stepState);
        newState[key] = value;
        setStepState(newState);
    };
    var context = {
        size: size,
        current: current,
        progress: progress,
        allSteps: allSteps,
        state: stepState,
        handleChange: handleChange,
        setState: setState,
        getState: getState,
        next: next,
        prev: prev,
        jump: jump,
    };
    return (<StepsContext.Provider value={context}>
			{React.Children.map(children, function (child, order) { return (<StepContext.Provider value={{ order: order + 1 }}>
					{child}
				</StepContext.Provider>); })}
		</StepsContext.Provider>);
}
/**
 * Wrapper component for each individual step.
 */
export function Step(_a, theRest) {
    var title = _a.title, Component = _a.component, beforeStepChange = _a.beforeStepChange;
    var StepsContextValue = useContext(StepsContext);
    var order = useContext(StepContext).order;
    var size = StepsContextValue.size, current = StepsContextValue.current;
    /**
     * Checks if the component is the first step.
     */
    var isFirst = function () { return order === 1; };
    /**
     * Checks if the component is the last step.
     */
    var isLast = function () { return order === size; };
    /**
     * Checks if the component has a next step.
     */
    var hasNext = function () { return order < size; };
    /**
     * Checks if the component has a previous step.
     */
    var hasPrev = function () { return order > 1; };
    useEffect(function () {
        return function () {
            current === order && beforeStepChange && beforeStepChange();
        };
    }, []);
    if (order === current) {
        return (<Component {...theRest} {...StepsContextValue} title={title} order={order} hasPrev={hasPrev} hasNext={hasNext} isFirst={isFirst} isLast={isLast}/>);
    }
    return null;
}
//# sourceMappingURL=index.jsx.map