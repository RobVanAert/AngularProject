import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {

  passwordGroup: FormGroup;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar) { }

    ngOnInit() {
      this.createForm();
    }
  
    createForm() {
      this.passwordGroup = this.formBuilder.group ({ 
        email: [''],
      })
    }
  
    get email() {return this.passwordGroup.get('email');}  
  
    onSubmit(formDirective: FormGroupDirective) {
      this.authService.sendForgotPasswordMail(this.email.value);
      this.router.navigate(['login']);
      this.snackbar.open('uw paswoord reset mail is verzonden. check uw mail','',{
        duration: 2000})
      formDirective.resetForm();
      this.passwordGroup.reset();
      }

}
