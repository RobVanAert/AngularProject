import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route } from '../components/route/route';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private firestore: AngularFirestore) { }

  getRoute(route: string): Observable<any>
  {
    return this.firestore.collection<Route>('Routes').doc(route).get().pipe(map(action => {
      const data = action.data();
      const id = action.id;
      let route = new Route();
      route.id = id;
      route.title = data.title;
      route.distance = data.distance;
      route.routeUrl = data.routeUrl
      return route;
  }))
  }
}
