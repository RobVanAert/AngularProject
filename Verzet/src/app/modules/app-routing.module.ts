import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CalenderComponent } from '../components/calender/calender.component';
import { ContactComponent } from '../components/contact/contact.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'kalender', component: CalenderComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'registreer-gebruiker', component: SignUpComponent },
  {path: 'login', component: SignInComponent },
  {path: 'wachtwoord-vergeten', component: ForgotPasswordComponent },
  {path: '', component: HomeComponent}

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
