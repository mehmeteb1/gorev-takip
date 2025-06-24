import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { TaskListComponent } from './task-list.component';
import { authGuard } from './auth.guard';
import { RemindersComponent } from './reminders.component';
import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings.component';
import { AboutComponent } from './about.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'reminders', component: RemindersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }
];
