import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './authentication/login/login.component';

import { EventsComponent } from './events/events.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ClubsComponent } from './clubs/clubs.component';

 const routes: Routes = [
  { path: '', component: BodyComponent, },
  { path: 'login', component: LoginComponent, },
  {path: "signup", component: SignUpComponent},
  { path: 'clubs', component: ClubsComponent, },
  {path : 'events', component: EventsComponent} 
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
