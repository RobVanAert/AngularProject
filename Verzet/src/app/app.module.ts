import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import localeNl from '@angular/common/locales/nl';
import { AngularFirestore } from '@angular/fire/firestore';
import { DateAdapter } from '@angular/material';

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
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './modules/shared/shared.module';
import { ActivityExpansionComponent } from './components/activity-expansion/activity-expansion.component';
import { RankingComponent } from './components/ranking/ranking.component';

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
    NewMemberEditorComponent,
    ActivityExpansionComponent,
    RankingComponent,
    
  ],
  imports: [
    BrowserModule,
    SharedModule,
    UserModule,
  ],
  providers: [AngularFirestore, { provide: DateAdapter, useClass: CustomDateAdapter }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('NL');
  }
}
