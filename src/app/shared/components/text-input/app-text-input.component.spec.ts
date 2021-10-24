import { By } from '@angular/platform-browser';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AppTextInputComponent } from './app-text-input.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ShowErrorsComponent } from '../show-error/app-show-error.component';

describe('Component: App Text Input', () => {

  let component: AppTextInputComponent;
  let fixture: ComponentFixture<AppTextInputComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppTextInputComponent,
        ShowErrorsComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      providers: []
    });

    // create component and test fixture
    fixture = TestBed.createComponent(AppTextInputComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    component.textInputModel = {
      inputName: '',
      inputLabel: '',
      minLength: 1,
      maxLength: 255,
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


  it('should be setting inputName="Test"', async(() => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      component.textInputModel.inputName = 'Test';
      fixture.detectChanges();
      expect(input.nativeElement.id).toBe('Test');
    });
  }));

  it('should be setting value to someValue', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input'));
      const el = input.nativeElement;
      el.value = 'someValue';
      el.dispatchEvent(new Event('input'));
      expect(fixture.componentInstance.value).toBe('someValue');
    });
  }));
});

