import { Component } from '@angular/core';
import { Reminder } from './reminder.model';
import { ReminderService } from './reminder.service';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RemindersComponent {
  reminders: Reminder[] = [];
  newReminder = '';
  userId = '';
  error = '';

  constructor(private reminderService: ReminderService, private authService: AuthService) {
    this.authService.user$.subscribe(user => {
      this.userId = user?.uid || '';
      if (this.userId) {
        this.reminderService.getReminders(this.userId).subscribe(reminders => {
          this.reminders = reminders;
        });
      }
    });
  }

  addReminder() {
    this.error = '';
    if (!this.newReminder.trim()) return;
    this.reminderService.addReminder({
      userId: this.userId,
      text: this.newReminder,
      createdAt: Date.now()
    }).then(() => this.newReminder = '').catch(err => this.error = err.message);
  }

  deleteReminder(id: string) {
    this.reminderService.deleteReminder(id).catch(err => this.error = err.message);
  }
} 