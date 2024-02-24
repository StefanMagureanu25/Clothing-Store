import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.authState$ = this.afAuth.authState;
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string, username: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (userCredential?.user) {
        await userCredential.user.updateProfile({
          displayName: username
        });
        return userCredential.user;
      } else {
        throw new Error('User is null');
      }
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/home']);
    } catch (error) {
      throw error;
    }
  }

  isAuthenticated() {
    return this.afAuth.authState !== null;
  }
}
