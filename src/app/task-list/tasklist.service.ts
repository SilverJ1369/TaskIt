import { Injectable } from '@angular/core';
import { Task, Priority, Status } from './task.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {
  private myTasks: Task[] = [];

  tasklistUpdated: Subject<Task[]> = new Subject<Task[]>();
  taskUpdated: Subject<{task: Task, action: string}> = new Subject<{task: Task, action: string}>();

  constructor(private http: HttpClient) {}

  firebaseURL = 'https://taskit-cc808-default-rtdb.firebaseio.com/tasks.json'


  fetchTasksFromFirebase() {
    const myTaskSub = this.http
      .get(this.firebaseURL, {})
      .subscribe((res : Task[] | []) => {
        console.log(res);
        console.log('from fetch firebase', myTaskSub);

        this.saveTasks(res);
      })
  }

  getTasks() {
    return this.myTasks.slice();
  }

  saveTask(task: Task) {
    this.myTasks.push(task);
    const action: string = "Added"
    this.tasklistUpdated.next(this.myTasks.slice());
    this.taskUpdated.next({task, action});
    this.saveTasks(this.myTasks);
  }

  saveTasks(tasks: Task[] | []) {
    this.myTasks = tasks || [];
    this.tasklistUpdated.next(this.myTasks.slice());
    this.saveTasksToFirebase(this.myTasks);
  }

  removeTask(index: number) {
    if (index !== -1) {
      const task = this.myTasks[index];
      const action: string = "Removed"
      this.myTasks.splice(index, 1)
      this.tasklistUpdated.next(this.myTasks.slice());
      this.taskUpdated.next({task, action});
      this.saveTasksToFirebase(this.myTasks);
    }
  }

  updateTask(result: Task) {
    console.log('result from update task', result);
    const action: string = "Edited"

    const task = this.myTasks.find((task) => task.id == result.id)
    if(task) {
      task.title = result.title;
      task.dueDate = result.dueDate;
      task.priority = result.priority;
      task.status = result.status;
      task.desc = result.desc;
      this.tasklistUpdated.next(this.myTasks.slice());
      this.saveTasksToFirebase(this.myTasks);
    } else return
    this.taskUpdated.next({task, action});
  }

  completeTask(index: number) {
    const task: Task = this.myTasks[index];
    const action: string = 'Completed'
    task.status = Status.completed;
    this.taskUpdated.next({task, action});
  }

  saveTasksToFirebase(tasks) {
    this.http.put(this.firebaseURL, tasks).subscribe((results) => {
      console.log(results);

    });
  }
}
