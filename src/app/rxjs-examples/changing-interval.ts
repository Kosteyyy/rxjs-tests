import { BehaviorSubject, interval, switchMap, tap } from "rxjs";

export function testChangingInterval() {
    const intervalTime$ = new BehaviorSubject<number>(3000);
    let count = 0;
    let prevCount = 0;
    const intervalStream$ = intervalTime$.pipe(switchMap((intervalTime) => interval(intervalTime)),
      tap((intervalTime) => {
        if (++count - prevCount > 10) {
          prevCount = count;
          intervalTime$.next(intervalTime$.value + 10000);
        }
      }
    ));
    intervalStream$.subscribe((intervalTime) => {
      console.log('ИНТЕРВАЛ, count: ', intervalTime$.value, count);
    });
  }