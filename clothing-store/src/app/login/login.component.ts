import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'User not found. Please check your email or register for an account.';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password. Please try again or reset your password.';
            break;
          case 'auth/too-many-requests':
            this.errorMessage = 'Too many login attempts. Please try again later.';
            break;
          default:
            this.errorMessage = 'An error occurred during login. Please try again later.';
            break;
        }
      });
  }
}
