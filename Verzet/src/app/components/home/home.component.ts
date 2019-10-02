import { Component, OnInit } from '@angular/core';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from './sponsor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  sponsors: Sponsor[] =[ ];

  constructor(private sponsorService: SponsorService) { 
   
  }

  ngOnInit() {
    this.sponsorService.getSponsors().subscribe(
      sponsors => this.sponsors = sponsors
    )
  }

}
