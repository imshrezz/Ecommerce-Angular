import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { CartService, CartItem } from '../../services/cart';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    RouterModule,
    MatSnackBarModule,
  ],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent implements OnInit {
  items$: Observable<CartItem[]>;
  total = 0;
  count = 0;

  constructor(public cart: CartService, private router: Router, private snack: MatSnackBar) {
    this.items$ = this.cart.items$;
  }

  ngOnInit(): void {
    this.items$.subscribe((items) => {
      this.total = items.reduce((s, i) => s + i.price * i.qty, 0);
      this.count = items.reduce((s, i) => s + i.qty, 0);
    });
  }

  increase(i: CartItem) {
    this.cart.updateQuantity(i.id, i.qty + 1);
  }

  decrease(i: CartItem) {
    if (i.qty > 1) this.cart.updateQuantity(i.id, i.qty - 1);
  }

  remove(i: CartItem) {
    this.cart.remove(i.id);
    this.snack.open('Item removed', 'Close', { duration: 1500 });
  }

  checkout() {
    // mock checkout — just clear cart and navigate or show message
    if (this.count === 0) {
      this.snack.open('Cart is empty', 'Close', { duration: 1500 });
      return;
    }
    // Normally call API to create order — here we simulate:
    this.cart.clear();
    this.snack.open('Order placed (demo)', 'Close', { duration: 2000 });
    this.router.navigate(['/products']);
  }
}
