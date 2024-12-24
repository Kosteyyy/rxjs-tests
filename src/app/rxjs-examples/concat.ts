import { concat, interval, map, merge, take } from "rxjs";

const streamToConcat1$ = interval(5000).pipe(map(val => `Поток 1, значение № ${val}` ), take(5))
const streamToConcat2$ = interval(3000).pipe(map(val => `Поток 2, значение № ${val}` ), take(5))

export const concatStream$ = concat(streamToConcat1$, streamToConcat2$);

export const mergeStream$ = merge(streamToConcat1$, streamToConcat2$);