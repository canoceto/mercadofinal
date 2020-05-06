import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuySellService {
  credits = 0;
  let;
  id = '';

  constructor(private firebase: AngularFirestore) {
  }

  updateCredit(uid: string, cant: number) {
    this.firebase.collection('credit').snapshotChanges().pipe(take(1), tap(doc => {
        doc.map((x) => {
          if ((x.payload.doc.data() as any).userId === uid) {
            this.credits = (x.payload.doc.data() as any).credit;
            this.firebase.collection('credit').doc(x.payload.doc.id).update({credit: cant + this.credits});
          }
        });
      }
    )).subscribe();
  }

}
