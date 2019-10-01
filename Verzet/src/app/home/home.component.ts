import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  sponsors: Observable<any[]>;
  constructor(private db: AngularFireDatabase) { 
    this.sponsors = db.list('Sponsors').valueChanges();
    console.log(this.sponsors);
  }

  ngOnInit() {
  }

}
