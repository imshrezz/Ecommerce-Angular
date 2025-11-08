import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart';
import { MatSelectModule } from '@angular/material/select'; // ✅ ADD THI

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule, // ✅ ADD THI
    MatProgressSpinnerModule,
  ],
  standalone: true,
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = '';
  priceRange = 100000;
  loading = true;

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private snack: MatSnackBar,
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      console.log('Fetched products:', data); // ✅ Check this in console
      this.products = data;
      this.filteredProducts = data;
      this.categories = [...new Set(data.map((p) => p.category))];
      this.loading = false;
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(
      (p) =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        (!this.selectedCategory || p.category === this.selectedCategory) &&
        p.price <= this.priceRange
    );
  }

  searchProducts() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((p) => p.title.toLowerCase().includes(term));
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.priceRange = 100000;
    this.filteredProducts = [...this.products];
  }

  addToCart(product: any) {
    this.cart.addToCart(product);
    this.snack.open('Added to cart!', 'Close', { duration: 1500 });
  }

}
