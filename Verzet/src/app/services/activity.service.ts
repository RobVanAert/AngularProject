import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Activity } from '../components/calender/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private firestore: AngularFirestore) { }

  getActivities(): Observable<Activity[]>
  {
    return this.firestore.collection<Activity>("Events", ref => 
    ref.orderBy('date','asc')).valueChanges({idField: 'activityId'}).pipe(map(collection => {
      return collection.map(a => {
          let activity = new Activity();
          activity.id = a.activityId
          activity.date = a.date;
          activity.title = a.title;
          activity.tour = a.tour;
          activity.place = a.place;
          activity.type = a.type;
          return activity;
      })
    }))
  }
}
