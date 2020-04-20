import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Club } from "./club.model";
import { ClubsService } from "./clubs.service";


@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})

export class ClubsComponent implements OnInit  {

  Clubs: Club[] = [];
  private clubsSub: Subscription;
  constructor(public clubsService: ClubsService) { }




  ngOnInit(): void {
    
  }
}
   