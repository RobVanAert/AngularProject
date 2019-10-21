import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  signInGroup: FormGroup;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signInGroup = this.formBuilder.group ({ 
      email: ['', Validators.email],
      password: ['', Validators.minLength(8)],
    })
  }

  get password() {return this.signInGroup.get('password');}
  get email() {return this.signInGroup.get('email');}  

  onSubmit(formDirective: FormGroupDirective) {
    this.authService.signInWithEmailAndPassword(this.email.value, this.password.value);
    formDirective.resetForm();
    this.signInGroup.reset();
    }
}
