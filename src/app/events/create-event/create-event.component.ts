import { Component, OnInit } from '@angular/core';
import {  FormGroup, Validators, FormControl } from '@angular/forms';
import { EventListService } from '../event-list.service';
import { from } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Event} from '../event.model';
import { mimeType } from 'src/app/clubs/create-club/mime-type.validator';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  event: Event;
  isLoading = false;
  form:FormGroup;
  imagePreview: string ;

  private mode = 'create';
  private eventId: string;
  
  
  constructor(public eventListService: EventListService, public route: ActivatedRoute) { }
  

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl(null,{
        validators:[Validators.required, Validators.minLength(3)]
      }),
      organizer: new FormControl(null,{validators:[Validators.required]}),
      date: new FormControl(null,{validators:[Validators.required]}),
      time: new FormControl(null,{validators:[Validators.required]}),
      location: new FormControl(null,{validators:[Validators.required]}),
      description: new FormControl(null,{validators:[Validators.required]}),
      image: new FormControl(null, {validators:[Validators.required],
         asyncValidators: [mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('eventId')){
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.isLoading = true;
        this.eventListService.getEvent(this.eventId).subscribe(eventData =>{
          this.isLoading = false;
          this.event = {id: eventData._id, title:eventData.title, organizer:eventData.organizer, date:eventData.date,
            time:eventData.time, description:eventData.content ,
            location:eventData.location, topic:eventData.topic,imagePath:null};
        });
      } else {
        this.mode = 'create';
        this.eventId = null;
      }
    });
  }
  

  onSaveEvent() {
    
      this.eventListService.addEvent(
        this.form.value.title,
        this.form.value.organizer,
        this.form.value.date.toDateString(),
        this.form.value.time ,
        this.form.value.content,
        this.form.value.location,
        this.form.value.image);

    
    
        this.form.reset();
  }
  onImagePicked(event: any){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imagePreview =reader.result as string;
    };
    
    reader.readAsDataURL(file);
  }

  
}
