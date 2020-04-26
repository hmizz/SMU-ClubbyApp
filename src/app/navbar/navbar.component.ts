import { Component, OnInit, OnDestroy,EventEmitter, Output} from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Subscription, from } from 'rxjs';
import { ClubsService } from '../clubs/clubs.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  username: string;
  @Output() searchcriteria = new EventEmitter<String>();
  constructor(private authService: AuthService ,private clubsService: ClubsService) { }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnInit() {
    this.userIsAuthenticated= this.authService.getIsAuth();
    this.username = this.authService.getUsername();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.username= this.authService.getUsername();
      });
  }
  displayclubs(){
    this.clubsService.getClubs();
  }



}
