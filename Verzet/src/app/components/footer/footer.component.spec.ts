import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create footer', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.footerTitle).toEqual('Fietsclub Het Verzet');
  });

  it('should have a title in uppercase', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const p = htmlElement.querySelector('p');
    expect(p.textContent).toEqual('FIETSCLUB HET VERZET');
  })
});
