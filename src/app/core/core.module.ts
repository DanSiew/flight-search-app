import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { throwIfAlreadyLoaded } from './module-import-check';
import { UtilitiesService, NavigationService } from './services';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule // because we use <router-outlet> and routerLink
  ],
  declarations: [],
  exports: [],
  providers: [
    UtilitiesService,
    NavigationService,
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
