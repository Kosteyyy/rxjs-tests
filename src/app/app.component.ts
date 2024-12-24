import { Component, EventEmitter, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { fibonacci } from './helpers/fibonacci-generator';
import { BehaviorSubject, from, interval, map, switchMap, tap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'rxjs-book-angular';

  emitter = new EventEmitter<boolean>();

  stream$ = from(this.emitter).pipe(map((val) => this.iter.next()));

  iter = fibonacci();
  functionName: string = 'Value' as const;

  ngOnInit(): void {
    // this.stream$.subscribe(console.log);
    this.testChangingInterval();
  }

  startTask() {
    // console.log("Число фибоначчи", this.iter.next().value);
    this.emitter.emit(true);
  }

  private defineValue(val: number) {
    console.log(val);
  }

  private testChangingInterval() {
    const intervalTime$ = new BehaviorSubject<number>(3000);
    let count = 0;
    let prevCount = 0;
    const intervalStream$ = intervalTime$.pipe(switchMap((intervalTime) => timer(intervalTime)),
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
}
