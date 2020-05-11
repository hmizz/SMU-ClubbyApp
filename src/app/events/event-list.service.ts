import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event.model';
import { Subject } from 'rxjs';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventListService {

  private events: Event[] = [];
  private eventsUpdated = new Subject<Event[]>();
  private eventsWaiting: Event[] = [];
  private eventsWaitingUpdated = new Subject<Event[]>();

  constructor(private http: HttpClient, private router : Router) { }

  getEvents() {
    this.http.get<{ message: string, events: any }>('http://localhost:3000/api/events')
    .pipe(map((eventData) => {
      return eventData.events.map(event => {
        return {
          id: event._id,
          title: event.title,
          organizer: event.organizer,
          date: event.date,
          time: event.time,
          description: event.description,
          imagePath: event.imagePath,
        };
      });
    }))
      .subscribe((transformedEvents) => {
        this.events = transformedEvents;
        this.eventsUpdated.next([...this.events]);
      });
  }

  getEventsWaiting() {
    this.http
      .patch<{ message: string; events: any }>("http://localhost:3000/api/events/eventstoapprove", false)
      .pipe(
        map((eventData) => {
          return eventData.events.map((event) => {
            return {
              id: event._id,
              title: event.title,
              organizer: event.organizer,
              date: event.date,
              time: event.time,
              description: event.description,
            };
          });
        })
      )
      .subscribe((transformedEvents) => {
        this.eventsWaiting = transformedEvents;
        this.eventsWaitingUpdated.next([...this.eventsWaiting]);
      });
  }
  getClubUpdateListener() {
    return this.eventsUpdated.asObservable();
  }

  getEventUpdateListener() {
    return this.eventsUpdated.asObservable();
  }
  
  getEvent(id: string){
    return this.http.get<{_id: string, title: string, organizer: string, date: string,time:string, content:string, location: string, topic:null}>("http://localhost:3000/api/events/" + id);
  }

  addEvent(title: string, organizer: string,date: string,time: string, description: string,location:string , image: File) {
    /*const event: Event = { id: null, title: title, organizer: organizer, date: date, time: time, location: location, description: content, topic : null };
    */
   const eventData = new FormData();
    eventData.append("title", title);
    eventData.append("organizer", organizer);
    eventData.append("date", date);
    eventData.append("time", time);
    eventData.append("description", description);
    eventData.append("location", location);
    eventData.append("image", image, title);
    this.http
    .post<{ message: string, event: Event }>(
      'http://localhost:3000/api/events', eventData)
      .subscribe((responseData) => {
      const event: Event = {id: responseData.event.id,
        title: title,
        organizer: organizer,
        date: date,
        time : time,
        description:description,
        location:location,
        topic:null,
        imagePath: responseData.event.imagePath
       };

      console.log(responseData.message);
      this.events.push(event);
      this.eventsUpdated.next([...this.events]);
      this.router.navigate(["/events"]);
    });
  }

  updateEvent(id:string, title:string, organizer: string,date: string, time: string,location:string,content:string){
    const event: Event={id: id,title: title,organizer: organizer, date: date,time: time, description: content ,topic : null ,location: location,imagePath: null}
    this.http
    .put("http://localhost:3000/api/events/" + id, event)
    .subscribe(response => {
      const eventsUpdated = [...this.events];
      const oldEventIndex = eventsUpdated.findIndex(e=>e.id === event.id);
      eventsUpdated[oldEventIndex]  = event;
      this.events = eventsUpdated;
      this.eventsUpdated.next([...this.events]);
      this.router.navigate(["/"]);
    });
  }

  deleteEvent(eventId: string){
    this.http.delete("http://localhost:3000/api/events/" + eventId)
    .subscribe(()=>{
      const eventsUpdated = this.events.filter(event => event.id !== eventId);
      this.events = eventsUpdated;
      this.eventsUpdated.next([...this.events]);
    })
  }

  approveEvent(eventId : string){
    this.http
    .put("http://localhost:3000/api/events/approve/"+ eventId, eventId)
    .subscribe(response => {
      const eventsUpdated = [...this.events];
      this.events = eventsUpdated;
      this.eventsUpdated.next([...this.events]);
      this.eventsWaiting=this.eventsWaiting.filter(club =>club.id != eventId);
      const eventsWaiting = [...this.eventsWaiting];
      this.eventsWaiting = eventsWaiting ;
      this.eventsWaitingUpdated.next([...this.eventsWaiting]);
      this.router.navigate(["/profile"]);
    });
  }

  getEventWaitingUpdateListener() {
    return this.eventsWaitingUpdated.asObservable();
  }
  getEventsArray(){
    return this.events ;
  }
}
