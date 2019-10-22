import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class User {
    id: string;
    email: string;
    firstName?: string = null;
    lastName?: string = null;
    bike? :string = null;
    birthDate? = null;

    constructor(){ }

}