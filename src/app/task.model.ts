export interface Subtask {
  title: string;
  completed: boolean;
}

export interface TaskComment {
  text: string;
  createdAt: number;
  user: string;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: number;
  dueDate?: number;
  priority: 'low' | 'medium' | 'high';
  subtasks?: Subtask[];
  comments?: TaskComment[];
} 