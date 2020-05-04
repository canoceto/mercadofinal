import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../products.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from '../../model/product';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  products: Product[];
  displayedColumns: string[] = ['name', 'price', 'description', 'action'];
  dataSource: MatTableDataSource<Product>;

  constructor(public service: ProductsService, private authService: AuthService) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.service.getProductList().subscribe(data => {
      this.products = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: (e.payload.doc.data() as any).name,
          description: (e.payload.doc.data() as any).description,
          price: (e.payload.doc.data() as any).price,
          owner: this.authService.user.uid
        } as Product;
      });
    });
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.dataSource.paginator = this.paginator;

  }

  onSubmit() {
    const productTemp: Product = {
      name: this.service.form.value.name,
      price: this.service.form.value.price,
      description: this.service.form.value.description,
      owner: this.authService.user.uid
    };
    if (this.service.form.valid) {
      this.service.insertProduct(productTemp).then((resul) => {
        productTemp.id = resul.id;
        this.products[this.products.length] = productTemp;
      });
    }
  }

  update(product: Product) {
    this.service.updateProduct(product);
  }

  delete(id: string) {
    this.service.deleteProduct(id);
  }
}
