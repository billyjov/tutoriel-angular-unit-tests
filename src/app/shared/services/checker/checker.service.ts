import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckerService {

  constructor() { }


  public isValidNumber(a: any): boolean {
    return a !== null && a !== undefined && typeof a === 'number' && !isNaN(a)
  }
}
