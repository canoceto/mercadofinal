import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../products.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from '../../model/product';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products: Product[];
  displayedColumns: string[] = ['name', 'price', 'action'];
  dataSource: MatTableDataSource<Product>;
  checked = false;
  disabled = false;

  constructor(private router: Router, public service: ProductsService, private authService: AuthService) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.service.getProductList()
      .subscribe(([productData, tokenData, user]) => {
        this.products = productData.map(e => {
          this.checked = (e.payload.doc.data() as any).ventaActiva;
          return {
            id: e.payload.doc.id,
            name: (e.payload.doc.data() as any).name,
            price: (e.payload.doc.data() as any).price,
            owner: (e.payload.doc.data() as any).owner,
            ventaActiva: this.checked,
            tokens: (tokenData
              .find(value => {
                  return (value.payload.doc.data() as any).userId === (e.payload.doc.data() as any).owner;
                }
              ).payload.doc.data() as any).credit
          } as Product;
        }).filter((temp) => {
          return (user != null && user.uid === temp.owner);
        });
      });
    // this.dataSource = new MatTableDataSource<Product>(this.products);
    // this.dataSource.paginator = this.paginator;

  }

  // onSubmit() {
  //   const productTemp: Product = {
  //     name: this.service.form.value.name,
  //     price: this.service.form.value.price,
  //     ventaActiva: this.service.form.value.ventaActiva,
  //     owner: this.authService.user.uid
  //   };
  //   if (this.service.form.valid) {
  //     this.service.insertProduct(productTemp).then((resul) => {
  //       productTemp.id = resul.id;
  //       this.products[this.products.length] = productTemp;
  //     });
  //   }
  // }

  changeState() {
    const product = this.products[0];
    product.ventaActiva = this.checked;
    this.authService.updateProduct(product);
  }

  update(product: Product) {
    this.authService.updateProduct(product);
  }

  delete(id: string) {
    this.service.deleteProduct(id);
  }

}
