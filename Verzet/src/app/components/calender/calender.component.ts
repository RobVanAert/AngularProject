import { Component, OnInit, SimpleChange, SimpleChanges, OnChanges } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material';
import { ActivityService} from 'src/app/services/activity.service';
import { Activity } from './activity';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.sass']
})
export class CalenderComponent implements OnInit {
  
  selectedDate: any = new Date();
  activities: Activity[] = [];
  activity: Activity;
  isActivityDate: boolean;
  defaultActivity: Activity = new Activity;

  constructor(private activitiesService: ActivityService) { }

  ngOnInit() {
    this.activitiesService.getActivities().subscribe(
      (activities: Activity[]) => {this.activities = activities;}
    );

    this.findActivity();
  } 

  onSelect(event){
    this.selectedDate = event;
    this.findActivity();
  }

  findActivity(){
    this.activity = this.activities.find(activity => {let date = activity.getDate();
      return (date.getDate() === this.selectedDate.getDate() && 
              date.getMonth() === this.selectedDate.getMonth() && 
              date.getFullYear() === this.selectedDate.getFullYear());
        }
      )

    this.isActivityDate = true;

    if(!this.activity){
      let formattedDate = formatDate(this.selectedDate, 'dd MMMM', 'NL');
      this.defaultActivity.title = `Op ${formattedDate} is er geen activiteit gepland`;
      this.activity = this.defaultActivity;
      this.isActivityDate = false
    }
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
