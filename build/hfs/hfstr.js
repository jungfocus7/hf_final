/**
 * 문자열 유효성 확인
 * @param val
 * @returns
 */
export const fn_isStr = (val) => {
    if (typeof val === 'string')
        return val.trim() !== '';
    else
        return false;
};
/**
 * 문자열 부정 확인
 * @param val
 * @returns
 */
export const fn_notStr = (val) => {
    if (typeof val === 'string')
        return val.trim() === '';
    else
        return true;
};
/**
 * 이름에서 마지막 번호 확인
 * @param val
 * @param tk - 토큰
 * @returns
 */
export const fn_getLastNum = (val, tk = '_') => {
    const fi = val.lastIndexOf(tk) + 1;
    return ~~val.substring(fi);
};
/**
 * String >> Uint16Array 변환
 * @param val
 * @returns
 */
export const fn_str2Ab = (val) => {
    const l = val.length;
    let rab = new Uint16Array(new ArrayBuffer(l * 2));
    for (let i = 0; i < l; ++i) {
        rab[i] = val.charCodeAt(i);
    }
    return rab;
};
/**
 * Uint16Array >> String 변환
 * @param ab 배열버퍼
 * @returns
 */
export const fn_ab2Str = (ab) => {
    return String.fromCharCode.apply(null, Array.from(ab));
};
