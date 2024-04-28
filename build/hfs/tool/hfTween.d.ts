/** 이즈함수 타입 */
export type EaseFunction = (...args: Array<number>) => number;
/** 이즈함수그룹 타입 */
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
/** Tween Interface */
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
    /**
     * Tween 객체
     * @param current
     * @param duration
     * @param ease
     */
    constructor(current?: number, duration?: number, ease?: EaseFunction);
    private _running;
    /** 작동중인 여부 */
    get running(): boolean;
    private _begin;
    /** 시작값 */
    get begin(): number;
    private _end;
    /** 끝값 */
    get end(): number;
    /** 변화량 */
    private _diff;
    get diff(): number;
    private _current;
    /** 현재값 */
    get current(): number;
    private _time;
    /** 시간값 */
    get time(): number;
    private _duration;
    /** 진행시간 */
    get duration(): number;
    private _ease;
    /** 이징함수 */
    get ease(): EaseFunction;
    private _fid;
    private fn_clearFrame;
    private _frameBinder;
    private fn_enterFrame;
    private fn_loopFrame;
    /**
     * 프래임 정지
     */
    stop(): void;
    /**
     * 프래임 시작에서 끝으로
     * @param begin
     * @param end
     */
    fromTo(begin: number, end: number): void;
    /**
     * 프래임 끝으로
     * @param end
     */
    to(end: number): void;
}
export { type ITween, Tween };
