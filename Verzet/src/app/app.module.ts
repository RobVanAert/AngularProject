import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { MaterialModule } from './modules/shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './components/home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
