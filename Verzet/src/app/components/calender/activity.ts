import { formatDate } from '@angular/common';

export class Activity {
    id: string;
    date;
    title: string;
    place: string
    tour: string;
    type: string;

    getDate(): Date {
        return this.date.toDate();
    }

    getStartHour(): string {
        return formatDate(this.getDate(), 'hh:mm', 'NL' )
    }

    getShortDate(): string {
        return formatDate(this.getDate(), 'shortDate', 'NL' )
    }

}