import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CalenderComponent } from '../components/calender/calender.component';
import { ContactComponent } from '../components/contact/contact.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { UserComponent } from '../components/user/user.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'kalender', component: CalenderComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'registreer-gebruiker', component: SignUpComponent },
  {path: 'login', component: SignInComponent },
  {path: 'wachtwoord-vergeten', component: ForgotPasswordComponent },
  {path: 'reset-wachtwoord', component: ResetPasswordComponent },
  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  {path: '', component: HomeComponent}

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
