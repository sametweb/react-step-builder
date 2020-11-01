declare type Step = {
    order: number;
    title: string;
    nextStep: number;
    prevStep: number;
    progress: number;
    isFirst: () => boolean;
    isLast: () => boolean;
    hasPrev: () => boolean;
    hasNext: () => boolean;
};
declare type Build = (steps: string[]) => Step[];
declare type StepBuilder = () => {
    start: number;
    current: number;
    size: number;
    build: Build;
    next: () => number;
    prev: () => number;
    jump: (stepId: number) => number;
};
declare type StepNodeType = (title: string) => Step;
export declare const StepBuilder: StepBuilder;
export declare const StepNode: StepNodeType;
export {};
//# sourceMappingURL=StepBuilder.d.ts.map