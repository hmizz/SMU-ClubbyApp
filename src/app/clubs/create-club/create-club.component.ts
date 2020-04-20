import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClubsService } from '../Clubs.service';
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
    this.ClubsService.addClub(form.value.title, form.value.category, form.value.description)
    form.resetForm();
  }

  ngOnInit(): void {
  }

}