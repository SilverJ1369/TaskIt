import { Component, OnInit} from '@angular/core';
import { Priority, Status, Task } from './task.model';
import { TasklistService } from './tasklist.service';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';

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
    });
  }

  editTask(index) {
    const tasksToEdit = this.tasklistService.getTasks();
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: tasksToEdit[index],
    })
    console.log(tasksToEdit[index]);

  }
}
