import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-owlcarousel',
  templateUrl: './owlcarousel.component.html',
  styleUrls: ['./owlcarousel.component.css']
})
export class OwlcarouselComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
}


  


