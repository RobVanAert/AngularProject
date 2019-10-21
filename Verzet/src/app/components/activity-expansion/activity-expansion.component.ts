import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Activity } from '../calender/activity';

@Component({
  selector: 'app-activity-expansion',
  templateUrl: './activity-expansion.component.html',
  styleUrls: ['./activity-expansion.component.sass']
})
export class ActivityExpansionComponent implements OnInit, OnChanges {

  @Input() groupedActivities: Map<string, Array<Activity>> = new Map();
  @Output() selectedActivity = new EventEmitter<Activity>();
  @Output() openedDate = new EventEmitter<Date>();
  groupedActivitiesArray:Activity[][];
  

  constructor() {     
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.groupedActivities){
    this.groupedActivitiesArray = Array.from(this.groupedActivities.values());
    }
   
  }

  selectActivity(activity: Activity) {
    this.selectedActivity.emit(activity);
  }

  emitSelectedDate(date: Date) {
    this.openedDate.emit(date);
  }

  panelOpen(activities: Activity[]){
    if(activities.length === 1) {
      this.selectActivity(activities.pop());
    } else {
      this.emitSelectedDate(activities[0].getDate());
    }
  }

  hasOnlyOneActivity(array: Activity[]): boolean {
    if(array.length === 1){
      return true;
    }
    return false;
  }

  isBike(activity: Activity): boolean {
    if(activity.type === 'fietsen') {
      return true;
    }
    return false;
  }
}
