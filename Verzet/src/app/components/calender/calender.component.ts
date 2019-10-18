import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatCalendarCellCssClasses, MatCalendar } from '@angular/material';
import { ActivityService} from 'src/app/services/activity.service';
import { Activity } from './activity';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.sass']
})
export class CalenderComponent implements OnInit {
  
  @ViewChild('calendar', {static: false}) calendar: MatCalendar<Date>;

  selectedDate: any = new Date();
  activities: Activity[] = [];
  activity: Activity;
  selectActivities: Activity[] = [];
  isActivity: boolean;
  defaultActivity: Activity = new Activity;
  upcomingActivities: Activity[] = [];
  groupedUpcomingActivities: Map<any, any>;

  constructor(private activitiesService: ActivityService) { 
    this.defaultActivity.title = `geen activiteit`;
   
  }

  ngOnInit() {
    this.activitiesService.getActivities().subscribe(
      (activities: Activity[]) => {
        this.activities = activities;
        this.selectUpcomingActivities();
        this.groupedUpcomingActivities = this.groupBy(this.upcomingActivities, activity => activity.getShortDate())
      }    
    );
    this.findActivities();
  } 

  onSelect(event){
    this.selectedDate = event;
    this.findActivities();
    this.selectUpcomingActivities();
  }

  selectActivity(activity: Activity){
    this.activity = activity;
    this.selectedDate = activity.getDate();
    this.selectUpcomingActivities();
    this.groupedUpcomingActivities = this.groupBy(this.upcomingActivities, activity => activity.getShortDate())
    this.calendar._goToDateInView(this.selectedDate, "month")
    this.isActivity = true;
  }

  findActivities(){
    this.activity = this.activities.find(
      activity => {
        let date = activity.getDate();
        return this.isSelectedDay(date)
      })

    if(this.activity){
      let groupedActivities = this.groupBy(this.activities, activity => activity.getShortDate());
      let date = formatDate(this.selectedDate, 'shortDate', 'NL' ).toString();
      this.selectActivities = groupedActivities.get(date);
      if(this.selectActivities.length == 1) {
        this.isActivity = true;
      } else {
        this.isActivity = false;
      }

    } else {
      this.activity = this.defaultActivity;
      this.isActivity = false
    }
  }

  isSelectedDay(date: Date): boolean 
  {
    return (date.getDate() === this.selectedDate.getDate() && 
            date.getMonth() === this.selectedDate.getMonth() && 
            date.getFullYear() === this.selectedDate.getFullYear());
  }
  
  selectUpcomingActivities() 
  {
    let startDate = new Date();
    startDate.setHours(0,0,0,0);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 56)  

    this.upcomingActivities = this.activities.filter(activity => {
      return (activity.getDate() >= startDate && activity.getDate() <= endDate && (activity.id !== this.activity.id))
    })
  }

  dateClass() {
      return (date: Date): MatCalendarCellCssClasses => {        
        const highlightDate = this.activities
          .map(activity => activity.getDate())
          .some(activityDate => activityDate.getDate() === date.getDate() && 
                                activityDate.getMonth() === date.getMonth() && 
                                activityDate.getFullYear() === date.getFullYear());
        return highlightDate ? 'event' : '';
    };
  }
  groupBy(list: Array<any>, keyGetter: any): Map<any, any> {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }
}
