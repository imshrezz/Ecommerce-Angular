import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, RouterModule, MatIconModule, MatToolbarModule, MatButtonModule],
})
export class NavbarComponent implements OnInit {
  count = 0;

  constructor(public cart: CartService, private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    // Listen to cart item changes
    this.cart.items$.subscribe((items) => {
      this.count = items.reduce((sum, i) => sum + i.qty, 0);
    });
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
