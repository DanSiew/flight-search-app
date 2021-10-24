import {
  Component, Input, forwardRef, Injectable, OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent, ErrorStateMatcher, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import * as moment from 'moment';
import { TextInputModel } from 'src/app/core/models';


export class AppDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: string): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    } else {
      return date.toDateString();
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const APP_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
  },
  display: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};
@Component({
  selector: 'app-datepicker',
  templateUrl: './app-datepicker.component.html',
  styleUrls: ['./app-datepicker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AppDatepickerComponent),
    multi: true
  }, {
    provide: DateAdapter, useClass: AppDateAdapter
  }, {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }]
})
@Injectable()
export class AppDatepickerComponent implements ControlValueAccessor, OnInit {

  constructor() { }


  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }
  @Input() _value: any = {};
  @Input() textInputModel: TextInputModel;
  @Input() formControl: FormControl;
  @Input() readonly: boolean = true;
  @Input() disable: boolean = false;
  @Input() inputLabel: string;
  @Input() minDate: Date = new Date(1900, 1, 1);
  errorInputLabel: string;
  errorInputId: string;
  maxDate: Date = new Date(2200, 1, 1);
  isOpen: boolean = false;
  datepickerControl: FormControl = new FormControl();

  validate: ErrorStateMatcher = {
    isErrorState: () => {
      let showError: boolean | any;
      if (this.datepickerControl && this.datepickerControl.errors) {
        showError = (this.datepickerControl.dirty || this.datepickerControl.touched);
      }
      return showError;
    }
  };
  onChange: any = () => { };
  onTouched: any = () => { };
  ngOnInit(): void {
    if (this.textInputModel.minDate) {
      this.minDate = this.textInputModel.minDate;
    }
    if (this.textInputModel.maxDate) {
      this.maxDate = this.textInputModel.maxDate;
    }
    if (this.textInputModel) {
      if (this.inputLabel === undefined || this.inputLabel === '') {
        this.inputLabel = this.textInputModel.inputLabel;
      }
      this.errorInputLabel = this.inputLabel;
      this.errorInputId = 'Id_' + this.textInputModel.inputName;
    }

    this.formControl.valueChanges.subscribe(() => {
      if (this.formControl.disabled) {
        this.datepickerControl = this.formControl;
      }
    });
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
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

  dateChangeEvent(event: MatDatepickerInputEvent<Date>) {
    if (event.value !== null) {
      const valueDate: Date = new Date(event.value.getFullYear(), event.value.getMonth(), event.value.getDate());
      const momentDate: moment.Moment = moment(valueDate);
      this.value = momentDate.format('YYYY-MM-DD');
    }
  }
  keyPress(event: any): boolean {
    let result: boolean = this.checkChar(event);
    if (result) {
      result = (this._value.length >= this.textInputModel.maxLength) ? false : true;
    }
    return result;
  }
  checkChar(e: any): boolean {
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    if (e.which === 47) {
      return true;
    }
    let input;
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }
  focusFunction(): void {
    this.datepickerControl = this.formControl;
  }
  setRequired(): boolean {
    return this.textInputModel.isRequired;
  }
}
