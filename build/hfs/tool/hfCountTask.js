//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1) hfCountTask
class hfCountTask {
    constructor(countStart = 1, countEnd = 10, plusValue = 1) {
        this.#countStart = countStart;
        this.#countEnd = countEnd;
        this.#plusValue = plusValue;
        this.#count = countStart;
        Object.seal(this);
    }
    #countStart = 0;
    get countStart() {
        return this.#countStart;
    }
    #countEnd = 0;
    get countEnd() {
        return this.#countEnd;
    }
    #plusValue = 0;
    get plusValue() {
        return this.#plusValue;
    }
    #count = 0;
    get count() {
        return this.#count;
    }
    prev() {
        const cnt = this.#count - this.#plusValue;
        if (cnt < this.#countStart)
            return false;
        else {
            this.#count = cnt;
            return true;
        }
    }
    next() {
        const cnt = this.#count + this.#plusValue;
        if (cnt > this.#countEnd)
            return false;
        else {
            this.#count = cnt;
            return true;
        }
    }
    reset() {
        this.#count = this.#countStart;
    }
    resetEnd() {
        this.#count = this.#countEnd;
    }
}
Object.freeze(hfCountTask);
export { hfCountTask };
//#endregion
