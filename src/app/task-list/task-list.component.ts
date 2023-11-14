import { Component, OnInit} from '@angular/core';
import { Priority, Status, Task } from './task.model';
import { TasklistService } from './tasklist.service';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  selectedStatus: Status = null;
  currentStatus: typeof Status = Status;
  selectedPriority : Priority = null;
  currentPriority: typeof Priority = Priority;
  selectedDate: Date = new Date();
  currentDate: Date = new Date(this.selectedDate.setDate(this.selectedDate.getDate()))
  currentWeek: Date = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 7))
  currentMonth: Date = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 30))
  currentQuarter: Date = new Date(this.selectedDate.setDate(this.selectedDate.getDate() + 90))

  constructor(
    private tasklistService: TasklistService,
    public dialog: MatDialog,) {}

  ngOnInit(): void {

      this.selectedDate = null;
      this.tasklistService.fetchTasksFromFirebase().subscribe({
        next: (tasks) => {
          this.tasks = tasks;

          const taskCheck = tasks.length > 0;
          if (!taskCheck) {
            this.tasklistService.buildTasks();
          }
        }
      });

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

  completeTask(index: number) {
    this.tasklistService.completeTask(index);
  }

  openBuildTasks() {
    this.tasklistService.buildTasks();
  }

}
