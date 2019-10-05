import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material';
import { EventService } from 'src/app/services/event.service';
import { Event } from './event';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.sass']
})
export class CalenderComponent implements OnInit {
  
  selectedDate: any;
  events: Event[] = [];

  constructor(private eventService: EventService) { }

  onSelect(event){
    console.log(this.selectedDate);
    console.log(event);
    this.selectedDate= event;
  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(
      events => this.events = events
    ) ;
  } 
  
  dateClass() {
    console.log(this.events)
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.events
        .map(event => new Date(event.date))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      return highlightDate ? 'event' : '';
    };
  }
}
