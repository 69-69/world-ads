// app/models/Profile.ts
//
import { User } from './User';

export class Profile extends User {
    [key: string]: unknown; // This allows Profile to accept any extra properties

    constructor(user: User, extraProperties?: Record<string, unknown>) {
        super(user);
        if (extraProperties) {
            Object.assign(this, extraProperties);
        }
    }
}
