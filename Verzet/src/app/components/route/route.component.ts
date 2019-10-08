import { Component, OnInit,Input } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Route } from './route';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.sass']
})
export class RouteComponent implements OnInit {

  @Input() routeId: string;
  @Input() startHour: string;
  @Input() place: string;

  route: Route = new Route();

  constructor(private routeService: RouteService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.routeId){
      this.routeService.getRoute(this.routeId).subscribe(
        route => this.route = route
      );
    }
  }

  getSafeUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
