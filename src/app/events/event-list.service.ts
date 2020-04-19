import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event.model';
import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient) { }

  getEvents() {
    this.http.get<{ message: string, events: any }>('http://localhost:3000/api/events')
    .pipe(map((eventData) => {
      return eventData.events.map(event => {
        return {
          id: event._id,
          title: event.title,
          organizer: event.organizer,
          date: event.date,
          description: event.description,
        };
      });
    }))
      .subscribe((transformedEvents) => {
        this.events = transformedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }
  

  addEvent(title: string, organizer: string,date: string, content: string, ) {
    const event: Event = { id: null, title: title, organizer: organizer, date: date,location: null, description: content, topic : null };
    this.http.post<{ message: string }>('http://localhost:3000/api/events', event).subscribe((responseData) => {
      console.log(responseData.message);
      this.events.push(event);
      this.eventsUpdated.next([...this.events]);
    });
  }
}
