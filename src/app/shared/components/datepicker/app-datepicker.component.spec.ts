import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ShowErrorsComponent } from '../show-error/app-show-error.component';
import { AppDatepickerComponent } from './app-datepicker.component';

describe('Component: App Datepicker', () => {

  let component: AppDatepickerComponent;
  let fixture: ComponentFixture<AppDatepickerComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppDatepickerComponent,
        ShowErrorsComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatInputModule,
        NoopAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule

      ],
      providers: []
    });

    // create component and test fixture
    fixture = TestBed.createComponent(AppDatepickerComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    component.textInputModel = {
      inputName: 'Test',
      inputLabel: 'Test Date',
      minLength: 20,
      maxLength: 20,
      isRequired: true,
      maxDate: { year: 2200, month: 1, day: 1 },
      minDate: { year: 1900, month: 1, day: 1 },
      max: 0,
      min: 0,
      hasMax: false,
      decimalPlace: 0,
      isCap: false
    };
    component.formControl = new FormControl('');
    fixture.detectChanges();
  });


  it('should be setting inputName="TestDate"', async(() => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      component.textInputModel.inputName = 'TestDate';
      fixture.detectChanges();
      expect(input.nativeElement.id).toBe('TestDate');
    });
  }));

  it('should be setting value to 01/12/2019', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      const el = input.nativeElement;
      el.value = '1/1/2020';
      el.dispatchEvent(new Event('input'));
      expect(fixture.nativeElement.querySelector('input').value).toBe('1/1/2020');
    });
  }));
});

