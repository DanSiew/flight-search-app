import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TextInputModel } from 'src/app/core/models';

@Component({
  selector: 'app-text-input',
  templateUrl: './app-text-input.component.html',
  styleUrls: ['./app-text-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppTextInputComponent),
    multi: true
  }]
})

export class AppTextInputComponent implements ControlValueAccessor, OnInit {

  constructor() { }

  get value() {
    return this._value;
  }

  set value(val) {
    if (this.textInputModel.isCap && val) {
      this._value = val.toUpperCase();
    } else {
      this._value = val;
    }
    this.onChange(val);
    this.onTouched();
  }

  @Input() _value: any = '';
  @Input() textInputModel: TextInputModel;
  @Input() formControl: FormControl;
  @Input() readonly: boolean = false;
  @Input() inputLabel: string;
  errorInputLabel: string;
  errorInputId: string;

  validate: ErrorStateMatcher = {
    isErrorState: () => {
      let showError: boolean | any = false;
      if (this.formControl && this.formControl.errors) {
        showError = (this.formControl.dirty || this.formControl.touched);
      }
      return showError;
    }
  };


  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit(): void {
    if (this.textInputModel) {
      if (this.inputLabel === undefined || this.inputLabel === '') {
        this.inputLabel = this.textInputModel.inputLabel;
      }
      this.errorInputLabel = this.inputLabel;
      this.errorInputId = 'Id_' + this.textInputModel.inputName;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setRequired(): boolean {
    return this.textInputModel.isRequired;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    } else {
      this.value = '';
      if (this.formControl.dirty || this.formControl.touched) {
        this.formControl.markAsUntouched();
        this.formControl.markAsPristine();
      }

    }
  }
}

