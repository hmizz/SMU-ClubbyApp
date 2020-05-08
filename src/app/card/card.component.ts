import { Component, OnInit } from '@angular/core';
import {Event} from '../events/event.model';
import {EventListService} from '../events/event-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  events: Event[]=[];
  isLoading = false;
  private eventsSub : Subscription;

  constructor(public eventsListService:EventListService) { }

  ngOnInit() {
    this.isLoading= true;
    this.eventsListService.getEvents();
    this.eventsSub = this.eventsListService.getEventUpdateListener()
    .subscribe((events: Event[])=>{
      this.isLoading= false;
      this.events = events;
    })
  }
  ngOnDestroy(){
    this.eventsSub.unsubscribe();
  }

}
