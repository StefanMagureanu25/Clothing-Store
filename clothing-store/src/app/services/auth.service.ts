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

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string, username: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential?.user) {
          return userCredential.user.updateProfile({
            displayName: username
          });
        } else {
          throw new Error('User is null');
        }
      });
  }
  

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    });
  }

  isAuthenticated() {
    return this.afAuth.authState !== null;
  }
}
