import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SponsorService } from 'src/app/services/sponsor.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Sponsor } from './sponsor';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sponsorServive: SponsorService;
  let sponsor: Sponsor = new Sponsor();
  sponsor.name = "testSponsor";
  let expectedSponsors: Sponsor[] = [sponsor];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        SponsorService, 
        {
          provide: AngularFirestore, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    sponsorServive = TestBed.get(SponsorService);
    //fixture.detectChanges();
  });

  it('should create home', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of sponsors', () => {
    const spy = spyOn(sponsorServive, 'getSponsors').and.returnValue(of(expectedSponsors));
    component.ngOnInit();
    expect(component.sponsors).toEqual(expectedSponsors);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
    expect(spy).toHaveBeenCalledTimes(1);
  })
});
