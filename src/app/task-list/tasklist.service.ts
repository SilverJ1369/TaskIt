import { Injectable } from '@angular/core';
import { Task, Status } from './task.model';
import { Subject, exhaustMap, map, take, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../landing-page/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasklistService {
  private myTasks: Task[] = [];

  tasklistUpdated: Subject<Task[]> = new Subject<Task[]>();
  taskUpdated: Subject<{task: Task, action: string}> = new Subject<{task: Task, action: string}>();

  constructor(private http: HttpClient, private authService: AuthService) {}

  firebaseURL = 'https://taskit-cc808-default-rtdb.firebaseio.com/tasks.json';
  taskGeneratorAPIURL = 'https://retoolapi.dev/T7m4GO/data';

  fetchTasksFromFirebase() {
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http
      .get<Task[]>(this.firebaseURL, {
        params: new HttpParams().set('auth', user.token),
      })
      .pipe(
        tap((tasks) => {
          this.myTasks = tasks;
        }),
      )
      })
    )
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

  completeTask(id: number) {
    const task: Task = this.myTasks.find((task) => task.id == id);
    const action: string = 'Completed'
    task.status = Status.completed;
    this.taskUpdated.next({task, action});
  }

  saveTasksToFirebase(tasks) {
    this.http.put(this.firebaseURL, tasks).subscribe();
  }

  buildTasks() {
    const myTaskSub = this.http
      .get(this.taskGeneratorAPIURL, {})
      .subscribe((res : Task[] | []) => {

        this.saveTasks(res);
      })
  }
}
