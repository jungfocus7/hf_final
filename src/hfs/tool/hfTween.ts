import { eventTypes } from "../hfcom";


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 0)
/** 이즈함수 타입 */
export type EaseFunction = (...args: Array<number>) => number;

/** 이즈함수그룹 타입 */
export type EaseFunctionGroup = {
    easeIn: EaseFunction, easeOut: EaseFunction, easeInOut: EaseFunction,
};

export const easeBack: Readonly<EaseFunctionGroup> = Object.freeze({
	easeIn(t: number, b: number, c: number, d: number, s: number = 1.70158): number {
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	easeOut(t: number, b: number, c: number, d: number, s: number = 1.70158): number {
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	easeInOut(t: number, b: number, c: number, d: number, s: number = 1.70158): number {
		if ((t /= d / 2) < 1)
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	}
});

export const easeBounce: Readonly<EaseFunctionGroup> = Object.freeze({
	easeIn(t: number, b: number, c: number, d: number): number {
        return c - easeBounce.easeOut(d - t, 0, c, d) + b;
	},
	easeOut(t: number, b: number, c: number, d: number): number {
        if ((t /= d) < (1 / 2.75))
            return c * (7.5625 * t * t) + b;
        else if (t < (2 / 2.75))
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        else if (t < (2.5 / 2.75))
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        else
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	easeInOut(t: number, b: number, c: number, d: number): number {
        if (t < d/2)
            return easeBounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
        else
            return easeBounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
});

export const easeCircular: Readonly<EaseFunctionGroup> = Object.freeze({
	easeIn(t: number, b: number, c: number, d: number): number {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},
	easeOut(t: number, b: number, c: number, d: number): number {
		return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
	},
	easeInOut(t: number, b: number, c: number, d: number): number {
		if ((t /= d / 2) < 1)
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}
});

export const easeElastic: Readonly<EaseFunctionGroup> = Object.freeze({
	easeIn(t: number, b: number, c: number, d: number, a: number = 0, p: number = 0): number {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * 0.3;
		let s: number;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) *
				 Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	easeOut(t: number, b: number, c: number, d: number, a: number = 0, p: number = 0): number {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * 0.3;
		let s: number;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) *
			   Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	easeInOut(t: number, b: number, c: number, d: number, a: number = 0, p: number = 0): number {
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (0.3 * 1.5);
		let s: number;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				   Math.sin((t * d - s) * (2 * Math.PI) /p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			   Math.sin((t * d - s) * (2 * Math.PI) / p ) * 0.5 + c + b;
	}
});

export const easeExponential: Readonly<EaseFunctionGroup> = Object.freeze({
	easeIn(t: number, b: number, c: number, d: number): number {
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},
	easeOut(t: number, b: number, c: number, d: number): number {
		return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},
	easeInOut(t: number, b: number, c: number, d: number): number {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1)
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});
//#endregion


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1)
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
};
class Tween extends EventTarget implements ITween {
    /**
     * Tween 객체
     * @param current
     * @param duration
     * @param ease
     */
    public constructor(current: number = 0, duration: number = 36, ease: EaseFunction = null!) {
        super();

        this._running = false;
        this._begin = current;
        this._end = current;
        this._diff = current;
        this._current = current;
        this._time = 0;
        this._duration = duration;
        this._ease = ease;
        this._fid = -1;

        Object.seal(this);
    }

    private _running: boolean;
    /** 작동중인 여부 */
    public get running(): boolean {
        return this._running;
    }

    private _begin: number;
    /** 시작값 */
    public get begin(): number {
        return this._begin;
    }

    private _end: number;
    /** 끝값 */
    public get end(): number {
        return this._end;
    }

    /** 변화량 */
    private _diff: number;
    public get diff(): number {
        return this._diff;
    }

    private _current: number;
    /** 현재값 */
    public get current(): number {
        return this._current;
    }

    private _time: number;
    /** 시간값 */
    public get time(): number {
        return this._time;
    }

    private _duration: number;
    /** 진행시간 */
    public get duration(): number {
        return this._duration;
    }

    private _ease: EaseFunction;
    /** 이징함수 */
    public get ease(): EaseFunction {
        return this._ease;
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

    private fn_loopFrame(time: DOMHighResTimeStamp = null!): void {
        if (this._running === false) return;

        if (this._time < this._duration) {
            ++this._time;
            this._current = this._ease(this._time, this._begin, this._diff, this._duration);

            // console.log(time, this._time, this._current);
            this.dispatchEvent(new Event(eventTypes.UPDATE));

            if (this._time >= this._duration) {
                this.dispatchEvent(new Event(eventTypes.END));
                this.stop();
            }
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
     * @param begin
     * @param end
     */
    public fromTo(begin: number, end: number): void {
        if (this._running === true)
            this.stop();

        this._time = 0;
        this._begin = begin;
        this._end = end;
        this._diff = end - begin;
        this._current = begin;
        this._running = true;

        this.fn_enterFrame();
    }

    /**
     * 프래임 끝으로
     * @param end
     */
    public to(end: number): void {
        this.fromTo(this._current, end);
    }
};

Object.freeze(Tween);
export { type ITween, Tween }
//#endregion