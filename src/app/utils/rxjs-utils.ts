import { from, of } from 'rxjs';

export const stream$ = of(20, 30, 40, 50);
export const sentenceStream$ = from(['Мыши ели кашу', 'Мыши пили пенное пиво']);
export const moneyStream$ = from([
  {
    date: '2016-07-01',
    amount: -320.0,
  },
  {
    date: '2016-07-13',
    amount: 1000.0,
  },
  {
    date: '2016-07-22',
    amount: 45.0,
  },
]);

export const add = (a: number, b: number) => a + b;

export const addSixPercent = (x: number) => 1.06 * x;

export const newRandomNumber = () => Math.floor(Math.random() * 100);

// export const Money = function (currency: string, val: number) {
//   return {
//     value: function () {
//       return val;
//     },
//     currency: function () {
//       return currency;
//     },
//     toString: function () {
//       return `${currency} ${val}`;
//     },
//   };
// };
export class Money {
    private _currency: string;
    private _val: number;

    constructor(currency: string, val: number){
        this._currency = currency;
        this._val = val;
    }

    value () {
      return this._val;
    }
    currency () {
      return this._currency;
    }
    toString() {
      return `${this._currency} ${this._val}`;
    }
};
