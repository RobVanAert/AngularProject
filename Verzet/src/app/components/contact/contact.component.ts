import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent{

  contactGroup = this.formBuilder.group ({ 
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required,Validators.email]],
  subject: ['', [Validators.required, Validators.minLength(5)]],
  message: ['', Validators.required],
})

  constructor(private formBuilder: FormBuilder) { }

  get name() {return this.contactGroup.get('name');}
  get email() {return this.contactGroup.get('email');}
  get subject() {return this.contactGroup.get('subject');}
  get message() {return this.contactGroup.get('message');}

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'u moet uw naam opgeven' :
          this.name.hasError('minlength') ? 'uw naam moet minstens 3 karakters lang zijn' :''
        }

  getMailErrorMessage() {
    return this.email.hasError('required') ? 'u moet een e-mail opgeven' :
          this.email.hasError('email') ? 'dit is geen geldig e-mail adres' :''
  }

  getSubjectErrorMessage() {
    return this.subject.hasError('required') ? 'u moet een onderwerp opgeven' :
          this.subject.hasError('minlength') ? 'het onderwerp moet minstens 5 karakters lang zijn' :''
  }

  getMessageErrorMessage() {
    return this.message.hasError('required') ? 'u moet een bericht opgeven' : ''
  }
  

  onSubmit(formDirective: FormGroupDirective): void {
    console.log(this.name.value);
    formDirective.resetForm();
    this.contactGroup.reset();
  }

}
