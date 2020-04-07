import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule} from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./navbar/navbar.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { CardComponent } from './card/card.component';
import { BodyComponent } from './body/body.component';
import { DateSliderComponent } from './date-slider/date-slider.component';
import { DatesComponent } from './dates/dates.component';
import { CardsDeckComponent } from './cards-deck/cards-deck.component';
import { FooterComponent } from './footer/footer.component';
import { OwlcarouselComponent } from './owlcarousel/owlcarousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ClubsComponent } from './clubs/clubs.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { EventsComponent } from './events/events.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { AuthInterceptor } from './authentication/auth-interceptor';
import { EventSearchComponent } from './events/event-search/event-search.component';
import { EventListComponent } from './events/event-list/event-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    DatepickerComponent,
    CardComponent,
    BodyComponent,
    DateSliderComponent,
    DatesComponent,
    CardsDeckComponent,
    FooterComponent,
    OwlcarouselComponent,
    LoginComponent,
    ClubsComponent,
    EventsComponent,
    SignUpComponent,
    EventSearchComponent,
    EventListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    NgbModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
