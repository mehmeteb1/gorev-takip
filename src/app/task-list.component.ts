import { Component } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from './task.service';
import { TaskFormComponent } from './task-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCommentsComponent } from './task-comments.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskFormComponent, TaskCommentsComponent]
})
export class TaskListComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  categories: string[] = [];
  selectedCategory = '';
  sortBy: 'createdAt' | 'priority' | 'status' = 'createdAt';
  sortOrder: 'asc' | 'desc' = 'desc';
  editingTask: Task | null = null;
  showForm = false;
  Date = Date;

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.updateCategories();
      this.applyFilters();
    });
  }

  updateCategories() {
    this.categories = Array.from(new Set(this.tasks.map(t => t.category)));
  }

  applyFilters() {
    let tasks = this.tasks;
    if (this.selectedCategory) {
      tasks = tasks.filter(t => t.category === this.selectedCategory);
    }
    tasks = [...tasks].sort((a, b) => {
      if (this.sortBy === 'createdAt') {
        return this.sortOrder === 'asc' ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
      } else if (this.sortBy === 'priority') {
        const p = { low: 1, medium: 2, high: 3 };
        return this.sortOrder === 'asc' ? p[a.priority] - p[b.priority] : p[b.priority] - p[a.priority];
      } else {
        // status
        return this.sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
      }
    });
    this.filteredTasks = tasks;
  }

  setCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  setSort(by: 'createdAt' | 'priority' | 'status') {
    if (this.sortBy === by) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = by;
      this.sortOrder = 'desc';
    }
    this.applyFilters();
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
    this.showForm = true;
  }

  addTask() {
    this.editingTask = null;
    this.showForm = true;
  }

  onFormSaved() {
    this.showForm = false;
    this.editingTask = null;
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }
} 