import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { OrderService, Order } from '../../services/order-service';
import { MatIconModule } from '@angular/material/icon';
import { EditProfileDialogComponent } from '../edit-profile/edit-profile';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  orders: Order[] = [];
  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  // ngOnInit(): void {
  //   // Load user info from localStorage
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) this.user = JSON.parse(storedUser);

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.orders = this.orderService.getOrders();
  }

  editProfile() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { ...this.user },
    });

    dialogRef.afterClosed().subscribe((updatedUser: any) => {
      if (updatedUser) {
        this.user = updatedUser;
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    });
  }
}
