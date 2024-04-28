import { fn_randRange } from "./hfnum";


/**
 * 배열객체 비어 있는지 확인
 * @param arr
 * @returns
 */
export const fn_isArr = (arr: unknown): boolean => {
    return (Array.isArray(arr) === true) && (arr.length > 0);
};

/**
 * 배열객체 유효성 확인
 * @param arr
 * @returns
 */
export const fn_notArr = (arr: unknown): boolean => {
    if (Array.isArray(arr) === true)
        return arr.length === 0;
    else
        return true;
};

/**
 * 배열에 요소 확인
 * @param arr
 * @param e
 * @returns
 */
export const fn_contains = (arr: Array<unknown>, e: unknown): boolean => {
    if (fn_notArr(arr)) return false;
    if ('includes' in Array)
        return arr.includes(e);
    else {
        return arr.indexOf(e) > 0;
    }
};

/**
 * 배열 섞기
 * @param arr
 * @returns
 */
export const fn_shuffle = (arr: Array<unknown>): void => {
    if (fn_notArr(arr)) return;

    const l: number = arr.length;
    for (let i: number = 0; i < l; ++i) {
        let e: unknown = arr[i];
        let j: number = fn_randRange(0, l - 1);
        arr[i] = arr[j];
        arr[j] = e;
    }
};

/**
 * 배열 복사
 * @param arr
 * @returns
 */
export const fn_copy = (arr: Array<unknown>): Array<unknown> => {
    if (fn_notArr(arr)) return null!;
    return arr.slice();
};
