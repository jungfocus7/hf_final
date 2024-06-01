export const fn_isStr = (val) => {
    if (typeof val === 'string')
        return val.trim() !== '';
    else
        return false;
};
export const fn_notStr = (val) => {
    if (typeof val === 'string')
        return val.trim() === '';
    else
        return true;
};
export const fn_getLastNum = (val, tk = '_') => {
    const fi = val.lastIndexOf(tk) + 1;
    return ~~val.substring(fi);
};
export const fn_str2Ab = (val) => {
    const l = val.length;
    let rab = new Uint16Array(new ArrayBuffer(l * 2));
    for (let i = 0; i < l; ++i) {
        rab[i] = val.charCodeAt(i);
    }
    return rab;
};
export const fn_ab2Str = (ab) => {
    return String.fromCharCode.apply(null, Array.from(ab));
};
export default {
    fn_isStr, fn_notStr,
    fn_getLastNum,
    fn_str2Ab, fn_ab2Str,
};
