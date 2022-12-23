import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unit-test';
  public age: number = 1;

  constructor(private fb: FormBuilder) { }


  public get name(): string {
    return 'coulisses learn';
  }

  public changeAge(): void {
    this.age = 12;
  }

  public calc(a: number, b: number): number {


    return this.multiply(a, b);
  }

  private multiply(a: number, b: number): number {
    return a * b;
  }
}
