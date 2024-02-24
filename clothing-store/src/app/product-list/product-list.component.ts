import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Adjust the path as necessary
import { Product } from '../entities'; // Adjust the path as necessary
import { Observable, mergeMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.productService.getAllProducts();
    };
    onProductClick(productId: string) {
      this.router.navigate(['/product', productId]);
    }
  }

