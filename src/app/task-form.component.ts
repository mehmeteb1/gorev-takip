import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TaskFormComponent {
  @Input() task: Task | null = null;
  @Output() saved = new EventEmitter<void>();
  title = '';
  description = '';
  category = '';
  status: Task['status'] = 'pending';
  priority: Task['priority'] = 'medium';
  error = '';
  dueDate: string = '';
  subtasks: { title: string; completed: boolean }[] = [];

  ngOnInit() {
    if (this.task) {
      this.title = this.task.title;
      this.description = this.task.description;
      this.category = this.task.category;
      this.status = this.task.status;
      this.priority = this.task.priority;
      this.dueDate = this.task.dueDate ? new Date(this.task.dueDate).toISOString().substring(0, 16) : '';
      this.subtasks = this.task.subtasks ? [...this.task.subtasks] : [];
    }
  }

  constructor(private taskService: TaskService) {}

  addSubtask() {
    this.subtasks.push({ title: '', completed: false });
  }

  removeSubtask(i: number) {
    this.subtasks.splice(i, 1);
  }

  toggleSubtask(i: number) {
    this.subtasks[i].completed = !this.subtasks[i].completed;
  }

  submit() {
    this.error = '';
    const task: Task = {
      ...this.task,
      title: this.title,
      description: this.description,
      category: this.category,
      status: this.status,
      priority: this.priority,
      createdAt: this.task?.createdAt || Date.now(),
      dueDate: this.dueDate ? new Date(this.dueDate).getTime() : undefined,
      subtasks: this.subtasks,
    };
    const op = this.task?.id ? this.taskService.updateTask(task) : this.taskService.addTask(task);
    op.then(() => this.saved.emit()).catch(err => this.error = err.message);
  }
} 