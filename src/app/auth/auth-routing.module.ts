import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignupComponent} from "./sign-up/sign-up.component";
import {SignoutComponent} from "./signout/signout.component";

const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signout', component: SignoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
