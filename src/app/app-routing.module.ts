import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './authentication/login/login.component';

import { EventsComponent } from './events/events.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import {CreateEventComponent} from './events/create-event/create-event.component'
import {EventListComponent} from './events/event-list/event-list.component'
import { ClubsComponent } from './clubs/clubs.component';
import { CreateClubComponent } from './clubs/create-club/create-club.component';
import { clubListComponent } from './clubs/club-list/club-list.component';
import { AuthGuard } from './authentication/auth.guard';
import { ProfileComponent } from './profile/profile.component';

 const routes: Routes = [
  { path: '', component: BodyComponent, },
  { path: 'login', component: LoginComponent, },
  {path: "signup", component: SignUpComponent},
  { path: 'clubs', component: ClubsComponent, },
  {path : 'events', component: EventsComponent},
  {path:'eventlist', component:EventListComponent},
  {path:'createEvent', component:CreateEventComponent, canActivate: [AuthGuard]},
  {path:'clublist', component:clubListComponent},
  {path:'createclub', component:CreateClubComponent, canActivate: [AuthGuard]},
  {path:'editEvent/:eventId', component:CreateEventComponent, canActivate: [AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
