# AngularEcommerce

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

ng serve


🛍️ Project Name: Angular eCommerce Website
⚙️ Tech Stack

Frontend: Angular (Standalone Components, Routing, Lazy Loading)

UI Library: Angular Material + Custom CSS

Backend/API: FakeStoreAPI
 (public API for demo products)

Storage: LocalStorage (for Auth, Cart, and Orders)

Hosting: Vercel

Version Control: Git + GitHub

🎯 Project Objective

A fully responsive eCommerce web app built using Angular that allows users to:

Browse and search products

Add products to a cart

Place orders with address and payment options

View order history and edit their profile

The main focus is on Angular concepts, clean UI, modular architecture, and state management using services and RxJS.

🧩 Core Features
🏠 1. Home / Products Page

Displays product list fetched from FakeStoreAPI.

Includes:

Search functionality

Product details modal/page

Add to Cart option

Uses Angular HTTPClient and Async data binding.

🛒 2. Cart Page

Displays all selected products with quantity and total price.

Supports:

Increment/decrement quantity

Remove item

Checkout navigation

Cart data is synced via CartService using BehaviorSubject.

💳 3. Checkout Page

Captures delivery address and payment method (COD / UPI).

Automatically pre-fills address from logged-in user data.

Uses Angular Material SnackBar for success/error messages.

When an order is placed:

Data saved to OrderService

Cart cleared

Redirects to Order Success Page

🎉 4. Order Success Page

Displays a confirmation message with a “Continue Shopping” button.

📦 5. Order History (Profile Page)

Shows all previously placed orders stored in localStorage.

Displays order details like items, total amount, and date.

👤 6. User Authentication

Register and Login using AuthService (localStorage-based mock auth).

Form validation using Reactive Forms:

Email validation

Password min length

Phone number & pincode numeric + length validation

Once logged in, user details are available globally.

⚙️ 7. Lazy Loading + Routing

app.routes.ts defines routes with lazy loading using:

loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent)


This improves app performance and load speed.

🧠 Angular Concepts Used

✅ Standalone Components
✅ Angular Routing and Navigation
✅ Lazy Loading
✅ Dependency Injection (Services)
✅ RxJS BehaviorSubject for state management
✅ Angular Material (UI + Snackbars)
✅ LocalStorage Integration
✅ Reactive Forms and Validators
✅ Lifecycle Hooks (ngOnInit, ngOnDestroy)

🧰 Services
Service	Purpose
ProductService	Fetches products from FakeStoreAPI
CartService	Manages cart items (add/remove/update)
OrderService	Stores and retrieves orders
AuthService	Handles user registration, login, and logout
💾 Data Storage

LocalStorage keys:

user → logged-in user data

cart → current cart items

orders → order history

Data is retrieved and updated using services — no direct DOM manipulation.

🎨 UI & UX

Clean layout with Angular Material design

Responsive across desktop and mobile

Toast messages for actions (add to cart, order placed, validation)

Modern confirmation and empty-state screens

🚀 Deployment

Built with ng build --prod

Deployed to Vercel

Public API (FakeStoreAPI) allows it to run without backend setup

🏁 Summary (Interview Style Answer)

"I built a fully functional eCommerce website using Angular, integrating product data from a public API. It includes authentication, cart management, checkout with address and payment, and an order history page. I used Angular services with RxJS for state management, lazy loading for performance, and Angular Material for UI. All data like user info, orders, and cart are stored in localStorage. The project is deployed on Vercel and fully responsive."
