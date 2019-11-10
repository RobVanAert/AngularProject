import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../components/user/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User> = of(null);
  isLoggedIn: boolean;
  uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {     
    this.initializeLoggedInStatus()
    }
    
  initializeLoggedInStatus() {
    this.isLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn'))
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        sessionStorage.setItem('loggedIn', JSON.stringify(true));
        sessionStorage.setItem('uid', JSON.stringify(user.uid));
      } else {
        this.isLoggedIn = false;
        sessionStorage.removeItem('loggedIn')
        sessionStorage.removeItem('uid')
      }
    })
  }



  getAuth() { 
    return this.afAuth.auth 
  } 

  createUserWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.firestore.collection('Users').doc(result.user.uid).set({
        email: result.user.email
      });
    })
    .catch((error) => window.alert(error.message));
  }    

  signInWithEmailAndPassword(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => { 
      this.router.navigate(['user', result.user.uid]);
      sessionStorage.setItem('loggedIn', JSON.stringify(true));
      sessionStorage.setItem('uid', JSON.stringify(result.user.uid));
    })
    .catch((error) => window.alert(error));
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['home']);
      sessionStorage.removeItem('loggedIn');
      sessionStorage.removeItem('uid');
    })
  }

  sendForgotPasswordMail(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .catch((error) => window.alert(error));
  }

  getLoggedUid() {
    return this.afAuth.authState;
  }

  getLoggedInStatus(): boolean {
    return this.isLoggedIn;
  }
}
