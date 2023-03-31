import {  NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { findChildComponent } from './shared/helpers/testing-helpers';
import { CheckerService } from './shared/services/checker/checker.service';

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toBeCorrect(): void;
    }
  }
}


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let checkerService: CheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  beforeEach(() => {
    jasmine.addMatchers({
      toBeCorrect: () => {

        return {
          compare: (actual: number, expected: number) => {
            let response: { pass: boolean, message: string } = {} as any;
            response.pass = (actual < 5 && actual > 2);
            response.message = 'ca ne fonctionne pas';
            return response;
          }
        }
      }
    });

    checkerService = TestBed.inject(CheckerService);
  });

  it('should check initial amount value from accounting', () => {
    expect(app.getInitialFullAmount()).toEqual(120);
  });

  it('should check if app-accounting is present', () => {
    const accounting = findChildComponent<AppComponent>(fixture, 'app-accounting');
    expect(accounting).toBeTruthy();
  });

  it('should add data binding correctly @Input()', () => {
    const accounting = findChildComponent<AppComponent>(fixture, 'app-accounting');

    fixture.detectChanges();

    expect(accounting.properties['amount']).toBe(7)
  });


  it('should verify amount change @Output()', () => {

    expect(app.currentAmount).toBe(0);

    const accounting = findChildComponent<AppComponent>(fixture, 'app-accounting');

    accounting.triggerEventHandler('amountChange', 10);

    expect(app.currentAmount).toBe(10);
  });

  it('should be check if smaller than 5 and greater than 2', () => {
    expect(3).toBeCorrect()
  });


  describe('calc(...)', () => {
    it('should multiply two number correctly', () => {
      const result = app.calc(2, 4);

      expect(result).toBe(8);
    });

    it('should verify that isValidNumber was called', () => {
      let spyIsValidNumber: jasmine.Spy;
      const spyAge: jasmine.Spy = spyOnProperty(checkerService, 'age', 'get');

      spyIsValidNumber = spyOn(checkerService, 'isValidNumber').and.returnValue(true);
      const result = app.calc(2, 4);

      expect(result).toBe(8);
      expect(spyIsValidNumber).toHaveBeenCalled();
      expect(spyIsValidNumber).toHaveBeenCalledTimes(1);
      expect(spyAge).toHaveBeenCalled();

      expect(spyIsValidNumber).toHaveBeenCalledWith(jasmine.any(Number));
      expect(spyIsValidNumber).not.toHaveBeenCalledWith(jasmine.any(Array));
    });
  });


  describe('changeAge()', () => {
    it('should change correctly', () => {
      expect(app.age).toBe(1);

      app.changeAge();

      expect(app.age).toBe(12);
    });

    xit('should be defined', () => {
      expect(app.changeAge()).toBeDefined();
    });

  })

  it('name() should be a string', () => {
    expect(app.name).not.toBeInstanceOf(Number);
    expect(app.name).toBe('coulisses learn');
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
