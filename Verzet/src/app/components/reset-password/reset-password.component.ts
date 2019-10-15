import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Form, FormGroupDirective, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CustomValidators } from '../custom-validators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  passwordResetGroup: FormGroup;
  ngUnsubscribe: Subject<any> = new Subject<any>();
  mode: string;
  actionCode: string;
  actionCodeChecked: boolean;

  constructor(
    private authService: AuthService, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar) { }

    ngOnInit() {
      this.createForm();

      this.activatedRoute.queryParams
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(params => {
          if (!params) this.router.navigate(['/home']);
          this.mode = params['mode'];
          this.actionCode = params['oobCode'];

      if(this.mode = 'resetPassword') {
          this.authService.getAuth().verifyPasswordResetCode(this.actionCode).then(email => {
            this.actionCodeChecked = true;
          }).catch(e => {
            alert(e);
            this.router.navigate(['/auth/login']);
          });
        } else {
          console.log('query parameters are missing');
          this.router.navigate(['/auth/login']);
        }
      })
    }
  
    createForm() {
      this.passwordResetGroup = this.formBuilder.group ({ 
        password: ['', Validators.compose([
          Validators.required,
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          Validators.minLength(8)])],
        confirmPassword: ['', Validators.required]
      })
    }
    
    get password() {return this.passwordResetGroup.get('password');}  
    get confirmPassword() {return this.passwordResetGroup.get('confirmPassword');}

    getPasswordErrorMessage() {
      return this.password.hasError('required') ? 'gelieve een paswoord op te geven' :  
            this.password.hasError('hasNumber') ? 'het paswoord moet een cijfer bevatten' :
            this.password.hasError('hasCapitalCase') ? 'het paswoord moet een hoofdletter bevatten' : 
            this.password.hasError('hasSmallCase') ? 'het paswoord moet een kleine letter bevatten' :
            this.password.hasError('minlength') ? 'het paswoord moet minstens 8 karakters bevatten' :''     
    }

    getConfirmPasswordErrorMessage() {
      return this.confirmPassword.hasError('required') ? 'gelieve een paswoord op te geven' : ''
    }
    
    onSubmit(){
      if (this.password.value !== this.confirmPassword.value){
        alert('beide wachtwoorden komen iet overeen');
        return;
      }
      if(this.actionCode){
        this.authService.getAuth().confirmPasswordReset(
          this.actionCode,   
          this.password.value
        )
        .then(resp => {
          this.snackbar.open('uw paswoord is gereset','',{
            duration: 2000})
          this.router.navigate(['/login']);
        }).catch(e => {
          alert(e);
        });
      }
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
}
