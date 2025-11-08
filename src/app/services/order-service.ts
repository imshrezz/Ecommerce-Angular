import { Injectable } from '@angular/core';

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  image?: string;
  qty: number;
}

export interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  total: number;
  address?: any;
  paymentMethod?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [];

  getOrders(): Order[] {
    // Retrieve from localStorage for persistence
    const data = localStorage.getItem('orders');
    this.orders = data ? JSON.parse(data) : [];
    return this.orders;
  }

  addOrder(order: Order): void {
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  clearOrders(): void {
    this.orders = [];
    localStorage.removeItem('orders');
  }
}
