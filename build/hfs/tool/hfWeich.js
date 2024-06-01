import { eventTypes } from "../hfcom";
;
class Weich extends EventTarget {
    constructor(now, speed = 0.3) {
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
    _running;
    get running() {
        return this._running;
    }
    _end;
    get end() {
        return this._end;
    }
    _now;
    get now() {
        return this._now;
    }
    _speed;
    get speed() {
        return this._speed;
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
    fn_loopFrame() {
        if (this._running === false)
            return;
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
    stop() {
        if (this._running === true) {
            this.fn_clearFrame();
            this._running = false;
        }
    }
    fromTo(end, now, speed = NaN) {
        if (this._running === true)
            this.stop();
        this._end = end;
        this._now = now;
        if (isNaN(speed) === false)
            this._speed = speed;
        this._running = true;
        this.fn_enterFrame();
    }
    to(end, speed = NaN) {
        this.fromTo(end, this._now, speed);
    }
}
Object.freeze(Weich);
export { Weich };
