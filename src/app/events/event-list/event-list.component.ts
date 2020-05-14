import { Component, OnInit } from "@angular/core";
import { Event } from "../event.model";
import { EventListService } from "../event-list.service";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/authentication/auth.service";

@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  isLoading = false;
  title: string;
  private eventsSub: Subscription;
  public userAccess: string;

  constructor(
    public eventsListService: EventListService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userAccess = this.authService.getAccessLevel();
    this.eventsListService.getEvents();
    this.eventsSub = this.eventsListService
      .getEventUpdateListener()
      .subscribe((events: Event[]) => {
        this.isLoading = false;
        this.events = events;
        
      });
  }

  search() {
    if (this.title != "") {
      this.events = this.events.filter((res) => {
        return res.title
          .toLocaleLowerCase()
          .match(this.title.toLocaleLowerCase());
      });
    } else if (this.title == "") {
      this.ngOnInit();
    }
  }

  onDelete(eventId: string) {
    this.eventsListService.deleteEvent(eventId);
  }
  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }
}
