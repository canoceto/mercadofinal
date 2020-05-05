import {Component, HostListener, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Product} from 'src/app/model/product';
import {ProductsService} from '../../product/products.service';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    products: Product[];
    // = [
    //     {
    //         id: '1',
    //         name: 'Apple',
    //         description: 'Description',
    //         price: 500,
    //         owner: ''
    //     }, {
    //         id: '2',
    //         name: 'Apple',
    //         description: 'Description',
    //         price: 50,
    //         owner: ''
    //     }, {
    //         id: '3',
    //         name: 'Apple',
    //         description: 'Description',
    //         price: 50,
    //         owner: ''
    //     }, {
    //         id: '4',
    //         name: 'Apple',
    //         description: 'Description',
    //         price: 50,
    //         owner: ''
    //     }, {
    //         id: '5',
    //         name: 'Apple',
    //         description: 'Description',
    //         price: 50,
    //         owner: ''
    //     }, {
    //         id: '6',
    //         name: 'Apple',
    //         description: 'Description',
    //         price: 50,
    //         owner: ''
    //     }, {
    //         id: '7',
    //         name: 'Apple',
    //         description: 'Description',
    //         price: 50,
    //         owner: ''
    //     },
    // ];
    colCount = 5;

    constructor(public service: ProductsService, private breakpointObserver: BreakpointObserver, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.updateColCount(window.innerWidth);
        this.service.getProductList().subscribe(data => {
            this.products = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    name: (e.payload.doc.data() as any).name,
                    description: (e.payload.doc.data() as any).description,
                    price: (e.payload.doc.data() as any).price,
                    owner: (e.payload.doc.data() as any).owner
                } as Product;
            }).filter((temp) => {
                if (this.authService.isLoggedIn()) {
                    return (this.authService.user.uid !== temp.owner);
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
