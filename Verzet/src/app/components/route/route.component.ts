import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Route } from './route';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.sass']
})
export class RouteComponent implements OnInit {

  route: Route = new Route();
  safeRouteUrl: SafeResourceUrl = ''

  constructor(private routeService: RouteService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.routeService.getRoute('Sunday').subscribe(
      route => {
        this.route = route;
        this.safeRouteUrl = this.sanitizer.bypassSecurityTrustResourceUrl(route.routeUrl);
      }
    );
  }
}
