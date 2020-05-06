import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClubsService } from '../clubs.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-create-Club',
  templateUrl: './create-Club.component.html',
  styleUrls: ['./create-Club.component.css']
})
export class CreateClubComponent implements OnInit {
  

  constructor(public ClubsService: ClubsService) { }

  onAddClub(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.ClubsService.addClub(form.value.title, form.value.description, form.value.category)
    form.resetForm();
  }

  ngOnInit(): void {
  }

}