import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TasklistService } from './tasklist.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasklistService: TasklistService) {}

  ngOnInit(): void {
      this.tasks = this.tasklistService.getTasks();

      this.tasklistService.tasklistChanged.subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      })
  }

  onRemoveTask(index) {
    this.tasklistService.removeTask(index);
  }
}
