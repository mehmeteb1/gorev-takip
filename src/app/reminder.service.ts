import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { Reminder } from './reminder.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReminderService {
  private remindersRef;

  constructor(private firestore: Firestore) {
    this.remindersRef = collection(this.firestore, 'reminders');
  }

  getReminders(userId: string): Observable<Reminder[]> {
    const q = query(this.remindersRef, where('userId', '==', userId));
    return collectionData(q, { idField: 'id' }) as Observable<Reminder[]>;
  }

  addReminder(reminder: Reminder) {
    return addDoc(this.remindersRef, reminder);
  }

  deleteReminder(id: string) {
    const reminderDoc = doc(this.firestore, `reminders/${id}`);
    return deleteDoc(reminderDoc);
  }
} 