/**
 * 문자열 유효성 확인
 * @param val
 * @returns
 */
export declare const fn_isStr: (val: unknown) => boolean;
/**
 * 문자열 부정 확인
 * @param val
 * @returns
 */
export declare const fn_notStr: (val: unknown) => boolean;
/**
 * 이름에서 마지막 번호 확인
 * @param val
 * @param tk - 토큰
 * @returns
 */
export declare const fn_getLastNum: (val: string, tk?: string) => number;
/**
 * String >> Uint16Array 변환
 * @param val
 * @returns
 */
export declare const fn_str2Ab: (val: string) => Uint16Array;
/**
 * Uint16Array >> String 변환
 * @param ab 배열버퍼
 * @returns
 */
export declare const fn_ab2Str: (ab: Uint16Array) => String;
