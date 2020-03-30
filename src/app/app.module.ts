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
    
  ],
  imports: [
    BrowserModule,
    
    BrowserAnimationsModule,
    AppRoutingModule,
    CarouselModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
