import { fn_randRange } from "./hfnum";
export const fn_isArr = (arr) => {
    return (Array.isArray(arr) === true) && (arr.length > 0);
};
export const fn_notArr = (arr) => {
    if (Array.isArray(arr) === true)
        return arr.length === 0;
    else
        return true;
};
export const fn_contains = (arr, e) => {
    if (fn_notArr(arr))
        return false;
    if ('includes' in Array)
        return arr.includes(e);
    else {
        return arr.indexOf(e) > 0;
    }
};
export const fn_shuffle = (arr) => {
    if (fn_notArr(arr))
        return;
    const l = arr.length;
    for (let i = 0; i < l; ++i) {
        let e = arr[i];
        let j = fn_randRange(0, l - 1);
        arr[i] = arr[j];
        arr[j] = e;
    }
};
export const fn_copy = (arr) => {
    if (fn_notArr(arr))
        return null;
    return arr.slice();
};
export default {
    fn_isArr, fn_notArr, fn_contains, fn_shuffle, fn_copy
};
