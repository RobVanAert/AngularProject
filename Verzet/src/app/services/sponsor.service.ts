import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Sponsor } from '../components/home/sponsor';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private db: AngularFirestore) { 

  }

  getSponsors(): Observable<Sponsor[]>
  {
    return this.db.collection<Sponsor>('Sponsors').valueChanges();
  }
}
