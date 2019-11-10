import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SponsorService } from 'src/app/services/sponsor.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sponsor } from './sponsor';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let sponsorService: SponsorService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        SponsorService, 
        {
          provide: AngularFirestore, useValue: {} 
        }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    sponsorService = TestBed.get(SponsorService);
    //fixture.detectChanges();
  });

  it('should create home', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of sponsors', () => {
    const sponsor: Sponsor = new Sponsor();
    const expectedSponsors: Sponsor[] = [sponsor];

    const spy = spyOn(sponsorService, 'getSponsors').and.returnValue(of(expectedSponsors));
    component.ngOnInit();

    expect(component.sponsors).toEqual(expectedSponsors);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
    expect(spy).toHaveBeenCalledTimes(1);
  })

  it('should render a a-tag when url is available', () => {
    const expectedUrl = "sponsor.test"
    const sponsor: Sponsor = new Sponsor();
    sponsor.url = expectedUrl;
    const expectedSponsors: Sponsor[] = [sponsor];
    const spy = spyOn(sponsorService, 'getSponsors').and.returnValue(of(expectedSponsors));
    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
    expect(spy).toHaveBeenCalledTimes(2);

    fixture.whenStable().then(() => {
      fixture.detectChanges
      const htmlElement: HTMLElement = fixture.nativeElement;
      const a = htmlElement.querySelector('a');
      expect(a.href).toEqual("http://localhost:9876/" + expectedUrl);
    });
  })

  it('should not render a a-tag when url is not available', () => {
    const sponsor: Sponsor = new Sponsor();
    const expectedSponsors: Sponsor[] = [sponsor];

    const spy = spyOn(sponsorService, 'getSponsors').and.returnValue(of(expectedSponsors));
    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
    expect(spy).toHaveBeenCalledTimes(2);

    fixture.whenStable().then(() => {
      fixture.detectChanges
      const htmlElement: HTMLElement = fixture.nativeElement;
      const a = htmlElement.querySelector('a');
      expect(a).toBeNull;
    });
  });

  it('should open link on new page', () => {
    const expectedUrl = "sponsor.test"
    const sponsor: Sponsor = new Sponsor();
    sponsor.url = expectedUrl;
    const expectedSponsors: Sponsor[] = [sponsor];
    const spy = spyOn(sponsorService, 'getSponsors').and.returnValue(of(expectedSponsors));
    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
    expect(spy).toHaveBeenCalledTimes(2);

    fixture.whenStable().then(() => {
      fixture.detectChanges
      const htmlElement: HTMLElement = fixture.nativeElement;
      const a = htmlElement.querySelector('a');
      expect(a.target).toEqual("_blank");
    });
  })
})
