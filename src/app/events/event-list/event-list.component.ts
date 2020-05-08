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
  isLoading = false;
  title: string ;
  private eventsSub : Subscription;


  constructor(public eventsListService:EventListService ) { }

  ngOnInit(){
    this.isLoading= true;
    this.eventsListService.getEvents();
    this.eventsSub = this.eventsListService.getEventUpdateListener()
    .subscribe((events: Event[])=>{
      this.isLoading= false;
      this.events = events;
    })
  }

  search(){
    if(this.title !=""){ 
      this.events=this.events.filter(res=>{
      return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
    });

    }else if (this.title==""){
      this.ngOnInit();
    }
  }

  onDelete(eventId: string){
    this.eventsListService.deleteEvent(eventId);
  }
  ngOnDestroy(){
    this.eventsSub.unsubscribe();
  }

}
