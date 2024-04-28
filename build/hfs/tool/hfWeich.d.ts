interface IWeich extends EventTarget {
    get running(): boolean;
    get end(): number;
    get now(): number;
    get speed(): number;
    stop(): void;
    fromTo(end: number, now: number, speed?: number): void;
    to(end: number, speed?: number): void;
}
declare class Weich extends EventTarget implements IWeich {
    constructor(now: number, speed?: number);
    private _running;
    /** 작동중인 여부 */
    get running(): boolean;
    private _end;
    /** 끝값 */
    get end(): number;
    private _now;
    /** 현재 */
    get now(): number;
    private _speed;
    /** 속도 */
    get speed(): number;
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
     * @param end
     * @param now
     * @param speed
     */
    fromTo(end: number, now: number, speed?: number): void;
    /**
     * 프래임 끝으로
     * @param end
     * @param speed
     */
    to(end: number, speed?: number): void;
}
export { type IWeich, Weich };
