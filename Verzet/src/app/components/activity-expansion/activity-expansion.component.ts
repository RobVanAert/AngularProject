import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Activity } from '../calender/activity';

@Component({
  selector: 'app-activity-expansion',
  templateUrl: './activity-expansion.component.html',
  styleUrls: ['./activity-expansion.component.sass']
})
export class ActivityExpansionComponent implements OnInit, OnChanges {

  @Input() groupedActivities: Map<string, Array<Activity>> = null;
  @Output() selectedActivity = new EventEmitter<Activity>();
  groupedActivitiesArray:Activity[][];
  

  constructor() {     
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.groupedActivitiesArray = Array.from(this.groupedActivities.values());
   
  }

  selectActivity(activity: Activity){
    this.selectedActivity.emit(activity);
  }

  panelOpen(activities: Activity[]){
    if(activities.length === 1){
      this.selectActivity(activities.pop());
    }
  }

  hasOnlyOneActivity(array: Activity[]): boolean {
    if(array.length === 1){
      return true;
    }
    return false;
  }

  isBike(activity: Activity): boolean {
    if (activity.type === 'fietsen') {
      return true;
    }
    return false;
  }

}
