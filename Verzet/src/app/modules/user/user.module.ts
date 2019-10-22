import { NgModule } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { SignInComponent } from 'src/app/components/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ResetPasswordComponent } from '../../components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    UserComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    SharedModule,
  ]
})
export class UserModule { }
