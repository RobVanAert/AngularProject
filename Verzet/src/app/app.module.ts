import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import localeNl from '@angular/common/locales/nl';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { LayoutModule } from '@angular/cdk/layout';
import { DateAdapter } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { MaterialModule } from './modules/shared/material.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CalenderComponent } from './components/calender/calender.component';
import { CustomDateAdapter } from './components/calender/custom-date-adapter';
import { registerLocaleData } from '@angular/common';
import { RouteComponent } from './components/route/route.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactEditorComponent } from './components/contact/contact-editor/contact-editor.component';
import { NewMemberEditorComponent } from './components/contact/new-member-editor/new-member-editor.component';


registerLocaleData(localeNl, 'NL');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    CalenderComponent,
    RouteComponent,
    ContactComponent,
    ContactEditorComponent,
    NewMemberEditorComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore, { provide: DateAdapter, useClass: CustomDateAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('NL');
  }
}
