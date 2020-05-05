import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BuySellService {

  constructor(private firebase: AngularFirestore) {
  }


  checkCredit(id: string) {
    return this.firebase.collection('credit').doc(id).get();
  }

  updateCredit(id: string, cant: number) {
    this.firebase.collection('credit').doc(id).update({credit: cant});
  }
}
