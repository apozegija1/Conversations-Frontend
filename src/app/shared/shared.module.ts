import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MaterialModule} from '../material.module';
import {LanguageSelectorComponent} from './components/language-selector/language-selector.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AlertComponent} from './components/alert/alert.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {LocalSpinnerComponent} from './components/local-spinner/local-spinner.component';
import {AuthGuard} from './guards/auth.guard';
import {RevealablePasswordComponent} from './components/revealable-password/revealable-password.component';

const SharedComponents = [
  AlertComponent,
  LanguageSelectorComponent,
  NavbarComponent,
  LocalSpinnerComponent,
  RevealablePasswordComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    TranslateModule.forChild({}), // Need to add this here so it can be used inside shared components
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,

    ...SharedComponents
  ],
  declarations: [
    ...SharedComponents
  ],
  providers: [
    AuthGuard
  ]
})
export class SharedModule {
}
