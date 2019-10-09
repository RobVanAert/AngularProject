import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-new-member-editor',
  templateUrl: './new-member-editor.component.html',
  styleUrls: ['./new-member-editor.component.sass']
})

export class NewMemberEditorComponent {

  newMemberGroup = this.formBuilder.group({
    salutation: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
    memberVWB: [''],
  })
  
  constructor(private formBuilder: FormBuilder) { }

  get salutation() {return this.newMemberGroup.get('salutation');}
  get firstName() {return this.newMemberGroup.get('firstName');}
  get lastName() {return this.newMemberGroup.get('lastName');}
  get email() {return this.newMemberGroup.get('email');}
  get memberVWB() {return this.newMemberGroup.get('memberVWB');}

  getFirstNameErrorMessage() {
    return this.firstName.hasError('required') ? 'u moet uw voornaam opgeven' :'';         
  }

   getLastNameErrorMessage() {
    return this.lastName.hasError('required') ? 'u moet uw familienaam opgeven' :'';          
              }

  getMailErrorMessage() {
    return this.email.hasError('required') ? 'u moet een e-mail opgeven' :
          this.email.hasError('email') ? 'dit is geen geldig e-mail adres' :'';
  }

  onSubmit(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.newMemberGroup.reset();
  }

}
