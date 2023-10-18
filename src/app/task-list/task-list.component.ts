import { Component, OnInit} from '@angular/core';
import { Task } from './task.model';
import { TasklistService } from './tasklist.service';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private tasklistService: TasklistService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
      this.tasks = this.tasklistService.getTasks();

      this.tasklistService.tasklistChanged.subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      })
  }

  onRemoveTask(index) {
    this.tasklistService.removeTask(index);
  }

  openModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: Task,
    });

    // dialogRef.afterClosed().subscribe(task => {
    //   if (task) {
    //     this.tasklistService.saveTask(task);
    //   } else {
    //     alert('No task bro!');
    //   }

    // });
  }

}
