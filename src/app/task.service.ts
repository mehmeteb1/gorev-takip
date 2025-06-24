import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where } from '@angular/fire/firestore';
import { Task, TaskComment } from './task.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksRef;

  constructor(private firestore: Firestore) {
    this.tasksRef = collection(this.firestore, 'tasks');
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksRef, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Task) {
    return addDoc(this.tasksRef, task);
  }

  updateTask(task: Task) {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskDoc, { ...task });
  }

  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDoc);
  }

  async addComment(taskId: string, comment: TaskComment) {
    const taskDoc = doc(this.firestore, `tasks/${taskId}`);
    // Get current comments
    const snap = await import('firebase/firestore').then(fb => fb.getDoc(taskDoc));
    const data = snap.exists() ? snap.data() : {};
    const comments = Array.isArray(data['comments']) ? data['comments'] : [];
    comments.push(comment);
    return updateDoc(taskDoc, { comments });
  }
} 