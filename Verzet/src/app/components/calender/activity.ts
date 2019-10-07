import { formatDate } from '@angular/common';

export class Activity {
    date;
    title: string;
    place: string
    tour: string;

    getDate()
    {
        return this.date.toDate();
    }

    getStartHour()
    {
        return formatDate(this.getDate(), 'hh:mm', 'NL' )
    }

}