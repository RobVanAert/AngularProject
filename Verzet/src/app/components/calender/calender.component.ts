import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.sass']
})
export class CalenderComponent implements OnInit {
  
  selectedDate: any;
  datesArray: string[] = ["2019-10-22T18:30:00.000Z"]

  constructor() { }

  onSelect(event){
    console.log(this.selectedDate);
    console.log(event);
    this.selectedDate= event;
  }

  ngOnInit() {
  }
  
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesArray
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      
      return highlightDate ? 'event' : '';
    };
  }


}
