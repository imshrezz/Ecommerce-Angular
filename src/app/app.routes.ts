import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products').then(m => m.ProductsComponent),
    
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-details/product-details').then(m => m.ProductDetailsComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.CartComponent),
    
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.CheckoutComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'order-success',
    loadComponent: () => import('./pages/order-success/order-success').then(m => m.OrderSuccessComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent),
    canActivate: [AuthGuard],
  },
];


