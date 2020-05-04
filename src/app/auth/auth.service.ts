import { Injectable } from "@angular/core";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user: User;
  constructor(public fireAuth: AngularFireAuth) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        this.user = null;
        localStorage.setItem("user", null);
      }
    });
  }

  async loginWithGoogle() {
    await this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  async logout() {
    await this.fireAuth.signOut();
    localStorage.removeItem("user");
  }
}
