import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';

import { Club } from './club.model';

@Injectable({providedIn: 'root'})
export class ClubsService {
  private clubs: Club[] = [];
  private clubsUpdated = new Subject<Club[]>();

  constructor(private http: HttpClient){}

  getClubs() {
    this.http.get<{message: string, clubs : Club[]}>('http://localhost:3000/api/clubs')
    .subscribe((clubData) => {
        this.clubs = clubData.clubs;
        this;this.clubsUpdated.next([...this.clubs]);
    });
  }

  getClubUpdateListener() {
    return this.clubsUpdated.asObservable();
  }

  addClub(title: string, content: string) {
    const club: Club = {id: null, title: title, description: content};
    this.http.post<{message: string}>('http://localhost:3000/api/clubs',club).subscribe((responseData) =>{
      console.log(responseData.message);
      this.clubs.push(club);
      this.clubsUpdated.next([...this.clubs]);
    } );

  }
}