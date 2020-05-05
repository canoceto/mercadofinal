import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { User } from "firebase";
import { MatDialog } from "@angular/material/dialog";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.css"],
})
export class ToolbarComponent {
  constructor(private auth: AuthService, private dialog: MatDialog) {}

  loginLogout() {
    if (this.isLoggedIn()) {
      this.auth.logout();
    } else {
      this.openLoginDialog();
    }
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  getUser(): User {
    return this.auth.user;
  }

  getUserName(): String {
    return this.getUser()
      ? this.getUser().displayName
        ? this.getUser().displayName
        : this.getUser().email
      : "Not logged";
  }

  getUserPhoto(): string {
    return (this.getUser() && this.getUser().photoURL)
      ? this.getUser().photoURL
      : "https://www.materialui.co/materialIcons/social/person_outline_white_192x192.png";
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: "300px",
    });
  }
}
