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
import { SecureInnerPagesGuard } from '../guards/secure-inner-pages.guard';
import { NewMemberEditorComponent } from '../components/contact/new-member-editor/new-member-editor.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'kalender', component: CalenderComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'lid-worden', component: NewMemberEditorComponent },
  {path: 'registreer-gebruiker', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] }, // only accesible for admin; guard must still be written
  {path: 'login', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  {path: 'wachtwoord-vergeten', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  {path: 'reset-wachtwoord', component: ResetPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard] },
  {path: '', redirectTo: '/home', pathMatch: 'full'}

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
