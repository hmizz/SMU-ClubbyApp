import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Club } from "../club.model";
import { ClubsService } from "../clubs.service";

@Component({
  selector: "app-club-list",
  templateUrl: "./club-list.component.html",
  styleUrls: ["./club-list.component.css"]
})
export class clubListComponent implements OnInit, OnDestroy {
  clubs: Club[]= [];
  private ClubsSub: Subscription;

  constructor(public ClubsService: ClubsService) {}

  ngOnInit() {
     this.ClubsService.getClubs();
    this.ClubsSub = this.ClubsService.getClubUpdateListener()
      .subscribe((clubs: Club[]) => {
        this.clubs = clubs;
      });
  }

  ngOnDestroy() {
    this.ClubsSub.unsubscribe();
  }
}
