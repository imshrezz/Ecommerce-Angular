import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {}
