import {Injectable} from '@angular/core';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;
  useEventChange: Subject<User> = new Subject<User>();

  constructor(public fireAuth: AngularFireAuth, private firebase: AngularFirestore, private router: Router) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.useEventChange.next(this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.user = null;
        this.useEventChange.next(this.user);
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
        // Defaut values, because
        const productTemp: Product = {
          name: email,
          price: 20,
          ventaActiva: false,
          owner: crentials.user.uid
        };
        this.firebase.collection('products').add(productTemp).then((resul) => {
          productTemp.id = resul.id;
          this.updateProduct(productTemp);
        });
      }
    );
  }

  updateProduct(product: Product) {
    this.firebase.doc('products/' + product.id).update(product);
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
    this.useEventChange.next(null);
    this.router.navigate(['home']);
  }
}
