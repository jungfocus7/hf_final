declare class hfCountTask {
    #private;
    constructor(countStart?: number, countEnd?: number, plusValue?: number);
    get countStart(): number;
    get countEnd(): number;
    get plusValue(): number;
    get count(): number;
    prev(): boolean;
    next(): boolean;
    reset(): void;
    resetEnd(): void;
}
export { hfCountTask };
