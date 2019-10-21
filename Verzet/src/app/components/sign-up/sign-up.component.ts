import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroupDirective,FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  signUpGroup: FormGroup;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signUpGroup = this.formBuilder.group ({ 
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  get password() {return this.signUpGroup.get('password');}
  get email() {return this.signUpGroup.get('email');}

  getMailErrorMessage() {
    return this.email.hasError('required') ? 'u moet een e-mail opgeven' :
           this.email.hasError('email') ? 'dit is geen geldig e-mail adres' :''
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'u moet een onderwerp opgeven' :
          this.password.hasError('minlength') ? 'het onderwerp moet minstens 8 karakters lang zijn' :''
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.authService.createUserWithEmailAndPassword(this.email.value, this.password.value);
    formDirective.resetForm();
    this.signUpGroup.reset();
    this.snackbar.open('Gebruiker toegevoegd','',{
      duration: 2000})
    }

}
