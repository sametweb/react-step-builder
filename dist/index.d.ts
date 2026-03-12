import * as React from "react";
export declare const StepsProvider: React.FC<React.PropsWithChildren>;
export interface StepsProps {
    children: React.ReactNode;
    onStepChange?: () => void;
    startsFrom?: number;
}
export declare const Steps: React.FC<StepsProps>;
export declare const useSteps: () => {
    prev: () => void;
    next: () => void;
    jump: (step: number) => void;
    isFirst: boolean;
    isLast: boolean;
    hasPrev: boolean;
    hasNext: boolean;
    progress: number;
    total: number;
    current: number;
};
