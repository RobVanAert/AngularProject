import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from './user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  user: User;
  userId: string;
  loggedUserUid: string;
  age: number;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute) { 
      this.loggedUserUid = JSON.parse(sessionStorage.getItem('uid'));
    }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
      this.age = this.calculateAge();
    });   
  }

  isDisabled() {
     return this.userId.toString() !== this.loggedUserUid;
  }

  onSubmit(){
    console.log(this.user);
    this.userService.updateUser(this.user);
  }

  onBirthDateChange($event){
    this.age = this.calculateAge();
  }

  private calculateAge() {
    let diff = new Date().getTime() - this.user.birthDate.getTime();
    diff /= (60*60*24*1000);
    return Math.abs(Math.round(diff/365.25));
  } 
}

