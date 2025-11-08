import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  form: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', [Validators.minLength(10), Validators.required]],
      phoneno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.register(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password,
        this.form.value.address,
        this.form.value.phoneno
      );
      this.snack.open('Account created!', 'Close', { duration: 2000 });
      this.router.navigate(['/login']);
    } else {
      this.snack.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
    }
  }
}
