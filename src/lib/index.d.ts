import React, { ComponentType } from "react";
declare type StateValue = string | number | boolean | bigint | symbol;
declare type State = {
    [key: string]: StateValue;
};
declare type StepsProps = {
    children: (StepProps[] | StepProps) & (JSX.Element[] | JSX.Element);
};
interface StepProps {
    title?: string;
    component: ComponentType<StepComponentProps>;
    beforeStepChange?: (data?: any) => any;
}
declare type AllSteps = {
    order: number;
    title?: string;
}[];
declare type OrderCheckFn = () => boolean;
declare type MoveFn = () => void;
declare type JumpFn = (step: number) => void;
declare type GetState = (key: keyof State) => State[keyof State];
declare type SetState = (key: keyof State, value: StateValue) => void;
declare type HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
interface StepComponentProps {
    order: number;
    title?: string;
    progress?: number;
    next?: MoveFn;
    prev?: MoveFn;
    jump?: JumpFn;
    isFirst?: OrderCheckFn;
    isLast?: OrderCheckFn;
    hasPrev?: OrderCheckFn;
    hasNext?: OrderCheckFn;
    allSteps?: AllSteps;
    state?: State;
    setState?: SetState;
    getState?: GetState;
    handleChange?: HandleChange;
}
/**
 * Wrapper component for `Step` components.
 */
export declare function Steps({ children }: StepsProps): JSX.Element;
/**
 * Wrapper component for each individual step.
 */
export declare function Step<P extends StepProps>({ title, component: Component, beforeStepChange }: StepProps, theRest: P): JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map