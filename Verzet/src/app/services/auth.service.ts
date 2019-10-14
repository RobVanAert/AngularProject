import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../components/user/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User> = of(null);

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.firestore.collection('Users').doc(result.user.uid).set({
        email: result.user.email
      });
    })
    .catch((error) => window.alert(error.message))
  }    

  signInWithEmailAndPassword(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => this.router.navigate(['home']))
    .catch((error) => window.alert(error))
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['home']);
    })
  }

  getCurrentUser() {
      this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.user$ = this.firestore.doc<User>(`Users/${user.uid}`).valueChanges().pipe(map(user=>{
          let loggedUser = new User();
          loggedUser.email = user.email;
          loggedUser.name = user.name; 
          return loggedUser;
        }))
      } else {
        this.user$ = of(null);
      }
    })
    return this.user$;
  }
}
