import * as React from "react";
type BeforeNextGuard = () => boolean | Promise<boolean>;
export declare const StepsProvider: React.FC<React.PropsWithChildren>;
export interface StepChangeContext {
    from: number;
    to: number;
}
export interface StepsProps {
    children: React.ReactNode;
    onStepChange?: (context?: StepChangeContext) => void;
    beforeNext?: BeforeNextGuard;
    startsFrom?: number;
}
export declare const Steps: React.FC<StepsProps>;
export declare const useSteps: () => {
    prev: () => void;
    next: () => Promise<boolean>;
    jump: (step: number) => void;
    reset: () => void;
    isFirst: boolean;
    isLast: boolean;
    hasPrev: boolean;
    hasNext: boolean;
    progress: number;
    total: number;
    current: number;
};
export {};
