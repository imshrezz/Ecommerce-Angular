import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image?: string;
  qty: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private STORAGE_KEY = 'cart_items_v1';
  private _items$ = new BehaviorSubject<CartItem[]>(this.readFromStorage());
  auth: any;

  get items$(): Observable<CartItem[]> {
    return this._items$.asObservable();
  }

  private save(items: CartItem[]) {
    this._items$.next(items);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private readFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  add(product: { id: number; title: string; price: number; image?: string }, qty = 1) {
    const items = [...this._items$.value];
    const idx = items.findIndex((i) => i.id === product.id);
    if (idx > -1) {
      items[idx].qty += qty;
    } else {
      items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty,
      });
    }
    this.save(items);
  }

  updateQuantity(productId: number, qty: number) {
    const items = this._items$.value.map((i) =>
      i.id === productId ? { ...i, qty: Math.max(1, qty) } : i
    );
    this.save(items);
  }

  remove(productId: number) {
    const items = this._items$.value.filter((i) => i.id !== productId);
    this.save(items);
  }

  clear() {
    this.save([]);
  }

  getTotal(): number {
    return this._items$.value.reduce((s, i) => s + i.price * i.qty, 0);
  }

  getTotalCount(): number {
    return this._items$.value.reduce((s, i) => s + i.qty, 0);
  }
  addToCart(product: { id: number; title: string; price: number; image?: string }) {
    this.add(product, 1);
  }
}
