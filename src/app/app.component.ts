import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clubby';
  create: boolean;

  constructor(router:Router, private authService : AuthService) {
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
            this.create = event.url !== "/createEvent";
        }
      });
    }
  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
    
}
