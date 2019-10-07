import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../components/home/sponsor';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private firestore: AngularFirestore) { }

  getSponsors(): Observable<Sponsor[]>
  {
    return this.firestore.collection<Sponsor>('Sponsors').valueChanges();
  }
}
