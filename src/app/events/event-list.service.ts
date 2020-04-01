import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event.model'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class eventListService {
  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient) { }

  getClubs() {
    this.http.get<{ message: string, events: Event[] }>('http://localhost:3000/api/events')
      .subscribe((eventData) => {
        this.events = eventData.events;
        this; this.eventsUpdated.next([...this.events]);
      });
  }

  getClubUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  addClub(title: string, content: string) {
    const event: Event = {id : null, title: title, Organizer: null, date: null, description: content };
    this.events.push(event);
    this.eventsUpdated.next([...this.events]);
  }
}
