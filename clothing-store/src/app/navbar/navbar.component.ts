import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.username = user ? user.displayName || 'User' : '';
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
