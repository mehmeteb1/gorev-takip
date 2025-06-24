import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AuthComponent {
  isLogin = true;
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService) {}

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
  }

  submit() {
    this.error = '';
    if (this.isLogin) {
      this.authService.login(this.email, this.password)
        .catch(err => this.error = err.message);
    } else {
      this.authService.register(this.email, this.password)
        .catch(err => this.error = err.message);
    }
  }
} 