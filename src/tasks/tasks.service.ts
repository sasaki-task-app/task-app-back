import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import {v4} from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Do something',
      description: 'Do something',
      status: TaskStatus.PENDING,
    },
  ];
  getAllTasks() {
    return this.tasks;
  }
  createTask(title: string, description: string) {
    const task: Task = {
      id: v4(),
      title: title,
      description: description,
      status: TaskStatus.PENDING,
    };
    this.tasks.push(task);
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getTasksById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  updateTask(id: string, updatedFields: any) {
    const task = this.getTasksById(id);
    const newTask = Object.assign(task, updatedFields);
    this.tasks = this.tasks.map((task) => (task.id === id ? newTask : task));
    return newTask;
  }
}
