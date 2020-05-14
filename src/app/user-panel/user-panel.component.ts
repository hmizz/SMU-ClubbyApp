import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {
  public tab = "tabOne" ;
  public userAccess : string ;
  constructor(private authService :AuthService) { }

  ngOnInit(): void {
    this.userAccess= this.authService.getAccessLevel();
  }

}
