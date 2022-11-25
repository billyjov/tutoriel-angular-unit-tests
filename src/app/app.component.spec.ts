import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

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

  it('changeAge() should change correctly', () => {
    expect(app.age).toBe(1);

    app.changeAge();

    expect(app.age).toBe(12);
  });

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
