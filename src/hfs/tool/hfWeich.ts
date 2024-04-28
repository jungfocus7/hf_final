import { eventTypes } from "../hfcom";


//https://github.com/jungfocus7/jhb0b_as3_libs/blob/master/hbx/src/hbx/balence/CSmoothControl.as
//#region `Weich: 부드러운 움직임`
interface IWeich extends EventTarget {
    get running(): boolean;
    get end(): number;
    get now(): number;
    get speed(): number;
    stop(): void;
    fromTo(end: number, now: number, speed?: number): void;
    to(end: number, speed?: number): void;
};
class Weich extends EventTarget implements IWeich {
    constructor(now: number, speed: number = 0.3) {
        super();

        this._running = false;
        this._end = now;
        this._now = now;
        if ((speed <= 0) || (speed >= 1))
            throw new Error('The speed value must be greater than 0 and less than 1.');
        this._speed = speed;
        this._fid = -1;

        Object.seal(this);
    }

    private _running: boolean;
    /** 작동중인 여부 */
    public get running(): boolean {
        return this._running;
    }

    private _end: number;
    /** 끝값 */
    public get end(): number {
        return this._end;
    }

    private _now: number;
    /** 현재 */
    public get now(): number {
        return this._now;
    }

    private _speed: number;
    /** 속도 */
    public get speed(): number {
        return this._speed;
    }

    private _fid: number;
    private fn_clearFrame(): void {
        if (this._fid === -1) return;

        cancelAnimationFrame(this._fid);
        this._fid = -1;
    }

    private _frameBinder: FrameRequestCallback = null!;
    private fn_enterFrame(): void {
        if (this._frameBinder === null) {
            this._frameBinder = this.fn_loopFrame.bind(this);
        }
        this._fid = requestAnimationFrame(this._frameBinder);
    }

    private fn_loopFrame(): void {
        if (this._running === false) return;

        const dst = this._end - this._now;
        if (Math.abs(dst) < 1) {
            this._now = this._end;
            this.dispatchEvent(new Event(eventTypes.END));
            this.stop();
        }
        else {
            this._now = this._now + (dst * this._speed);
            this.dispatchEvent(new Event(eventTypes.UPDATE));
        }

        this.fn_enterFrame();
    }

    /**
     * 프래임 정지
     */
    public stop(): void {
        if (this._running === true) {
            this.fn_clearFrame();
            this._running = false;
        }
    }

    /**
     * 프래임 시작에서 끝으로
     * @param end
     * @param now
     * @param speed
     */
    public fromTo(end: number, now: number, speed: number = NaN): void {
        if (this._running === true)
            this.stop();

        this._end = end;
        this._now = now;
        if (isNaN(speed) === false)
            this._speed = speed;
        this._running = true;

        this.fn_enterFrame();
    }

    /**
     * 프래임 끝으로
     * @param end
     * @param speed
     */
    public to(end: number, speed: number = NaN): void {
        this.fromTo(end, this._now, speed);
    }
}

Object.freeze(Weich);
export { type IWeich, Weich }
//#endregion