import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/task-list/task.model';
import { TasklistService } from 'src/app/task-list/tasklist.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  private taskChangedSub: Subscription;
  public taskEdited: boolean = false;

  public notifyTask: Task;
  public taskAction: string;

  constructor(private tasklistService: TasklistService) {


  }

  ngOnInit(): void {
    this.taskChangedSub = this.tasklistService.taskUpdated.subscribe(data => {
      this.notifyTask = data.task;
      this.taskAction = data.action;
      this.taskEdited = true;
      setTimeout(() => {
        this.taskEdited = false;
      }, 4000);
      // alert(`You ${data.action}: ${data.task.title}`)
    });
  }

  ngOnDestroy(): void {
    this.taskChangedSub.unsubscribe();
  }

}
