import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityExpansionComponent } from './activity-expansion.component';

describe('ActivityExpansionComponent', () => {
  let component: ActivityExpansionComponent;
  let fixture: ComponentFixture<ActivityExpansionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityExpansionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
