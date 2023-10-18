import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../task.model';
import { TasklistService } from '../tasklist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  taskForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    private tasklistService: TasklistService,
    private formBuilder: FormBuilder,
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      desc: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateTask() {
    console.log(this.taskForm.value);
    const {title, dueDate, priority, status, desc} = this.taskForm.value
    const newTask = new Task(title, new Date(dueDate), priority, status, desc);

    this.tasklistService.saveTask(newTask);
    this.dialogRef.close();
  }
}
