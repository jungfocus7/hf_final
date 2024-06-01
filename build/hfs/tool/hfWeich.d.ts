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
    get running(): boolean;
    private _end;
    get end(): number;
    private _now;
    get now(): number;
    private _speed;
    get speed(): number;
    private _fid;
    private fn_clearFrame;
    private _frameBinder;
    private fn_enterFrame;
    private fn_loopFrame;
    stop(): void;
    fromTo(end: number, now: number, speed?: number): void;
    to(end: number, speed?: number): void;
}
export { type IWeich, Weich };
