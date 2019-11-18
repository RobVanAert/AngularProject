import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingComponent } from './ranking.component';
import { UserService } from 'src/app/services/user.service';
import { RankingService } from 'src/app/services/ranking.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MedalPipe } from 'src/app/pipes/medal.pipe';
import { of } from 'rxjs';
import { Ranking } from './ranking';
import { User } from '../user/user';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;
  let mockUserService;
  let mockRankingService;

  beforeEach(async(() => {
    mockUserService = jasmine.createSpyObj(['getUsers', 'getUser', 'updateUser'])
    mockRankingService = jasmine.createSpyObj(['getRidesOfYear']);
    TestBed.configureTestingModule({
      declarations: [ 
        RankingComponent,
        MedalPipe
      ],
      providers:[
        { provide: RankingService, useValue: mockRankingService} ,
        { provide: UserService, useValue: mockUserService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return an array of years', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'))
    mockRankingService.getRidesOfYear.and.returnValue(of());
    const expectedYears = [2020, 2019];
    
    component.ngOnInit();
    
    expect(component.availableYears).toEqual(expectedYears);
  })

  it('should group rankings by user with 1 user', () => {
    const rides = [ {distance: 110, userId: 5}, {distance: 100, userId: 5} ];
    const expectedGroupedRides = new Map();
    expectedGroupedRides.set(5, rides);

    let groupedRides = component.groupBy(rides, ride => ride.userId);

    expect(groupedRides).toEqual(expectedGroupedRides);
  })

  it('should group rankings by user with 2 users', () => {
    const rides = [ {distance: 110, userId: 5}, {distance: 100, userId: 4} ];
    const expectedGroupedRides = new Map();
    expectedGroupedRides.set(5, [{distance: 110, userId: 5}]);
    expectedGroupedRides.set(4, [{distance: 100, userId: 4}])

    let groupedRides = component.groupBy(rides, ride => ride.userId);

    expect(groupedRides).toEqual(expectedGroupedRides);
  })

  it('should sort rankings to total distance', () => {
    const ranking1 = new Ranking();
    ranking1.totalDistance = 1;
    ranking1.totalRides = 1;
    const ranking2 = new Ranking();
    ranking2.totalDistance = 2;
    ranking2.totalRides = 1;
    const ranking3 = new Ranking();
    ranking3.totalDistance = 3;
    ranking3.totalRides = 1;
    const rankings = [ranking1, ranking2, ranking3];
    let expectedRanking1 = new Ranking();
    let expectedRanking2 = new Ranking();
    let expectedRanking3 = new Ranking();
    Object.assign(expectedRanking1, ranking1);    
    Object.assign(expectedRanking2, ranking2);  
    Object.assign(expectedRanking3, ranking3);  
    expectedRanking1.ranking = 3;
    expectedRanking2.ranking = 2;
    expectedRanking3.ranking = 1;
    
    const expectedRankings = [expectedRanking3, expectedRanking2, expectedRanking1]

    let sortRankings = component.sortRankingToDistance(rankings)

    expect(sortRankings).toEqual(expectedRankings);
  })

  it('should sort rankings to total rides with equal distance', () => {
    const ranking1 = new Ranking();
    ranking1.totalDistance = 2;
    ranking1.totalRides = 1
    const ranking2 = new Ranking();
    ranking2.totalDistance = 2;
    ranking2.totalRides = 2
    const ranking3 = new Ranking();
    ranking3.totalDistance = 3;
    ranking3.totalRides = 1;
    const rankings = [ranking1, ranking2, ranking3];
    let expectedRanking1 = new Ranking();
    let expectedRanking2 = new Ranking();
    let expectedRanking3 = new Ranking();
    Object.assign(expectedRanking1, ranking1);    
    Object.assign(expectedRanking2, ranking2);  
    Object.assign(expectedRanking3, ranking3);  
    expectedRanking1.ranking = 3;
    expectedRanking2.ranking = 2;
    expectedRanking3.ranking = 1;
    
    const expectedRankings = [expectedRanking3, expectedRanking2, expectedRanking1]

    let sortRankings = component.sortRankingToDistance(rankings)

    expect(sortRankings).toEqual(expectedRankings);
  })

  it('should sort give same ranking with equal distance and rides', () => {
    const ranking1 = new Ranking();
    ranking1.totalDistance = 2;
    ranking1.totalRides = 2
    const ranking2 = new Ranking();
    ranking2.totalDistance = 2;
    ranking2.totalRides = 2
    const ranking3 = new Ranking();
    ranking3.totalDistance = 3;
    ranking3.totalRides = 1;
    const rankings = [ranking1, ranking2, ranking3];
    let expectedRanking1 = new Ranking();
    let expectedRanking2 = new Ranking();
    let expectedRanking3 = new Ranking();
    Object.assign(expectedRanking1, ranking1);    
    Object.assign(expectedRanking2, ranking2);  
    Object.assign(expectedRanking3, ranking3);  
    expectedRanking1.ranking = 2;
    expectedRanking2.ranking = 2;
    expectedRanking3.ranking = 1;
    
    const expectedRankings = [expectedRanking3, expectedRanking1, expectedRanking2]

    let sortRankings = component.sortRankingToDistance(rankings)

    expect(sortRankings).toEqual(expectedRankings);
  })

  it('should create array of ranking', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'))
    const rides = [
      {date:'', distance:110, userId:"1"}, 
      {date:'', distance:110, userId:"1"}, 
      {date:'', distance:110, userId:"2"}
    ];
    mockRankingService.getRidesOfYear.and.returnValue(of(rides));
    const user = new User();
    mockUserService.getUser.and.returnValue(of(user));
    const ranking1 = new Ranking();
    ranking1.totalDistance = 220;
    ranking1.totalRides = 2
    ranking1.ranking = 1
    ranking1.user = user

    const ranking2 = new Ranking();
    ranking2.totalDistance = 110;
    ranking2.totalRides = 1
    ranking2.ranking = 2;
    ranking2.user = user;
    const expectedRanking = [ranking1, ranking2];

    component.ngOnInit();

    expect(mockUserService.getUser).toHaveBeenCalled();
    expect(mockUserService.getUser).toHaveBeenCalledTimes(2);
    expect(mockRankingService.getRidesOfYear).toHaveBeenCalled();
    expect(mockRankingService.getRidesOfYear).toHaveBeenCalledWith(2020);
    expect(mockRankingService.getRidesOfYear).toHaveBeenCalledTimes(1);
    expect(component.rankings).toEqual(expectedRanking)
  })

  it('should change the year', () => {
    jasmine.clock().mockDate(new Date('2020/01/01'))
    const expectedYear = 2019;

    component.changeYear(expectedYear);

    expect(component.rankingYear).toEqual(expectedYear);
  })
});
