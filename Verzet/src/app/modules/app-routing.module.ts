import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { CalenderComponent } from '../components/calender/calender.component';
import { ContactComponent } from '../components/contact/contact.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'kalender', component: CalenderComponent },
  {path: 'contact', component: ContactComponent },
  {path: '', component: HomeComponent}

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
