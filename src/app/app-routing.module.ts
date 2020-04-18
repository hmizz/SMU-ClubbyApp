import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './authentication/login/login.component';
import { ClubsComponent } from './clubs/clubs.component';
import { EventsComponent } from './events/events.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import {CreateEventComponent} from './events/create-event/create-event.component'
import {EventListComponent} from './events/event-list/event-list.component'
import { from } from 'rxjs';
 const routes: Routes = [
  { path: '', component: BodyComponent, },
  { path: 'login', component: LoginComponent, },
  {path: "signup", component: SignUpComponent},
  { path: 'clubs', component: ClubsComponent, },
  {path : 'events', component: EventsComponent},
  {path:'eventlist', component:EventListComponent},
  {path:'createEvent', component:CreateEventComponent} 
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
