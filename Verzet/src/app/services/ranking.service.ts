import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private firestore: AngularFirestore) { }

  getRidesOfYear(year: number) {
    let start = new Date(year.toString());
    let end = new Date((year+1).toString());

    return this.firestore.collection('rankingRides', ref => ref
      .where('date', '>', start)
      .where('date', '<', end)).valueChanges();
  }
} 