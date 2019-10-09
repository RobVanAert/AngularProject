import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators, FormGroupDirective, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.sass']
})
export class ContactEditorComponent implements OnInit {
  
  contactGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.contactGroup = this.formBuilder.group ({ 
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required,Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', Validators.required],
    })
  }

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
    
  
  onSubmit(formDirective: FormGroupDirective) {
    console.log(this.name.value, this.email.value, this.subject.value, this.message.value);
    formDirective.resetForm();
    this.contactGroup.reset();
    }

}
