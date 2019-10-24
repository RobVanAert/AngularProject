import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MedalPipe } from '../../pipes/medal.pipe';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    MedalPipe
  ],
  declarations: [MedalPipe]
})
export class SharedModule { }
