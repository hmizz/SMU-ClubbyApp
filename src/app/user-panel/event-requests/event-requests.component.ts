import { Component, OnInit } from "@angular/core";

import { Subscription } from "rxjs";
import { EventListService } from "src/app/events/event-list.service";
import { Event } from "src/app/events/event.model";

@Component({
  selector: "app-event-requests",
  templateUrl: "./event-requests.component.html",
  styleUrls: ["./event-requests.component.css"],
})
export class EventRequestsComponent implements OnInit {
  events: Event[] = [];
  private eventsSub: Subscription;
  constructor(public eventsService: EventListService) {}

  ngOnInit(): void {
    this.eventsService.getEventsWaiting();
    this.eventsSub = this.eventsService
      .getEventWaitingUpdateListener()
      .subscribe((events: Event[]) => {
        this.events = events;
      });
  }

  onApprove(id: string) {
    this.eventsService.approveEvent(id);
  }
  onDelete(id: string) {
    this.eventsService.deleteEvent(id);
  }
}
