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
  tab:any;
  message:boolean =false;
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
  FilterAcad(){
  
    
      
    this.clubs = this.ClubsService.getClubsArray();

      this.clubs=this.clubs.filter(res=>{
      return res.category.toLocaleLowerCase().match("academic");
      
    });
    if(this.clubs.length == 0){
      this.message=true;

    }else{

   this.message = false;
  
  }
    
  }
  FilterPol(){
    
    
    this.clubs = this.ClubsService.getClubsArray();

    this.clubs=this.clubs.filter(res=>{
    return res.category.toLocaleLowerCase().match("political");
  });
  if(this.clubs.length == 0){
    this.message=true;

  }else{

 this.message = false;
  
    }
  
}
FilterPub(){
  
  
  this.clubs = this.ClubsService.getClubsArray();

  this.clubs=this.clubs.filter(res=>{
  return res.category.toLocaleLowerCase().match("media & publication groups");
});
if(this.clubs.length == 0){
  this.message=true;

}else{

this.message = false;

}
}
FilterCom(){
  
  
  this.clubs = this.ClubsService.getClubsArray();
    
  this.clubs=this.clubs.filter(res=>{
  return res.category.toLocaleLowerCase().match("community service & social justice");
});
if(this.clubs.length == 0){
  this.message=true;

}else{

this.message = false;
  }
}
FilterArts(){
 
 
  this.clubs = this.ClubsService.getClubsArray();
    
  this.clubs=this.clubs.filter(res=>{
  return res.category.toLocaleLowerCase().match("theater & the arts");
});
if(this.clubs.length == 0){
  this.message=true;

}else{

this.message = false;
  }
}
FilterCult(){
  
 
  this.clubs = this.ClubsService.getClubsArray();
    
  this.clubs=this.clubs.filter(res=>{
  return res.category.toLocaleLowerCase().match("cultural");
});
if(this.clubs.length == 0){
  this.message=true;

}else{

this.message = false;
  }
}
FilterSpirit(){
 
 
  this.clubs = this.ClubsService.getClubsArray();
    
  this.clubs=this.clubs.filter(res=>{
  return res.category.toLocaleLowerCase().match("religious & spiritual");
});
if(this.clubs.length == 0){
  this.message=true;

}else{

this.message = false;
} 
}
FilterSport(){
 
 
  this.clubs = this.ClubsService.getClubsArray();
    
  this.clubs=this.clubs.filter(res=>{
  return res.category.toLocaleLowerCase().match("sports");
});
if(this.clubs.length == 0){
  this.message=true;

}else{

this.message = false;
  }
}
  
}
