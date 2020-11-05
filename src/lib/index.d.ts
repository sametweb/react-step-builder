import React, { ComponentType, DetailedHTMLProps, InputHTMLAttributes } from "react";
declare type InputValue = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>["value"];
declare type CheckboxValue = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>["checked"];
interface State {
    [key: string]: InputValue | CheckboxValue;
}
declare type StepsProps = {
    children: (StepProps[] | StepProps) & (JSX.Element[] | JSX.Element);
};
interface StepProps {
    /** Title value for step component. Available as `props.title` in step component */
    title?: string;
    /** Component to be rendered as a step */
    component: ComponentType<StepComponentProps>;
    /** A callback function to run before step change occurs */
    beforeStepChange?: (data?: any) => any;
}
declare type EventType = React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>;
declare type AllSteps = {
    order: number;
    title?: string;
}[];
declare type OrderCheckFn = () => boolean;
declare type MoveFn = () => void;
declare type JumpFn = (step: number) => void;
declare type GetState = (key: keyof State, defaultValue: State[keyof State]) => any;
declare type SetState = (key: keyof State, value: State[keyof State]) => void;
declare type HandleChange = (event: EventType) => void;
export interface StepComponentProps {
    /** Order number of current step component */
    order: number;
    /** Title of current step component */
    title?: string;
    /** Progress of current component, value between 0 and 1 */
    progress?: number;
    /** Function to move to the next step */
    next?: MoveFn;
    /** Function to move to the previous step */
    prev?: MoveFn;
    /** Function to jump to the given step */
    jump?: JumpFn;
    /** Function to check if the step is the first */
    isFirst?: OrderCheckFn;
    /** Function to check if the step is the last */
    isLast?: OrderCheckFn;
    /** Function to check if the step has any previous step*/
    hasPrev?: OrderCheckFn;
    /** Function to check if the step has any next step*/
    hasNext?: OrderCheckFn;
    /** Array of all available steps' title and order number*/
    allSteps?: AllSteps;
    /** Combined state value of all steps */
    state?: State;
    /** Function to set/update state by key */
    setState?: SetState;
    /** Function to retrieve a state value by key */
    getState?: GetState;
    /** `onChange` event handler for form elements */
    handleChange?: HandleChange;
}
/**
 * Wrapper component for `Step` components.
 */
export declare function Steps({ children }: StepsProps): JSX.Element;
/**
 * Wrapper component for each individual step.
 */
export declare function Step<T extends StepProps>(props: T): JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map