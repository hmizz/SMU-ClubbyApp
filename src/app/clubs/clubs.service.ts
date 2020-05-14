import { Injectable } from "@angular/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Club } from "./club.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ClubsService {
  private clubs: Club[] = [];
  private clubsWaiting : Club[] = [];
  private clubsUpdated = new Subject<Club[]>();
  private clubsWaitingUpdated = new Subject<Club[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getClubs() {
    this.http
      .get<{ message: string; clubs: any }>("http://localhost:3000/api/clubs")
      .pipe(
        map((clubData) => {
          return clubData.clubs.map((club) => {
            return {
              title: club.title,
              description: club.description,
              category: club.category,
              events: club.events,
              id: club._id,
              imagePath: club.imagePath
            };
          });
        })
      )
      .subscribe((transformedClubs) => {
        this.clubs = transformedClubs;
        this.clubsUpdated.next([...this.clubs]);
      });
  }

  getClubsWaiting() {
    this.http
      .get<{ message: string; clubs: any }>("http://localhost:3000/api/clubs/clubstoapprove")
      .pipe(
        map((clubData) => {
          return clubData.clubs.map((club) => {
            return {
              title: club.title,
              description: club.description,
              clubPresident: club.clubPresident,
              category: club.category,
              members: club.members,
              id: club._id,
            };
          });
        })
      )
      .subscribe((transformedClubs) => {
        this.clubsWaiting = transformedClubs;
        this.clubsWaitingUpdated.next([...this.clubsWaiting]);
      });
  }
  getClubUpdateListener() {
    return this.clubsUpdated.asObservable();
  }

  getClubWaitingUpdateListener() {
    return this.clubsWaitingUpdated.asObservable();
  }
  getClubsArray(){
    return this.clubs ;
  }
  getClub(id: string){
    return this.http.get<{_id: string, title: string, category: string, description:string}>("http://localhost:3000/api/clubs/" + id);
  }

  addClub(title: string, description: string, category: string, image: File) {
    /*const club: Club = {
      id: null,
      title: title,
      description: description,
      category: category,
      events: null,
      approved: null,
    };*/
    const clubData = new FormData();
    clubData.append("title", title);
    clubData.append("description", description);
    clubData.append("category", category);
    clubData.append("image", image, title);
    this.http
      .post<{ message: string; club: Club }>(
        "http://localhost:3000/api/clubs",
        clubData
      )
      .subscribe((responseData) => {
        const club: Club = {id: responseData.club.id,
           title: title,
           description: description,
           category: category,
           events : null,
           approved: null,
           imagePath: responseData.club.imagePath
          };
        console.log(responseData.message);
        this.clubs.push(club);
        this.clubsUpdated.next([...this.clubs]);
        this.router.navigate(["/clubs"]);
      });
  }

  approveClub(clubId : string){
    this.http
    .put("http://localhost:3000/api/clubs/"+ clubId, clubId)
    .subscribe(response => {
      const clubsUpdated = [...this.clubs];
      this.clubs = clubsUpdated;
      this.clubsUpdated.next([...this.clubs]);
      this.clubsWaiting=this.clubsWaiting.filter(club =>club.id != clubId);
      const clubsWaiting = [...this.clubsWaiting];
      this.clubsWaiting = clubsWaiting ;
      this.clubsWaitingUpdated.next([...this.clubsWaiting]);
      this.router.navigate(["/profile"]);
    });
  }

  deleteClub(eventId: string){
    this.http.delete("http://localhost:3000/api/clubs/" + eventId)
    .subscribe(()=>{
      const clubsWaitingUpdated = this.clubsWaiting.filter(event => event.id !== eventId);
      this.clubsWaiting = clubsWaitingUpdated;
      this.clubsWaitingUpdated.next([...this.clubsWaiting]);
    })
  }
}
