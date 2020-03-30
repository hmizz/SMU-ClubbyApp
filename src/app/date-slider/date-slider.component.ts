import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-date-slider",
  templateUrl: "./date-slider.component.html",
  styleUrls: ["./date-slider.component.css"]
})
export class DateSliderComponent {
  page = 1;
  today: number = Date.now();
}
