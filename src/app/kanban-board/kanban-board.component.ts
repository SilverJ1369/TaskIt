import { Component, OnInit } from '@angular/core';
import { TasklistService } from '../task-list/tasklist.service';
import { Task, Priority, Status } from '../task-list/task.model';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasklistService: TasklistService) {

  }

  ngOnInit(): void {
    this.tasks = this.tasklistService.getTasks()
      this.tasklistService.tasklistUpdated.subscribe((tasks) => {
        this.tasks = tasks;
        console.log(tasks);

      });
    }

  onSave(id: number, status) {
    const newStatus = status
    console.log('status', status);

    const task = this.tasks.find((task) => task.id === id)
    console.log('the lookup', task);
    this.tasklistService.updateTask(task, newStatus);

  }
}
