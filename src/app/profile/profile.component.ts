import { Component, OnInit, ElementRef } from "@angular/core";
import { ClubsService } from '../clubs/clubs.service';
import { Club } from '../clubs/club.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  step="step1";
  clubs: Club[]= [];
  username : string
  private ClubsSub: Subscription;
  constructor( public ClubsService : ClubsService, private authService :AuthService) {}
   userAccess : Number ;
  ngOnInit(): void {
    this.ClubsService.getClubsWaiting();
    this.ClubsSub = this.ClubsService.getClubWaitingUpdateListener()
      .subscribe((clubs: Club[]) => {
        this.clubs = clubs;
        this.userAccess= this.authService.getAccessLevel();
        this.username= this.authService.getUsername();
      });
  }

  onApprove(id : string){
    this.ClubsService.approveClub(id);
  }
  onDelete(id : string){
    this.ClubsService.deleteClub(id);
  }
}
