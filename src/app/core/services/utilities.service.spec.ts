import { TestBed, getTestBed } from '@angular/core/testing';
import { UtilitiesService } from './utilities.service';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

describe('UtilitiesService', () => {
  let injector: TestBed;
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule],
      providers: [UtilitiesService],
    });

    injector = getTestBed();
    service = injector.get(UtilitiesService);
  });

  it('createFormControl with validator require and has an error = {required: true}', () => {
    const validators = [Validators.required];
    const control = service.createFormControl(validators);
    expect(control.errors).toEqual({ required: true });
  });

  it('createFormControl with validator require set a value and has an error = null', () => {
    const validators = [Validators.required];
    const control = service.createFormControl(validators);
    control.setValue('AAA');
    expect(control.errors).toEqual(null);
  });


  it('createValidators with textInput require and return validators has a length of 3 ', () => {

    const textInput = {
      inputName: '',
      inputLabel: '',
      minLength: 1,
      maxLength: 255,
      isRequired: true,
      maxDate: { year: 2200, month: 1, day: 1 },
      minDate: { year: 1900, month: 1, day: 1 },
      max: 1,
      min: 3,
      hasMax: false,
      decimalPlace: 0,
      isCap: false
    };
    const validators = service.createValidators(textInput);
    expect(validators.length).toEqual(3);
  });


  it('createValidators with textInput not require and return validators has a length of 2 ', () => {

    const textInput = {
      inputName: '',
      inputLabel: '',
      minLength: 1,
      maxLength: 255,
      isRequired: false,
      maxDate: { year: 2200, month: 1, day: 1 },
      minDate: { year: 1900, month: 1, day: 1 },
      max: 1,
      min: 3,
      hasMax: false,
      decimalPlace: 0,
      isCap: false
    };
    const validators = service.createValidators(textInput);
    expect(validators.length).toEqual(2);
  });
});
