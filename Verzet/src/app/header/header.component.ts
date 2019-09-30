import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  team: string = "assets/images/teamPicture.jpg"
  constructor() { }

  ngOnInit() {
  }

}
