import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventListService } from '../event-list.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  

  constructor(public eventListService: EventListService) { }

  onAddEvent(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.eventListService.addEvent(form.value.title, form.value.organizer, form.value.date, form.value.content)
    form.resetForm();
  }

  ngOnInit(): void {
  }

}
