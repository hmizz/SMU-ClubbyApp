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
              category: club.category,
              events: club.events,
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

  addClub(title: string, description: string, category: string) {
    const club: Club = {
      id: null,
      title: title,
      description: description,
      category: category,
      events: null,
      approved: null,
    };
    this.http
      .post<{ message: string; clubId: string }>(
        "http://localhost:3000/api/clubs",
        club
      )
      .subscribe((responseData) => {
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
