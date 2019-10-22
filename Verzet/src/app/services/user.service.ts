import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../components/user/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  public getUsers(): Observable<User[]> {
    return this.firestore.collection<User>(`Users`).valueChanges({idField: 'userId'}).pipe(map(collection=>{
      return collection.map(resultUser=>{
        let user = new User();
        user.id = resultUser.userId
        user.email = resultUser.email;
        user.firstName = resultUser.firstName; 
        user.lastName = resultUser.lastName; 
        user.bike = resultUser.bike; 
        user.birthDate = resultUser.birthDate; 
        return user;
      })
    }))
  }

  public getUser(userId: string) {
    return this.firestore.doc<User>(`Users/${userId}`).valueChanges().pipe(map(resultUser=>{
      let user = new User();
      user.id = userId
      user.email = resultUser.email;
      user.firstName = resultUser.firstName; 
      user.lastName = resultUser.lastName; 
      user.bike = resultUser.bike; 
      user.birthDate = resultUser.birthDate ? resultUser.birthDate.toDate() : null; 
      return user;
    }))
  }

  public updateUser(user: User) {
    this.firestore.doc<User>(`Users/${user.id}`).update({
      firstName: user.firstName,
      lastName: user.lastName,
      bike: user.bike,
      birthDate: user.birthDate
    })
  }
}
