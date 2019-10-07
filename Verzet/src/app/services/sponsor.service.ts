import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../components/home/sponsor';
import { AngularFirestore } from '@angular/fire/firestore'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private db: AngularFirestore) { 

  }

  getSponsors(): Observable<Sponsor[]>
  {
    return this.db.collection<Sponsor>('Sponsors').valueChanges().pipe(map(collection => {
      return collection.map(s => {
        let sponsor =  new Sponsor();
        sponsor.name = s.name;
        sponsor.imageLink = s.imageLink;
        sponsor.url = s.url;
        return sponsor;
        });
    }))
  }
}
