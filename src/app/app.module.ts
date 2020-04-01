import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from './login/login.component';

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
import {HttpClientModule} from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { EventsComponent } from './events/events.component';

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
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CarouselModule,
    NgbModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
