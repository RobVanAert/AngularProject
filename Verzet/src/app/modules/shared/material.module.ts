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
  MatSnackBarModule,
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
    MatFormFieldModule,
    MatSnackBarModule
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
    MatFormFieldModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
