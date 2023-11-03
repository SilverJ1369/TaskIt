import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/task-list/task.model';
import { TasklistService } from 'src/app/task-list/tasklist.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  firebaseRootURL = 'https://taskit-cc808-default-rtdb.firebaseio.com/tasks.json';

  constructor(
    private httpClient: HttpClient,
    private tasklistService: TasklistService) { }

    saveTasksToFirebase() {
      const tasks = this.tasklistService.getTasks();

      this.httpClient.put(this.firebaseRootURL, tasks)
        .subscribe(res => {
          console.log("Firebase DB Response: ", res);

        })
    }

    fetchTasksFromFirebase() {
      return this.httpClient
        .get(this.firebaseRootURL, {})
        .subscribe((res : Task[] | []) => {
          this.tasklistService.saveTasks(res);
        })
    }
}
