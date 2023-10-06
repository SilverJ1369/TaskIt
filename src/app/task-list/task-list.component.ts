import { Component } from '@angular/core';
import { Task } from './task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [
    new Task('Test task', new Date(), 'low', 'todo'),
    new Task('Test task', new Date(), 'low', 'todo')
  ];

}
