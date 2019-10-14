import { NgModule } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent
  ],
  imports: [
    SharedModule
  ]
})
export class UserModule { }
