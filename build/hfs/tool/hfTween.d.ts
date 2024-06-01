export type EaseFunction = (...args: Array<number>) => number;
export type EaseFunctionGroup = {
    easeIn: EaseFunction;
    easeOut: EaseFunction;
    easeInOut: EaseFunction;
};
export declare const easeBack: Readonly<EaseFunctionGroup>;
export declare const easeBounce: Readonly<EaseFunctionGroup>;
export declare const easeCircular: Readonly<EaseFunctionGroup>;
export declare const easeElastic: Readonly<EaseFunctionGroup>;
export declare const easeExponential: Readonly<EaseFunctionGroup>;
interface ITween extends EventTarget {
    get running(): boolean;
    get begin(): number;
    get end(): number;
    get diff(): number;
    get current(): number;
    get time(): number;
    get duration(): number;
    get ease(): EaseFunction;
    stop(): void;
    fromTo(begin: number, end: number): void;
    to(end: number): void;
}
declare class Tween extends EventTarget implements ITween {
    constructor(current?: number, duration?: number, ease?: EaseFunction);
    private _running;
    get running(): boolean;
    private _begin;
    get begin(): number;
    private _end;
    get end(): number;
    private _diff;
    get diff(): number;
    private _current;
    get current(): number;
    private _time;
    get time(): number;
    private _duration;
    get duration(): number;
    private _ease;
    get ease(): EaseFunction;
    private _fid;
    private fn_clearFrame;
    private _frameBinder;
    private fn_enterFrame;
    private fn_loopFrame;
    stop(): void;
    fromTo(begin: number, end: number): void;
    to(end: number): void;
}
export { type ITween, Tween };
