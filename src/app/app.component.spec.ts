import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
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
        AppComponent
      ],
      imports: [ReactiveFormsModule]
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
  })

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

  it(`should have as title 'unit-test'`, () => {
    expect(app.title).toBe('unit-test');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('unit-test app is running!');
  });
});
