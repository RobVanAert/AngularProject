import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  imageURL: string = "assets/images/logo.jpg";
  imageWidth: number = 65;
  loggedInUser;
  isLoggedIn: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService) {  
    }

  ngOnInit(){
    this.authService.getCurrentUser().subscribe(
      user => this.loggedInUser = user
    );
    if(this.loggedInUser){
      this.isLoggedIn = true;
    }
  }

  logOut(){
    this.isLoggedIn = false;
    this.authService.signOut();  
  }

  logIn(){
    this.isLoggedIn = true 
  }

}
