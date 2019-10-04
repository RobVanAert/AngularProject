import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AppComponent } from '../components/app/app.component';
import { CalenderComponent } from '../components/calender/calender.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent },
  {path: 'kalender', component: CalenderComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
