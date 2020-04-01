import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Club } from "./club.model";
import { ClubsService } from "./clubs.service";


@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})

export class ClubsComponent implements OnInit, OnDestroy  {

  clubs: Club[] = [];
  private clubsSub: Subscription;
  constructor(public clubsService: ClubsService) { }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }


  ngOnInit(): void {
    this.clubsService.getClubs();
    this.clubsSub = this.clubsService.getClubUpdateListener()
      .subscribe((clubs: Club[]) => {
        this.clubs = clubs;
      });
  }

}
