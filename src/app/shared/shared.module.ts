import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTextInputComponent } from './components/text-input/app-text-input.component';
import { ShowErrorsComponent } from './components/show-error/app-show-error.component';
import { MaterialModule } from '../material/material.module';
import { AppDatepickerComponent } from './components/datepicker/app-datepicker.component';



@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [FormsModule, ReactiveFormsModule, AppTextInputComponent, AppDatepickerComponent, ShowErrorsComponent],
  declarations: [AppTextInputComponent, AppDatepickerComponent, ShowErrorsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
