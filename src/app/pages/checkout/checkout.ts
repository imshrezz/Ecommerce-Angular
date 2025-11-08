
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CartService } from '../../services/cart';
import { OrderService, Order } from '../../services/order-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  total = 0;
  private cartSubscription?: Subscription;

  address = {
    name: '',
    phoneno: '',
    address: '',
    city: '',
    pincode: '',
  };

  paymentMethod = 'cod';
  user: any = {};

  constructor(
    private cart: CartService,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // Auto-fill from user info
    this.address.name = this.user.name || '';
    this.address.phoneno = this.user.phoneno || '';
    this.address.address = this.user.address || '';
    this.address.city = this.user.city;
    this.address.pincode = this.user.pincode;

    this.cartSubscription = this.cart.items$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cart.getTotal();
    });
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
  }

  placeOrder() {
    if (!this.address.city || !this.address.pincode) {
      this.snackBar.open('Please fill in your full address details!', 'Close', {
        duration: 3000,
        panelClass: ['error-toast'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    const order: Order = {
      id: Date.now(),
      items: [...this.cartItems],
      total: this.total,
      date: new Date().toLocaleString(),
      address: { ...this.address },
      paymentMethod: this.paymentMethod,
    };

    this.orderService.addOrder(order);
    this.cart.clear();
    localStorage.setItem('lastPaymentMethod', this.paymentMethod);

    this.snackBar.open('✅ Order placed successfully!', 'View', {
      duration: 2500,
      panelClass: ['success-toast'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });

    setTimeout(() => this.router.navigate(['/order-success']), 800);
  }
}
