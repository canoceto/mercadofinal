import {Component, HostListener, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Product} from 'src/app/model/product';
import {ProductsService} from '../../product/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[];
  colCount = 5;

  constructor(public service: ProductsService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.updateColCount(window.innerWidth);
    this.service.getProductList().subscribe(([data, tokenData, user]) => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: (e.payload.doc.data() as any).name,
          price: (e.payload.doc.data() as any).price,
          ventaActiva: (e.payload.doc.data() as any).ventaActiva,
          owner: (e.payload.doc.data() as any).owner,
          tokens: (tokenData
            .find(value => {
                return (value.payload.doc.data() as any).userId === (e.payload.doc.data() as any).owner;
              }
            ).payload.doc.data() as any).credit
        } as Product;
      }).filter((temp) => {
        if (user != null) {
          return (user.uid !== temp.owner && temp.ventaActiva && temp.tokens !== 0);
        }
        return true;
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  resizeWindow(event) {
    const width = event.target.innerWidth;
    this.updateColCount(width);
  }

  updateColCount(width: number) {
    if (width < 220) {
      this.colCount = 1;
    } else if (width < 480) {
      this.colCount = 2;
    } else if (width < 680) {
      this.colCount = 3;
    } else if (width < 768) {
      this.colCount = 4;
    } else {
      this.colCount = 5;
    }
  }
}
