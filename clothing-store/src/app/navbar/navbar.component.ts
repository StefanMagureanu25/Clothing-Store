import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Update the path
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService, private productService : ProductService) { }


  ngOnInit(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.username = user.displayName || 'User'; 
      } else {
        this.isLoggedIn = false;
        this.username = '';
      }
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
