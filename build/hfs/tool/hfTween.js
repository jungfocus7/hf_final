import { eventTypes } from "../hfcom";
export const easeBack = Object.freeze({
    easeIn(t, b, c, d, s = 1.70158) {
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOut(t, b, c, d, s = 1.70158) {
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOut(t, b, c, d, s = 1.70158) {
        if ((t /= d / 2) < 1)
            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    }
});
export const easeBounce = Object.freeze({
    easeIn(t, b, c, d) {
        return c - easeBounce.easeOut(d - t, 0, c, d) + b;
    },
    easeOut(t, b, c, d) {
        if ((t /= d) < (1 / 2.75))
            return c * (7.5625 * t * t) + b;
        else if (t < (2 / 2.75))
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        else if (t < (2.5 / 2.75))
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        else
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    },
    easeInOut(t, b, c, d) {
        if (t < d / 2)
            return easeBounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
        else
            return easeBounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
});
export const easeCircular = Object.freeze({
    easeIn(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1)
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }
});
export const easeElastic = Object.freeze({
    easeIn(t, b, c, d, a = 0, p = 0) {
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * 0.3;
        let s;
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
    easeOut(t, b, c, d, a = 0, p = 0) {
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * 0.3;
        let s;
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
    easeInOut(t, b, c, d, a = 0, p = 0) {
        if (t == 0)
            return b;
        if ((t /= d / 2) == 2)
            return b + c;
        if (!p)
            p = d * (0.3 * 1.5);
        let s;
        if (!a || a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    }
});
export const easeExponential = Object.freeze({
    easeIn(t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut(t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut(t, b, c, d) {
        if (t == 0)
            return b;
        if (t == d)
            return b + c;
        if ((t /= d / 2) < 1)
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});
;
class Tween extends EventTarget {
    /**
     * Tween 객체
     * @param current
     * @param duration
     * @param ease
     */
    constructor(current = 0, duration = 36, ease = null) {
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
    _running;
    /** 작동중인 여부 */
    get running() {
        return this._running;
    }
    _begin;
    /** 시작값 */
    get begin() {
        return this._begin;
    }
    _end;
    /** 끝값 */
    get end() {
        return this._end;
    }
    /** 변화량 */
    _diff;
    get diff() {
        return this._diff;
    }
    _current;
    /** 현재값 */
    get current() {
        return this._current;
    }
    _time;
    /** 시간값 */
    get time() {
        return this._time;
    }
    _duration;
    /** 진행시간 */
    get duration() {
        return this._duration;
    }
    _ease;
    /** 이징함수 */
    get ease() {
        return this._ease;
    }
    _fid;
    fn_clearFrame() {
        if (this._fid === -1)
            return;
        cancelAnimationFrame(this._fid);
        this._fid = -1;
    }
    _frameBinder = null;
    fn_enterFrame() {
        if (this._frameBinder === null) {
            this._frameBinder = this.fn_loopFrame.bind(this);
        }
        this._fid = requestAnimationFrame(this._frameBinder);
    }
    fn_loopFrame(time = null) {
        if (this._running === false)
            return;
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
    stop() {
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
    fromTo(begin, end) {
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
    to(end) {
        this.fromTo(this._current, end);
    }
}
;
Object.freeze(Tween);
export { Tween };
//#endregion
