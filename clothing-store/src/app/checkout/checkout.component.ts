import { Component, Input } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  @Input() totalPrice: number = 0; 


  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.totalCartPrice$.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    })
  }
  

  pay() {
    this.router.navigate(['/order-successful'])
  }
}
