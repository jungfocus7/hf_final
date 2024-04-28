/**
 * 배열객체 비어 있는지 확인
 * @param arr
 * @returns
 */
export declare const fn_isArr: (arr: unknown) => boolean;
/**
 * 배열객체 유효성 확인
 * @param arr
 * @returns
 */
export declare const fn_notArr: (arr: unknown) => boolean;
/**
 * 배열에 요소 확인
 * @param arr
 * @param e
 * @returns
 */
export declare const fn_contains: (arr: Array<unknown>, e: unknown) => boolean;
/**
 * 배열 섞기
 * @param arr
 * @returns
 */
export declare const fn_shuffle: (arr: Array<unknown>) => void;
/**
 * 배열 복사
 * @param arr
 * @returns
 */
export declare const fn_copy: (arr: Array<unknown>) => Array<unknown>;
