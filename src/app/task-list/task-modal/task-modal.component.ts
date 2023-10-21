import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../task.model';
import { TasklistService } from '../tasklist.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {
  taskForm: FormGroup
  submitButtonText: string = 'Create'
  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    private tasklistService: TasklistService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.taskForm = this.formBuilder.group({
      title: ['Title', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      desc: ['Description'],
    });
  }
  ngOnInit(): void {
    if(this.data){
      this.submitButtonText = "Edit"

      this.taskForm.get("title").setValue(this.data.title);
      this.taskForm.get("dueDate").setValue(new Date(this.data.dueDate));
      this.taskForm.get("priority").setValue(this.data.priority);
      this.taskForm.get("status").setValue(this.data.status);
      this.taskForm.get("desc").setValue(this.data.desc);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreateTask() {
    console.log('this.taskform.value = ', this.taskForm.value);
    const nextId = this.generateId();
    const {title, dueDate, priority, status, desc} = this.taskForm.value
    const datePipe = new DatePipe('en-US');
    const formattedDueDate = datePipe.transform(dueDate, 'MM/dd/yyyy');
    console.log('nextid = ', nextId);

    const newTask = new Task(nextId, title, new Date(formattedDueDate), priority, status, desc);
    console.log('newTask = ', newTask);
    console.log('formattedDueDate = ',formattedDueDate);

    this.tasklistService.saveTask(newTask);
    this.dialogRef.close();
  }

  generateId(): number {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  
}
