import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatCalendarCellCssClasses, MatCalendar } from '@angular/material';
import { ActivityService} from 'src/app/services/activity.service';
import { Activity } from './activity';

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
  isActivityDate: boolean;
  defaultActivity: Activity = new Activity;
  upcomingActivities: Activity[] = [];

  constructor(private activitiesService: ActivityService) { 
    this.defaultActivity.title = `geen activiteit`;
  }

  ngOnInit() {
    this.activitiesService.getActivities().subscribe(
      (activities: Activity[]) => {
        this.activities = activities;
        this.selectUpcomingActivities();
      }
    );

    this.findActivity();
  } 

  onSelect(event){
    this.selectedDate = event;
    this.findActivity();
    this.selectUpcomingActivities();
  }

  selectActivity(activity: Activity){
    this.activity = activity;
    this.selectedDate = activity.getDate();
    this.selectUpcomingActivities();
    this.calendar._goToDateInView(this.selectedDate, "month")
    this.isActivityDate = true;
  }

  findActivity(){
    this.activity = this.activities.find(
      activity => {
        let date = activity.getDate();
        return this.isSelectedDay(date)
      })

    this.isActivityDate = true;

    if(!this.activity){
      this.activity = this.defaultActivity;
      this.isActivityDate = false
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
      return (activity.getDate() >= startDate && activity.getDate() <= endDate && !this.isSelectedDay(activity.getDate()))
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
}
