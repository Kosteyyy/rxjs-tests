import { Component, EventEmitter, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { fibonacci } from './helpers/fibonacci-generator';
import { BehaviorSubject, bufferCount, from, interval, map, skip, Subscription, switchMap, take, tap, timeInterval, timer } from 'rxjs';
import { testChangingInterval } from './rxjs-examples/changing-interval';
import { concatStream$, mergeStream$ } from './rxjs-examples/concat';
import { Money, newRandomNumber } from './utils/rxjs-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'rxjs-book-angular';
  click = new EventEmitter<boolean>();
  clickStream$ = from(this.click);
  clickSbscrptn: Subscription = this.clickStream$.subscribe(val => console.log('click: ', val));

  price: string = '';

  emitter = new EventEmitter<boolean>();

  //Реализация с использованием эмиттера в качестве триггера
  stream$ = from(this.emitter).pipe(map((val) => this.iter.next()));

  iter = fibonacci();
  functionName: string = 'Value' as const;

  ngOnInit(): void {
    interval(2000).pipe(bufferCount(5)).subscribe(console.log)
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

  startCountPrice() {
    interval(2000).pipe(
      timeInterval(),
      skip(1),
      take(5),
      tap(console.log),
      map(num => { return new Money('RU', newRandomNumber())}),
      tap(price => console.log(price))
    ).subscribe(price => this.price = price.toString())
  }
  

  onClick() {
    console.log('Вы нажали кнопку');
    this.click.emit(true);
    // this.startCountPrice()
  }


}
