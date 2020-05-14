import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Club } from "src/app/clubs/club.model";
import { ClubsService } from "src/app/clubs/clubs.service";

@Component({
  selector: "app-club-requests",
  templateUrl: "./club-requests.component.html",
  styleUrls: ["./club-requests.component.css"],
})
export class ClubRequestsComponent implements OnInit {
  clubs: Club[] = [];
  private ClubsSub: Subscription;
  constructor(public ClubsService: ClubsService) {}

  ngOnInit(): void {
    this.ClubsService.getClubsWaiting();
    this.ClubsSub = this.ClubsService.getClubWaitingUpdateListener().subscribe(
      (clubs: Club[]) => {
        this.clubs = clubs;
      }
    );
  }

  onApprove(id: string) {
    this.ClubsService.approveClub(id);
  }
  onDelete(id: string) {
    this.ClubsService.deleteClub(id);
  }
}
