import {Component, Input, OnInit} from '@angular/core';
import {Product} from 'src/app/model/product';
import {ProductsService} from '../products.service';
import {AuthService} from '../../auth/auth.service';
import {BuySellService} from '../../services/buy-sell.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;

  constructor(private service: ProductsService, private authService: AuthService, private buySellService: BuySellService) {
  }

  ngOnInit(): void {
  }

  buyProduct() {
    if (this.authService.isLoggedIn()) {
      this.buySellService.checkCredit('ifd3rodovqYyy0zm4MRw').subscribe((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            if (doc.data().credit >= this.product.price) {
              this.buySellService.updateCredit('ifd3rodovqYyy0zm4MRw', doc.data().credit - this.product.price);
              // This is because I consider that there is just one product
              this.service.deleteProduct(this.product.id);
              alert('successful purchase');
            } else {
              alert('You do not have enough credit, your credit=' + doc.data().credit);
            }
          } else {
            console.log('No such document!');
          }
        }
      );

    } else {
      // Must be logged to buy
      alert('Must be logged to buy');
    }
  }
}
