import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-login-dialog",
  templateUrl: "./login-dialog.component.html",
  styleUrls: ["./login-dialog.component.css"],
})
export class LoginDialogComponent implements OnInit {
  email: string;
  password: string;
  repeatedPassword: string;
  registerMode: boolean = false;

  constructor(
    private auth: AuthService,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnInit(): void {}

  async login() {
    if (!this.registerMode) {
      if (this.email !== "" && this.password !== "") {
        console.log(await this.auth.login(this.email, this.password));
        this.dialogRef.close();
      }
    } else if (
      this.email !== "" &&
      this.password !== "" &&
      this.password === this.repeatedPassword
    ) {
      console.log(await this.auth.register(this.email, this.password));
      this.dialogRef.close();
    }
  }

  async loginWithGoogle() {
    console.log(await this.auth.loginWithGoogle());
    this.dialogRef.close();
  }

  switchModes() {
    this.repeatedPassword = "";
    this.registerMode = !this.registerMode;
  }
}
