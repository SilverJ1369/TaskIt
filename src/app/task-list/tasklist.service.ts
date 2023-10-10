import { EventEmitter, Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {
  private myTasks: Task[] = [
    new Task('Test task', new Date(), 'low', 'todo'),
    new Task('Test task', new Date(), 'low', 'todo'),
  ];

  tasklistChanged = new EventEmitter<Task[]>();


  constructor() { }

  getTasks() {
    return this.myTasks.slice();
  }

  saveTask(task: Task) {
    this.myTasks.push(task);
    this.tasklistChanged.emit(this.myTasks.slice());
  }

  removeTask(index: number) {
    if (index !== -1) {
      this.myTasks.splice(index, 1)
      this.tasklistChanged.emit(this.myTasks.slice());
    }
  }
}
