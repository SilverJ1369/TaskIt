import { Injectable } from '@angular/core';
import { Task, Priority, Status } from './task.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {
  private myTasks: Task[] = [
    new Task(1, 'Create a New Task', new Date("10/21/2023"), Priority.low, Status.todo, 'testing description'),
    new Task(2, 'Create a Second Task', new Date("10/21/2023"), Priority.medium, Status.inProgress, 'testing description'),
    new Task(3, 'Create a Third Task', new Date("10/21/2023"), Priority.medium, Status.completed, 'testing description'),
  ];

  tasklistUpdated: Subject<Task[]> = new Subject<Task[]>();

  constructor() {}

  getTasks() {
    return this.myTasks.slice();
  }

  saveTask(task: Task) {
    this.myTasks.push(task);
    this.tasklistUpdated.next(this.myTasks.slice());
  }

  removeTask(index: number) {
    if (index !== -1) {
      this.myTasks.splice(index, 1)
      this.tasklistUpdated.next(this.myTasks.slice());
    }
  }

  updateTask(result: Task, status?: Status) {
    console.log('result from update task', result);

    const task = this.myTasks.find((task) => task.id == result.id)
    if(task) {
      task.title = result.title;
      task.dueDate = result.dueDate;
      task.priority = result.priority;
      task.status = status;
      task.desc = result.desc;
      this.tasklistUpdated.next(this.myTasks.slice());
    } else return
  }
}
