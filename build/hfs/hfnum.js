export const fn_isNum = (val) => {
    return typeof val === 'number';
};
export const fn_notNum = (val) => {
    return typeof val !== 'number';
};
export const fn_isFloat = (val) => {
    return (val % 1) !== 0;
};
export const fn_isMinus = (val) => {
    return val < 0;
};
export const fn_isOdd = (val) => {
    return (val % 2) > 0;
};
export const fn_isEven = (val) => {
    return (val % 2) === 0;
};
export const fn_random = (val) => {
    return Math.round(Math.random() * (val - 1));
};
export const fn_randRange = (min, max) => {
    return min + Math.round(Math.random() * (max - min));
};
export default {
    fn_isNum, fn_notNum, fn_isFloat, fn_isMinus,
    fn_isOdd, fn_isEven,
    fn_random, fn_randRange,
};
