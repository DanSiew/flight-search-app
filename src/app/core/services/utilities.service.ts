import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TextInputModel } from '../models';


@Injectable()
export class UtilitiesService {

  public createFormControl(validators: Validators): FormControl {
    return new FormControl('', validators);
  }

  public createValidators(input: TextInputModel): Validators[] {
    let validators: Validators[];
    if (input.isRequired) {
      validators = [
        Validators.required,
        Validators.minLength(input.minLength),
        Validators.maxLength(input.maxLength)];
    } else {
      validators = [
        Validators.minLength(input.minLength),
        Validators.maxLength(input.maxLength)];
    }
    return validators;
  }

}
