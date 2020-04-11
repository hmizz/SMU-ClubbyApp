import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Club } from './club.model';

@Injectable({ providedIn: 'root' })
export class ClubsService {
  private clubs: Club[] = [];
  private clubsUpdated = new Subject<Club[]>();

  constructor(private http: HttpClient) { }

  getClubs() {
    this.http.get<{ message: string, clubs: any }>('http://localhost:3000/api/clubs')
      .pipe(map((clubData) => {
        return clubData.clubs.map(club => {
          return {
            title: club.title,
            description: club.description,
            category: club.category,
            events: club.events,
            id: club._id
          };
        });
      }))
      .subscribe((transformedClubs) => {
        this.clubs = transformedClubs;
        this.clubsUpdated.next([...this.clubs]);
      });
  }

  getClubUpdateListener() {
    return this.clubsUpdated.asObservable();
  }

  addClub(title: string, content: string, category:string) {
    const club: Club = { id: null, title: title, description: content, category: category, events: null };
    this.http.post<{ message: string, clubId: string }>('http://localhost:3000/api/clubs', club)
      .subscribe((responseData) => {
        const id = responseData.clubId;
        club.id = id;
        console.log(responseData.message);
        this.clubs.push(club);
        this.clubsUpdated.next([...this.clubs]);
      });

  }
}