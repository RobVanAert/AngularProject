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
    this.authService.getCurrentUser().subscribe(user => {
      if(user){
        this.isLoggedIn = true
      } else{
        this.isLoggedIn = false
      }
    });
  }
  

  logOut(){
    this.isLoggedIn = false;
    this.authService.signOut();  
  }

  logIn(){
    this.isLoggedIn = true 
  }

}
