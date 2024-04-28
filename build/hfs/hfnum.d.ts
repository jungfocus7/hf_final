/**
 * 넘버가 맞는지 확인
 * @param val
 * @returns
 */
export declare const fn_isNum: (val: unknown) => boolean;
/**
 * 넘버가 아닌지 확인
 * @param val
 * @returns
 */
export declare const fn_notNum: (val: unknown) => boolean;
/**
 * 넘버가 실수인지 확인
 * @param val
 * @returns
 */
export declare const fn_isFloat: (val: number) => boolean;
/**
 * 넘버가 음수인지 확인
 * @param val
 * @returns
 */
export declare const fn_isMinus: (val: number) => boolean;
/**
 * 넘버가 홀수인지 확인
 * @param val
 * @returns
 */
export declare const fn_isOdd: (val: number) => boolean;
/**
 * 넘버가 짝수인지 확인
 * @param val
 * @returns
 */
export declare const fn_isEven: (val: number) => boolean;
/**
 * 난수 만들기 0~n
 * @param val
 * @returns
 */
export declare const fn_random: (val: number) => number;
/**
 * 난수 만들기 min~max
 * @param min
 * @param max
 * @returns
 */
export declare const fn_randRange: (min: number, max: number) => number;
