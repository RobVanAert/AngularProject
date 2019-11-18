import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderComponent } from './calender.component';
import { ActivityExpansionComponent } from '../activity-expansion/activity-expansion.component';
import { RouteComponent } from '../route/route.component';
import { ActivityService } from 'src/app/services/activity.service';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { firestore } from 'firebase';
import { Activity } from './activity';
import { RouteService } from 'src/app/services/route.service';
import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';

describe('CalenderComponent', () => {
  let component: CalenderComponent;
  let fixture: ComponentFixture<CalenderComponent>;
  const mockActivityService = jasmine.createSpyObj(['getActivities']);
  const mockRouteService = jasmine.createSpyObj(['getRoute']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CalenderComponent,
        ActivityExpansionComponent,
        RouteComponent
      ],
      imports: [MaterialModule],
      providers: [
        { provide: ActivityService, useValue: mockActivityService },
        { provide: RouteService, useValue: mockRouteService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    registerLocaleData(localeNl, 'NL');
    fixture = TestBed.createComponent(CalenderComponent);
    component = fixture.componentInstance;
    jasmine.clock().install();
  });

  afterEach(() =>{
    jasmine.clock().uninstall();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the selected date', () => {
    const date = new Date('2020/01/01');
    
    component.listSelectedDate(date)

    expect(component.selectedDate).toEqual(date);
  })

  it('should group activities by date', () => {
    const date = new Date('2020/01/01 08:30:00');
    const activity1 = new Activity();
    activity1.date = firestore.Timestamp.fromDate(date);
    const activity2 = new Activity();
    activity2.date = firestore.Timestamp.fromDate(date);
    const activities = [
      activity1,
      activity2
    ]
    const expectedGroupedActivities = new Map();
    expectedGroupedActivities.set('01-01-20', activities);

    let groupedActivities = component.groupBy(activities, activity => activity.getShortDate());

    expect(groupedActivities).toEqual(expectedGroupedActivities);
  })

  it('should give a list of activities for the next 8 weeks, with activity just after  8 weeks  from now', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'));
    const date1 = new Date('2020/01/02 08:30:00');
    const date2 = new Date('2020/02/26 08:30:00');
    const activity1 = new Activity();
    activity1.id = 'id'
    activity1.date = firestore.Timestamp.fromDate(date1);
    const activity2 = new Activity();
    activity2.id = 'id2'
    activity2.date = firestore.Timestamp.fromDate(date2);
    const activities = [
      activity1,
      activity2
    ]
    const expectedUpcomingActivities = [activity1, activity2];
    mockActivityService.getActivities.and.returnValues(of(activities));

    fixture.detectChanges();

    expect(component.upcomingActivities).toEqual(expectedUpcomingActivities);
  })

  it('should give a list of activities for the next 8 weeks', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'));
    const date1 = new Date('2020/01/02 08:30:00');
    const date2 = new Date('2020/04/01 08:30:00');
    const activity1 = new Activity();
    activity1.id = 'id'
    activity1.date = firestore.Timestamp.fromDate(date1);
    const activity2 = new Activity();
    activity2.id = 'id2'
    activity2.date = firestore.Timestamp.fromDate(date2);
    const activities = [
      activity1,
      activity2
    ]
    const expectedUpcomingActivities = [activity1];
    mockActivityService.getActivities.and.returnValues(of(activities));

    fixture.detectChanges();

    expect(component.upcomingActivities).toEqual(expectedUpcomingActivities);
  })

  it('should give a list of activities for the next 8 weeks without selected activity', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'));
    const date1 = new Date('2020/01/02 08:30:00');
    const date2 = new Date('2020/02/01 08:30:00');
    const activity1 = new Activity();
    activity1.id = 'id'
    activity1.date = firestore.Timestamp.fromDate(date1);
    const activity2 = new Activity();
    activity2.id = 'id2'
    activity2.date = firestore.Timestamp.fromDate(date2);
    const activities = [
      activity1,
      activity2
    ]
    const expectedUpcomingActivities = [activity2];
    mockActivityService.getActivities.and.returnValues(of(activities));
    component.activity = activity1;

    fixture.detectChanges();

    expect(component.upcomingActivities).toEqual(expectedUpcomingActivities);
  })

  it('should set activity with 1 activity for a chosen date on calender', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'));
    const date1 = new Date('2020/01/02 08:30:00');
    const date2 = new Date('2020/02/01 08:30:00');
    const activity1 = new Activity();
    activity1.id = 'id'
    activity1.date = firestore.Timestamp.fromDate(date1);
    const activity2 = new Activity();
    activity2.id = 'id2'
    activity2.date = firestore.Timestamp.fromDate(date2);
    const activities = [
      activity1,
      activity2
    ]
    mockActivityService.getActivities.and.returnValues(of(activities));
    fixture.detectChanges();
    component.onSelect(date1);

    expect(component.activity).toEqual(activity1);
  })

  it('should set activity with defaultactivity for a chosen date on calender without activity', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'));
    const date1 = new Date('2020/01/02 08:30:00');
    const date2 = new Date('2020/02/01 08:30:00');
    const activity1 = new Activity();
    activity1.id = 'id'
    activity1.date = firestore.Timestamp.fromDate(date1);
    const activity2 = new Activity();
    activity2.id = 'id2'
    activity2.date = firestore.Timestamp.fromDate(date2);
    const activities = [
      activity1,
      activity2
    ];
    const expectedActivity = component.defaultActivity;
    mockActivityService.getActivities.and.returnValues(of(activities));
    fixture.detectChanges();
    component.onSelect(new Date('2020/02/02'));

    expect(component.activity).toEqual(expectedActivity);
  })

  it('should set activity with multipleActivity for a chosen date on calender with multiple activities', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'));
    const date1 = new Date('2020/01/01 08:30:00');
    const activity1 = new Activity();
    activity1.id = 'id'
    activity1.date = firestore.Timestamp.fromDate(date1);
    const activity2 = new Activity();
    activity2.id = 'id2'
    activity2.date = firestore.Timestamp.fromDate(date1);
    const activities = [
      activity1,
      activity2
    ];
    const expectedActivity = component.multipleActivity;
    mockActivityService.getActivities.and.returnValues(of(activities));
    fixture.detectChanges();
    component.onSelect(date1);

    expect(component.activity).toEqual(expectedActivity);
  })

  it('should render an activity in activityComponent when activity selected in activityExpansionComponent', () => {
    const date1 = new Date('2020/01/01 08:30:00');
    const date2 = new Date('2020/01/02 08:30:00');
    const activity1 = new Activity();
    activity1.date = firestore.Timestamp.fromDate(date1);
    activity1.place = 'plaats';
    activity1.title = 'activiteit';
    activity1.type = 'fietsen';
    const activity2 = new Activity();
    activity2.date = firestore.Timestamp.fromDate(date2);
    activity2.place = 'plaats2';
    activity2.title = 'activiteit2';
    activity2.type = 'fietsen';
    const activities = [
      activity1,
      activity2
    ]
    
    const activityExpansionComponentDEs = fixture.debugElement.queryAll(By.directive(ActivityExpansionComponent));
    mockActivityService.getActivities.and.returnValues(of(activities));
    fixture.detectChanges();
    
    activityExpansionComponentDEs[0].componentInstance.selectActivity(activity1);
    fixture.detectChanges()
    const routeComponentDEs = fixture.debugElement.queryAll(By.directive(RouteComponent));

    expect(component.isActivity).toBeTruthy();
    expect(routeComponentDEs.length).toEqual(1);
    expect(routeComponentDEs[0].componentInstance.place).toEqual('plaats')
  })
});
