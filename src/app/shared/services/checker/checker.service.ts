import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckerService {

  private _age: number = 0;
  constructor() { }



  public isValidNumber(a: any): boolean {
    return a !== null && a !== undefined && typeof a === 'number' && !isNaN(a)
  }

  public get age() {
    return this._age;
  }

  public set age(value: number) {
    this._age = value;
  }
}
