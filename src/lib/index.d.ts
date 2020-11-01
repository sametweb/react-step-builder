import * as React from "react";
declare type state = {
    [key: string]: any;
};
declare type SetStepState = (key: keyof state, value: any) => void;
declare type GetStepState = (key: keyof state) => state[keyof state];
declare type HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
declare type StepData = {
    order: number;
    title: string;
    nextStep: number;
    prevStep: number;
    hasNext: () => boolean;
    hasPrev: () => boolean;
    isFirst: () => boolean;
    isLast: () => boolean;
};
export declare type StepProps = {
    title?: string;
    beforeStepChange?: () => any;
    state: state;
    step: StepData;
    current: number;
    next: () => void;
    prev: () => void;
    jump: (step: number) => void;
    getState: GetStepState;
    setState: SetStepState;
    handleChange: HandleChange;
    allSteps: () => Array<{
        order: number;
        title: String;
    }>;
};
interface StepParams {
    title?: string;
    component: React.FunctionComponent<StepProps>;
    beforeStepChange?: () => any;
}
/**
 * This is a higher order component that returns your step component
 * with global state of the steps and helper methods.
 */
export declare function Step(props: StepParams): JSX.Element | null;
/**
 * Wrapper component for Step components.
 * @summary Step components must be wrapped in `<Steps />` component
 * @example
 *   <Steps>
 *     <Step title="My first step" component={Step1} />
 *     <Step title="My second step" component={Step2} />
 *   </Steps>
 */
interface StepsProps {
    children: JSX.Element[];
}
export declare function Steps({ children }: StepsProps): JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map