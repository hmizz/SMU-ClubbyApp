import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { ClubsComponent } from './clubs/clubs.component';
import { EventsComponent } from './events/events.component';

 const routes: Routes = [
  { path: '', component: BodyComponent, },
  { path: 'login', component: LoginComponent, },
  { path: 'clubs', component: ClubsComponent, },
  {path : 'events', component: EventsComponent} 
 ];

 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
