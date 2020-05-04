import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { User } from 'firebase';

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent {
  constructor(private auth: AuthService) {}

  loginLogout() {
    if (this.isLoggedIn()) {
      this.auth.logout();
    } else {
      this.auth.loginWithGoogle();
    }
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  getUser(): User{
    return this.auth.user;
  }

  getUserPhoto(): string{
    return this.getUser() ? this.getUser().photoURL : "https://www.materialui.co/materialIcons/social/person_outline_white_192x192.png";
  }
}
