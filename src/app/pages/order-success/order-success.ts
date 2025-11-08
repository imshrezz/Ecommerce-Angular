import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl:"./order-success.html",
  styleUrls: ['./order-success.css'],

})
export class OrderSuccessComponent {
  constructor(private router: Router) {}
  
  goHome() {
    this.router.navigate(['/products']);
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
