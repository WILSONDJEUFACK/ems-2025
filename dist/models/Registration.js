export class Registration {
    constructor(eventId, userEmail, registrationDate = new Date()) {
        this.eventId = eventId;
        this.userEmail = userEmail;
        this.registrationDate = registrationDate;
    }
}
