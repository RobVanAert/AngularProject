import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberEditorComponent } from './new-member-editor.component';

describe('NewMemberEditorComponent', () => {
  let component: NewMemberEditorComponent;
  let fixture: ComponentFixture<NewMemberEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMemberEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemberEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
