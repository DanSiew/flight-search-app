import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { ErrorMessageViewModel } from 'src/app/core/constants';

@Component({
  selector: 'app-show-errors',
  template: `<ul [id]="inputId" class="list-unstyled mt-0 mb-0" *ngIf="shouldShowErrors()" >
         <li class="text-danger" *ngFor="let error of listOfErrors()">{{error}}</li></ul>`
})

export class ShowErrorsComponent {

  private static readonly errorMessages: any = {
    required: (params: any) => params.inputLabel + ErrorMessageViewModel.required,
    minlength: (params: any) => params.inputLabel + ErrorMessageViewModel.minlength + params.requiredLength,
    maxlength: (params: any) => params.inputLabel + ErrorMessageViewModel.maxlength + params.requiredLength,
    pattern: (params: any) => params.inputLabel + ErrorMessageViewModel.pattern,
    min: (params: any) => params.inputLabel + ErrorMessageViewModel.min + params.minValue,
    max: (params: any) => params.inputLabel + ErrorMessageViewModel.max + params.maxValue,
    matDatepickerParse: (params: any) => params.inputLabel + ErrorMessageViewModel.matDatepickerParse,
    sameDepartCode: (params: any) => params.inputLabel + ErrorMessageViewModel.sameDepartCode,
    returnDate: (params: any) => params.inputLabel + ErrorMessageViewModel.returnDate,
    notFound: (params: any) => params.inputLabel + ErrorMessageViewModel.notFound
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;
  @Input()
  private inputLabel: string = '';
  @Input()
  public inputId: string = '';

  shouldShowErrors(): boolean | any {
    let showError: boolean | any;
    if (this.control && this.control.errors) {
      showError = (this.control.dirty || this.control.touched);
    }
    return showError;
  }

  listOfErrors(): string[] | any {
    // material date errors for min date
    if (this.control.errors && this.control.errors.matDatepickerMin) {
      const minDate: Date = this.control.errors.matDatepickerMin.min;
      const errs: string[] = [];
      const momentDate: moment.Moment = moment(minDate);
      errs.push(this.inputLabel.replace('*', '') + ErrorMessageViewModel.min + momentDate.format('DD/MM/YYYY'));
      return errs;
    }
    // material date errors for max date
    if (this.control.errors && this.control.errors.matDatepickerMax) {
      const maxDate: Date = this.control.errors.matDatepickerMax.max;
      const errs: string[] = [];
      const momentDate: moment.Moment = moment(maxDate);
      errs.push(this.inputLabel.replace('*', '') + ErrorMessageViewModel.max + momentDate.format('DD/MM/YYYY'));
      return errs;
    }

    const errors: any = this.control.errors;
    const errObj = Object.keys(errors)
      .map((field: any) => this.getMessage(field, errors[field]));
    return errObj;
  }

  private getMessage(type: string, input: any): string {
    const params = {
      inputLabel: this.inputLabel.replace('*', ''),
      requiredLength: 0,
      maxValue: 0,
      minValue: 0,
      message: ''
    };
    if (type === 'minlength' || type === 'maxlength') {
      params.requiredLength = input.requiredLength;
    }
    if (type === 'max') {
      params.maxValue = input.max;
    }
    if (type === 'min') {
      params.minValue = input.min;
    }

    params.message = input.message ? input.message : '';

    const errMsg = ShowErrorsComponent.errorMessages[type](params);
    return errMsg;
  }

}
