import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string;
  password: string;
  username: string; // Add username property
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.email, this.password, this.username) // Pass username to AuthService
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'Email is already in use.';
        } else {
          this.errorMessage = error.message;
        }
      });
  }
}