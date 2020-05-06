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
  value = 1;

  constructor(private service: ProductsService, private authService: AuthService, private buySellService: BuySellService) {
  }

  ngOnInit(): void {
  }

  buyToken() {
    if (this.authService.isLoggedIn()) {
      this.buySellService.updateCredit(this.authService.user.uid, this.value);
      this.buySellService.updateCredit(this.product.owner, -this.value);
      alert('Purchase Success ');

    } else {
      // Must be logged to buy
      alert('Must be logged to buy');
    }
  }

  formatLabel(value: number) {
    if (this.product != null && value >= this.product.tokens) {
      return Math.round(value);
    }
    return value;
  }
}
