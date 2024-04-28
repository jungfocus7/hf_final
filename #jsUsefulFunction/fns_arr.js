const fn_range = (start, end, step) => {
  if ((Number.isFinite(start) === false) ||
      (Number.isFinite(end) === false))
    return null;

  if (start === end)
    return [start];

  if ((Number.isFinite(step) === false) || (step === 0))
    return [start, end];

  const diff = Math.abs(start - end);
  const len = Math.max(Math.floor(diff / step), 0);
  const plus = end > start ? step : -step;

  const arr = Array(len);
  let now = start;

  for (let i = 0; i <= len; ++i) {
    arr[i] = now;
    now += plus;
  }

  return arr;
};

console.log(fn_range(0, 7, 1));
console.log(fn_range(50, 100, 10));
console.log(fn_range(900, 800, 17));
console.log(fn_range(3321.231, 1947.934, 333.93));
console.log(fn_range(987, 91, 135));
console.log(fn_range(987, 91));
console.log(fn_range());
console.log(fn_range(5, 1));
console.log(fn_range(70, 1, 1));




// const _arr: Array<string> = Array.from('fcade13lpx[]rfxaz');
// const _r1: string = _arr.reduce((tx: string, ty: string): string => {
//   return (ty > tx) ? ty : tx;
// });
// console.log(_r1);