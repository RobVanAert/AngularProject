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
      gsm: [''],
      memberVWB: [false],
      membershipNumberVWB: [{value:'', disabled: true}],
      birthDate: [''],
      gender: [''],
      nationality: [''],
      street: [''],
      number: [''],
      zipCode: [''],
      city: ['']
    })
  }

  get salutation() {return this.newMemberGroup.get('salutation');}
  get firstName() {return this.newMemberGroup.get('firstName');}
  get lastName() {return this.newMemberGroup.get('lastName');}
  get gsm() {return this.newMemberGroup.get('gsm');}
  get email() {return this.newMemberGroup.get('email');}
  get memberVWB() {return this.newMemberGroup.get('memberVWB');}
  get membershipNumberVWB() {return this.newMemberGroup.get('membershipNumberVWB');}
  get street() {return this.newMemberGroup.get('street');}
  get birthDate() {return this.newMemberGroup.get('birthDate');}
  get gender() {return this.newMemberGroup.get('gender');}
  get nationality() {return this.newMemberGroup.get('nationality');}
  get number() {return this.newMemberGroup.get('number');}
  get zipCode() {return this.newMemberGroup.get('zipCode');}
  get city() {return this.newMemberGroup.get('city');}

  getFirstNameErrorMessage() {
    return this.firstName.hasError('required') ? 'gelieve een voornaam op te geven' :'';         
  }

   getLastNameErrorMessage() {
    return this.lastName.hasError('required') ? 'gelieve een familienaam op te geven' :'';          
  }

  getMailErrorMessage() {
    return this.email.hasError('required') ? 'gelieve een e-mail op te geven' :
          this.email.hasError('email') ? 'dit is geen geldig e-mail adres' :'';
  }

  getBirthDateErrorMessage() {
    return this.birthDate.hasError('required') ? 'gelieve een geboortedatum op te geven' :''; 
  }

  getGenderErrorMessage() {
    return this.gender.hasError('required') ? 'gelieve een geslacht op te geven' :''; 
  }

  getNationalityErrorMessage() {
    return this.nationality.hasError('required') ? 'gelieve een nationaliteit op te geven' :''; 
  }

  getStreetErrorMessage() {
    return this.street.hasError('required') ? 'gelieve een straat op te geven' :''; 
  }

  getNumberErrorMessage() {
    return this.number.hasError('required') ? 'gelieve een huisnummer op te geven' :''; 
  }

  getZipCodeErrorMessage() {
    return this.zipCode.hasError('required') ? 'gelieve een postcode op te geven' :''; 
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'gelieve een gemeente op te geven' :''; 
  }

  onChangeMembership() {
    this.memberVWB.valueChanges.subscribe(member =>{
      if (member) {
        this.membershipNumberVWB.enable();
        this.setValidationIfMemberVWB();
        this.updateValidation();
      } else{
        this.membershipNumberVWB.disable();
        this.setValidationIfNotMemberVWB();
        this.updateValidation();
      }
    })
  }

  setValidationIfNotMemberVWB() {
    this.birthDate.setValidators([Validators.required]);
    this.gender.setValidators([Validators.required]);
    this.nationality.setValidators([Validators.required]);
    this.street.setValidators([Validators.required]);
    this.number.setValidators([Validators.required]);
    this.zipCode.setValidators([Validators.required]);
    this.city.setValidators([Validators.required]);
  }

  setValidationIfMemberVWB() {
    this.birthDate.setValidators(null);
    this.gender.setValidators(null);
    this.nationality.setValidators(null);
    this.street.setValidators(null);
    this.number.setValidators(null);
    this.zipCode.setValidators(null);
    this.city.setValidators(null);
  }

  updateValidation(){
    this.birthDate.updateValueAndValidity();
    this.gender.updateValueAndValidity();
    this.nationality.updateValueAndValidity();
    this.street.updateValueAndValidity();
    this.number.updateValueAndValidity();
    this.zipCode.updateValueAndValidity();
    this.city.updateValueAndValidity();
  }

  onSubmit(formDirective: FormGroupDirective): void {
    console.log(this.salutation.value, this.firstName.value, this.lastName.value, this.email.value, 
      this.memberVWB.value, this.membershipNumberVWB.value, this.street.value, this.number.value );
    formDirective.resetForm();
    this.newMemberGroup.reset();
  }

}
