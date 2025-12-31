export class EventModel {
    constructor(id, title, description, date, location, category, maxCapacity, currentParticipants = 0) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.location = location;
        this.category = category;
        this.maxCapacity = maxCapacity;
        this.currentParticipants = currentParticipants;
    }
}
