import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../task.model';
import { TasklistService } from '../tasklist.service';


@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    private tasklistService: TasklistService,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateTask(task) {
    this.tasklistService.saveTask(task);
  }
}
