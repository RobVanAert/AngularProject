import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Event } from '../components/calender/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private firestore: AngularFirestore) { }

  getEvents(): Observable<Event[]>
  {
    return this.firestore.collection<Event>("Events").valueChanges();
  }
}
