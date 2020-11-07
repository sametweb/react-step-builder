/* eslint-disable import/first */
import React, { useContext, useEffect, useState, } from "react";
const StepsContext = React.createContext({
    // Dummy values for satisfying the type checker
    // Gets updated before being passed down
    size: 0,
    current: 1,
    progress: 0,
    allSteps: [],
    state: {},
    handleChange: (event) => { },
    setState: (key, value) => { },
    getState: (key, defaultValue) => { },
    next: () => { },
    prev: () => { },
    jump: (id) => { },
});
const StepContext = React.createContext({ order: 0 });
/**
 * Wrapper component for `Step` components.
 */
export function Steps({ children }) {
    const childSteps = React.Children.toArray(children);
    const allSteps = childSteps.map((child, order) => {
        return {
            title: child.props.title || "Step " + (order + 1),
            order: order + 1,
        };
    });
    const size = childSteps.length;
    const _current = useState(1);
    const current = _current[0];
    const setCurrent = _current[1];
    const _stepState = useState({});
    const stepState = _stepState[0];
    const setStepState = _stepState[1];
    const _progress = useState(0);
    const progress = _progress[0];
    const setProgress = _progress[1];
    useEffect(() => {
        if (current === 1)
            setProgress(0);
        else if (current === size)
            setProgress(1);
        else
            setProgress((current - 1) / (size - 1));
    }, [current, setProgress, size]);
    const next = () => {
        if (current < size) {
            setCurrent(current + 1);
        }
    };
    const prev = () => {
        if (current > 1) {
            setCurrent(current - 1);
        }
    };
    const jump = (step) => {
        if (step >= 1 && step <= size) {
            setCurrent(step);
        }
    };
    const getState = (key, defaultValue) => {
        if (key in stepState) {
            return stepState[key];
        }
        return defaultValue;
    };
    const setState = (key, value) => {
        const newState = Object.assign({}, stepState);
        newState[key] = value;
        setStepState(newState);
    };
    const handleChange = (event) => {
        const key = event.currentTarget.name;
        const inputType = event.currentTarget.type;
        const value = inputType === "checkbox"
            ? event.currentTarget.checked
            : event.currentTarget.value;
        const newState = Object.assign({}, stepState);
        newState[key] = value;
        setStepState(newState);
    };
    const context = {
        size,
        current,
        progress,
        allSteps,
        state: stepState,
        handleChange,
        setState,
        getState,
        next,
        prev,
        jump,
    };
    return (React.createElement(StepsContext.Provider, { value: context }, React.Children.map(children, (child, order) => (React.createElement(StepContext.Provider, { value: { order: order + 1 } }, child)))));
}
/**
 * Wrapper component for each individual step.
 */
export function Step(props) {
    const { title, component: Component, beforeStepChange } = props;
    const stepsContextValue = useContext(StepsContext);
    const { order } = useContext(StepContext);
    const { size, current } = stepsContextValue;
    const isFirst = () => order === 1;
    const isLast = () => order === size;
    const hasNext = () => order < size;
    const hasPrev = () => order > 1;
    useEffect(() => {
        return () => {
            if (current === order && beforeStepChange)
                beforeStepChange();
        };
    }, [current, order, beforeStepChange]);
    if (order === current) {
        const newProps = Object.assign({}, props);
        delete newProps.component;
        return (React.createElement(Component, Object.assign({}, newProps, stepsContextValue, { title: title, order: order, hasPrev: hasPrev, hasNext: hasNext, isFirst: isFirst, isLast: isLast })));
    }
    return null;
}
//# sourceMappingURL=index.js.map