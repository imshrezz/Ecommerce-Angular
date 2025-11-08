// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ProductService } from '../../services/product';
// import { MatCardModule } from '@angular/material/card';
// import { MatButtonModule } from '@angular/material/button';
// import { CartService } from '../../services/cart';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIcon } from '@angular/material/icon';

// @Component({
//   selector: 'app-product-details',
//   standalone: true,
//   imports: [CommonModule, MatCardModule, MatButtonModule, MatToolbarModule, MatIcon],
//   templateUrl: './product-details.html',
//   styleUrls: ['./product-details.css'],
// })
// export class ProductDetailsComponent implements OnInit {
//   product: any;
//   loading = true;

//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private cart: CartService,
//     private snack: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.productService.getProductById(id).subscribe({
//       next: (data) => {
//         this.product = data;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching product details', err);
//         this.loading = false;
//       },
//     });
//   }
//   addToCart(product: any) {
//     const item = {
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       image: product.image, // ✅ include image
//       qty: 1,
//     };
//     this.cart.add(item);
//     this.snack.open('Added to cart!', 'OK', { duration: 1500 });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule, SlicePipe],
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  relatedProducts: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = Number(params['id']);
      this.loading = true;
      this.error = null;
      this.productService.getProductById(id).subscribe({
        next: (p) => {
          this.product = p;
          this.loading = false;
          if (p && p.category) {
            this.loadRelated(p.category);
          }
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.error = 'Failed to load product details';
          this.loading = false;
        }
      });
    });
  }

  loadRelated(category: string) {
    this.productService.getProducts().subscribe((data) => {
      this.relatedProducts = data.filter(
        (p) => p.category === category && p.id !== this.product.id
      );
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.snack.open('Added to cart!', 'Close', { duration: 1500 });
  }

  viewProduct(id: number) {
    this.router.navigate(['/product', id]);
  }
}
