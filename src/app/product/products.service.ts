import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireList} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../model/product';
import {combineLatest} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firebase: AngularFirestore, private authService: AuthService) {
  }

  productList: AngularFireList<any>;
  addButton = 'ADD';

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    owner: new FormControl(''),
    ventaActiva: new FormControl('')
  });

  getProductList() {
    const productObservable = this.firebase.collection('products').snapshotChanges();
    const tokenObservable = this.firebase.collection('credit').snapshotChanges();
    const userObservable = this.authService.useEventChange.asObservable();
    return combineLatest(productObservable, tokenObservable, userObservable);
  }
  //
  // insertProduct(products: Product) {
  //   return this.firebase.collection('products').add(products);
  // }

  updateProduct(product: Product) {
    delete product.id;
    this.firebase.doc('products/' + product.id).update(product);
  }

  deleteProduct(productId: string) {
    this.firebase.doc('products/' + productId).delete();
  }

  editProductList(todo: any) {
    this.form.patchValue(todo);
    this.addButton = 'UPDATE';
  }

  resetForm() {
    this.addButton = 'ADD';
    this.form.reset();
  }
}
