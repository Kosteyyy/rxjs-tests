import { Component, EventEmitter, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { fibonacci } from './helpers/fibonacci-generator';
import { BehaviorSubject, from, interval, map, switchMap, tap, timer } from 'rxjs';
import { testChangingInterval } from './rxjs-examples/changing-interval';
import { concatStream$, mergeStream$ } from './rxjs-examples/concat';

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

  //Реализация с использованием эмиттера в качестве триггера
  stream$ = from(this.emitter).pipe(map((val) => this.iter.next()));

  iter = fibonacci();
  functionName: string = 'Value' as const;

  ngOnInit(): void {
    // this.stream$.subscribe(console.log);
    // testChangingInterval();
    // concatStream$.subscribe(val => console.log("CONCAT STREAM ", val)); // Выводит сначала 5 значений потока 1 потом 5 значений потока 2
    mergeStream$.subscribe(val => console.log("Merge STREAM ", val)); // Выводит По мере эмитирования 2-1-2-2-1-2-1-2-1-1 

  }

  startTask() {
    // console.log("Число фибоначчи", this.iter.next().value);
    this.emitter.emit(true);
  }

  private defineValue(val: number) {
    console.log(val);
  }


}
