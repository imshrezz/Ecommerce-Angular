import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<any>(this.getUser());
  user$ = this.userSubject.asObservable();

  login(email: string, password: string): boolean {
    const stored = localStorage.getItem('user');
    if (!stored) return false;
    const user = JSON.parse(stored);
    if (user.email === email && user.password === password) {
      localStorage.setItem('loggedIn', 'true');
      this.userSubject.next(user);
      return true;
    }
    return false;
  }

  register(name: string, email: string, password: string, address: string, phoneno: string) {
    const user = { name, email, password, phoneno, address };
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}
