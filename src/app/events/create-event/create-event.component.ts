import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventListService } from '../event-list.service';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Event} from '../event.model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  event: Event;
  isLoading = false;

  private mode = 'create';
  private eventId: string;
  
  
  constructor(public eventListService: EventListService, public route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('eventId')){
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.isLoading = true;
        this.eventListService.getEvent(this.eventId).subscribe(eventData =>{
          this.isLoading = false;
          this.event = {id: eventData._id, title:eventData.title, organizer:eventData.organizer, date:eventData.date, description:eventData.content ,
            location:eventData.location, topic:eventData.topic};
        });
      } else {
        this.mode = 'create';
        this.eventId = null;
      }
    });
  }

  onSaveEvent(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode==='create') {
      console.log(form.value.date);
      this.eventListService.addEvent(form.value.title, form.value.organizer, form.value.date.toISOString(), form.value.content);

    }else{
      this.eventListService.updateEvent(this.eventId,form.value.title, form.value.organizer, form.value.date, form.value.content)
    }
    
    form.resetForm();
  }

  
}
