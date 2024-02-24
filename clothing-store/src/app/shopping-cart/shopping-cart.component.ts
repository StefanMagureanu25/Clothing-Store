import { Component } from '@angular/core';
import { Product } from '../entities';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartProducts: Product[] = [];
  totalPrice: number = 0;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.cartProducts$.subscribe(cartProducts => {
      this.cartProducts = cartProducts;
    });

    this.productService.totalCartPrice$.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    })
  }

  isCartEmpty() {
    if (this.cartProducts.length == 0)
      return true;
    return false;
  }

  deleteProduct(product: Product) {
    this.productService.deleteFromCart(product);
  }

  checkout() {
    if (!this.isCartEmpty()) {
      this.router.navigate(['/checkout']);
    } else {
      console.log("empty cart");
    }
  }
    

}
