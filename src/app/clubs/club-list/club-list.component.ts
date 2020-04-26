import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

import { Club } from "../club.model";
import { ClubsService } from "../clubs.service";

@Component({
  selector: "app-club-list",
  templateUrl: "./club-list.component.html",
  styleUrls: ["./club-list.component.css"]
})
export class clubListComponent implements OnInit{
  clubs: Club[]= [];
  private ClubsSub: Subscription;
  title:string;
  constructor(public ClubsService: ClubsService) {}

  ngOnInit() {
     this.ClubsService.getClubs();
    this.ClubsSub = this.ClubsService.getClubUpdateListener()
      .subscribe((clubs: Club[]) => {
        this.clubs = clubs;
      });
  }

  search(){
    if(this.title !=""){ 
      this.clubs=this.clubs.filter(res=>{
      return res.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
    });

    }else if (this.title==""){
      this.ngOnInit();
    }
   
  }
 
}
