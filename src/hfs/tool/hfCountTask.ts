//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1) hfCountTask
class hfCountTask {
    constructor(countStart: number = 1, countEnd: number = 10, plusValue: number = 1) {
        this.#countStart = countStart;
        this.#countEnd = countEnd;
        this.#plusValue = plusValue;
        this.#count = countStart;

        Object.seal(this);
    }

    #countStart: number = 0;
    public get countStart(): number {
        return this.#countStart;
    }

    #countEnd = 0;
    public get countEnd(): number {
        return this.#countEnd;
    }

    #plusValue = 0;
    public get plusValue(): number {
        return this.#plusValue;
    }

    #count = 0;
    public get count(): number {
        return this.#count;
    }


    public prev(): boolean {
        const cnt: number = this.#count - this.#plusValue;
        if (cnt < this.#countStart)
            return false;
        else {
            this.#count = cnt;
            return true;
        }
    }

    public next(): boolean {
        const cnt: number = this.#count + this.#plusValue;
        if (cnt > this.#countEnd)
            return false;
        else {
            this.#count = cnt;
            return true;
        }
    }


    public reset(): void {
        this.#count = this.#countStart;
    }

    public resetEnd(): void {
        this.#count = this.#countEnd;
    }
}

Object.freeze(hfCountTask);
export { hfCountTask }
//#endregion