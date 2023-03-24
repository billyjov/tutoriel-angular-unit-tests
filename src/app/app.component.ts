import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckerService } from './shared/services/checker/checker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unit-test';
  public age: number = 1;
  public currentAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private checkerService: CheckerService
  ) { }


  public handleAmountChange(amount: number): void {
    this.currentAmount = amount;
  }


  public get name(): string {
    return 'coulisses learn';
  }

  public changeAge(): void {
    this.age = 12;
  }

  public calc(a: any, b: number): number {
    if (this.checkerService.isValidNumber(a)) {
      const age = this.checkerService.age;
      return this.multiply(a, b);
    }

    throw new Error('sorry it is not a valid number');
  }

  private multiply(a: number, b: number): number {
    return a * b;
  }
}
