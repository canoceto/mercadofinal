import { Component, OnInit, HostListener } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Product } from 'src/app/model/product';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  products: Product[] = [
    {
      name: 'Apple',
      description: 'Description',
      price: 500,
      owner: ''
    },{
      name: 'Apple',
      description: 'Description',
      price: 500,
      owner: ''
    },{
      name: 'Apple',
      description: 'Description',
      price: 500,
      owner: ''
    },{
      name: 'Apple',
      description: 'Description',
      price: 500,
      owner: ''
    },{
      name: 'Apple',
      description: 'Description',
      price: 500,
      owner: ''
    },{
      name: 'Apple',
      description: 'Description',
      price: 500,
      owner: ''
    },{
      name: 'Apple',
      description: 'Description',
      price: 500,
      owner: ''
    },
  ];
  colCount = 5;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.updateColCount(window.innerWidth)
  }

  @HostListener("window:resize", ["$event"])
  resizeWindow(event) {
    const width = event.target.innerWidth;
    this.updateColCount(width);
  }
  updateColCount(width: number) {
    if (width < 220) {
      this.colCount = 1;
    } else if (width < 480) {
      this.colCount = 2;
    } else if (width < 680) {
      this.colCount = 3;
    } else if (width < 768) {
      this.colCount = 4;
    } else {
      this.colCount = 5;
    }
  }
}
