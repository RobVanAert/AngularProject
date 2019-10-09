import { Component } from '@angular/core';

export type EditorType = 'contact' | 'newMember';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent{

  editor: EditorType = 'contact'

  constructor() {}

}
