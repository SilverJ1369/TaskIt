import { EventEmitter, Injectable } from '@angular/core';
import { Task, Priority, Status } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {
  private myTasks: Task[] = [
    new Task(1, 'Create a New Task', new Date("10/21/2023"), Priority.low, Status.todo, 'testing description'),
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
