import { Component, OnInit } from '@angular/core';
import {Event} from '../event.model';
import {EventListService} from '../event-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[]=[];
  private eventsSub : Subscription;


  constructor(public eventsListService:EventListService ) { }

  ngOnInit(){
    this.eventsListService.getEvents();
    this.eventsSub = this.eventsListService.getEventUpdateListener()
    .subscribe((events: Event[])=>{
      this.events = events;
    })
  }
  ngOnDestroy(){
    this.eventsSub.unsubscribe();
  }

}
