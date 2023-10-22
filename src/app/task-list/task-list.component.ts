import { Component, OnInit} from '@angular/core';
import { Priority, Status, Task } from './task.model';
import { TasklistService } from './tasklist.service';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import Swal from 'sweetalert2';

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

      this.tasklistService.tasklistUpdated.subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      })
  }

  onRemoveTask(index) {
    this.onDelete(index);
  }

  openModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
    });
  }

  editTask(index) {
    const tasksToEdit = this.tasklistService.getTasks();
    const dialogRef = this.dialog.open(TaskModalComponent, {
      // data: tasksToEdit[index],
      data: {
        id: tasksToEdit[index].id,
        title: tasksToEdit[index].title,
        dueDate: tasksToEdit[index].dueDate,
        priority: tasksToEdit[index].priority,
        status: tasksToEdit[index].status,
        desc: tasksToEdit[index].desc
      }
    })
    console.log('from edit task',tasksToEdit[index]);
    console.log('data', dialogRef);


  }

  onDelete(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        {
          this.tasklistService.removeTask(index);
        };
        // push the new changes
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  }
}
