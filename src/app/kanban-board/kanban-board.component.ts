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

      });
    }

  onSave(id: number, status: Status) {
    const newStatus = status
    const task = this.tasks.find((task) => task.id === id)
    this.tasklistService.updateTask(task);

  }

  drag(event) {
    event.dataTransfer.setData("text", event.target.id);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event, status) {
    console.log('dropped');

    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const task = this.tasks.find((task) => task.id === +id);
    task.status = status;
    this.tasklistService.updateTask(task);
    event.target.appendChild(document.getElementById(id));
  }
}
