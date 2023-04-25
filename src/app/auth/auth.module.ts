import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from "./sign-up/sign-up.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    SignInComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule {
}
