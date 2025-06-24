import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { updateProfile } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfileComponent {
  email = '';
  displayName = '';
  uid = '';
  error = '';
  success = '';

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.email = user?.email || '';
      this.displayName = user?.displayName || '';
      this.uid = user?.uid || '';
    });
  }

  async updateDisplayName() {
    this.error = '';
    this.success = '';
    const user = await this.authService.user$.toPromise();
    if (user) {
      try {
        await updateProfile(user, { displayName: this.displayName });
        this.success = 'Display name updated!';
      } catch (err: any) {
        this.error = err.message;
      }
    }
  }
} 