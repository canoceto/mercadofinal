import {Injectable} from '@angular/core';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;

  constructor(public fireAuth: AngularFireAuth, private firebase: AngularFirestore, private router: Router) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.user = null;
        localStorage.setItem('user', null);
      }
    });
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  async register(email: string, password: string) {
    await this.fireAuth.createUserWithEmailAndPassword(
      email,
      password
    ).then((crentials) => {
        this.firebase.collection('credit').add({
          credit: 100,
          userId: crentials.user.uid
        });
      }
    );
  }

  loginWithGoogle(): Promise<any> {
    return this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async logout() {
    await this.fireAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['home']);
  }
}
