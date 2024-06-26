/**
 * 넘버가 맞는지 확인
 * @param val
 * @returns
 */
export const fn_isNum = (val: unknown): boolean => {
    return typeof val === 'number';
};

/**
 * 넘버가 아닌지 확인
 * @param val
 * @returns
 */
export const fn_notNum = (val: unknown): boolean => {
    return typeof val !== 'number';
};

/**
 * 넘버가 실수인지 확인
 * @param val
 * @returns
 */
export const fn_isFloat = (val: number): boolean => {
    return (val % 1) !== 0;
};

/**
 * 넘버가 음수인지 확인
 * @param val
 * @returns
 */
export const fn_isMinus = (val: number): boolean => {
    return val < 0;
};

/**
 * 넘버가 홀수인지 확인
 * @param val
 * @returns
 */
export const fn_isOdd = (val: number): boolean => {
    return (val % 2) > 0;
};

/**
 * 넘버가 짝수인지 확인
 * @param val
 * @returns
 */
export const fn_isEven = (val: number): boolean => {
    return (val % 2) === 0;
}

/**
 * 난수 만들기 0~n
 * @param val
 * @returns
 */
export const fn_random = (val: number): number => {
    return Math.round(Math.random() * (val - 1));
};

/**
 * 난수 만들기 min~max
 * @param min
 * @param max
 * @returns
 */
export const fn_randRange = (min: number, max: number): number => {
    return min + Math.round(Math.random() * (max - min));
};


export default {
    fn_isNum, fn_notNum, fn_isFloat, fn_isMinus,
    fn_isOdd, fn_isEven,
    fn_random, fn_randRange,
};
