import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatDatepickerModule,
  MatSelectModule,
  MatRadioModule,
  MatGridListModule,
  MatInputModule,
  MatNativeDateModule,
  MatCardModule,
  MatFormFieldModule,
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule
  ],
 

  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
