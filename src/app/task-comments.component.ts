import { Component, Input } from '@angular/core';
import { TaskComment } from './task.model';
import { AuthService } from './auth.service';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrl: './task-comments.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TaskCommentsComponent {
  @Input() taskId!: string;
  @Input() comments: TaskComment[] = [];
  newComment = '';
  error = '';
  userEmail = '';

  constructor(private authService: AuthService, private taskService: TaskService) {
    this.authService.user$.subscribe(user => {
      this.userEmail = user?.email || '';
    });
  }

  async addComment() {
    this.error = '';
    if (!this.newComment.trim()) return;
    const comment: TaskComment = {
      text: this.newComment,
      createdAt: Date.now(),
      user: this.userEmail
    };
    try {
      await this.taskService.addComment(this.taskId, comment);
      this.newComment = '';
    } catch (err: any) {
      this.error = err.message;
    }
  }
} 