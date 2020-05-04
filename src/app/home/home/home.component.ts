import { Component, OnInit, HostListener } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  cards: number[] = [0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, , 0, 0, 0, 0, 0];
  colCount = 5;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}

  @HostListener("window:resize", ["$event"])
  resizeWindow(event) {
    const width = event.target.innerWidth;
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
