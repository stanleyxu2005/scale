// 参考 d3-linear nice 的实现
// https://github.com/d3/d3-scale

import { tickIncrement } from './tick-utils';

export function d3LinearNice(domain: number[], count: number = 10) {
  const d = domain.slice();
  let i0 = 0;
  let i1 = domain.length - 1;
  let start = domain[i0];
  let stop = domain[i1];
  let step;

  if (stop < start) {
    [start, stop] = [stop, start];
    [i0, i1] = [i1, i0];
  }
  step = tickIncrement(start, stop, count);

  if (step > 0) {
    start = Math.floor(start / step) * step;
    stop = Math.ceil(stop / step) * step;
    step = tickIncrement(start, stop, count);
  } else if (step < 0) {
    start = Math.ceil(start * step) / step;
    stop = Math.floor(stop * step) / step;
    step = tickIncrement(start, stop, count);
  }

  if (step > 0) {
    d[i0] = Math.floor(start / step) * step;
    d[i1] = Math.ceil(stop / step) * step;
  } else if (step < 0) {
    d[i0] = Math.ceil(start * step) / step;
    d[i1] = Math.floor(stop * step) / step;
  }
  return d;
}
