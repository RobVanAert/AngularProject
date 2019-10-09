import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-member-editor',
  templateUrl: './new-member-editor.component.html',
  styleUrls: ['./new-member-editor.component.sass']
})

export class NewMemberEditorComponent implements OnInit{

  newMemberGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.createForm();
    this.onChangeMembership();
  }
  
  createForm(){
    this.newMemberGroup = this.formBuilder.group({
      salutation: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      memberVWB: [false],
      membershipNumberVWB: [{value:'', disabled: true}]
    })
  }

  get salutation() {return this.newMemberGroup.get('salutation');}
  get firstName() {return this.newMemberGroup.get('firstName');}
  get lastName() {return this.newMemberGroup.get('lastName');}
  get email() {return this.newMemberGroup.get('email');}
  get memberVWB() {return this.newMemberGroup.get('memberVWB');}
  get membershipNumberVWB() {return this.newMemberGroup.get('membershipNumberVWB');}

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

  onChangeMembership() {
    this.memberVWB.valueChanges.subscribe(member =>{
      if (member) {
        this.membershipNumberVWB.enable();
      } else{
        this.membershipNumberVWB.disable();
      }
    })
  }

  onSubmit(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
    this.newMemberGroup.reset();
  }

}
