import { Component } from '@angular/core';
import { Product } from '../entities';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId !== null) {
      this.productService.getProductById(productId).subscribe(product => {
        this.product = product;
      });
      
    } else {
      console.log("error - product not found");
    }
  }

  onOverlayClick() {
    // Navigate back to the product list when clicking outside the detailed view
    this.router.navigate(['/']);
  }
  addToCart() {
    if (this.product)
      this.productService.addToCart(this.product);
  }
}
