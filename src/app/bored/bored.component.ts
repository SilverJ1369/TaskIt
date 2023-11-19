import { Component, OnInit } from '@angular/core';
import { BoredService } from './bored.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-list/task-modal/task-modal.component';



@Component({
  selector: 'app-bored',
  templateUrl: './bored.component.html',
  styleUrls: ['./bored.component.css']
})
export class BoredComponent implements OnInit{

  sugTask: boolean = false;
  sugTaskTitle: string = '';


  constructor(private boredService: BoredService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.genButtonText = 'Generate Task';
  }

  genButtonText: string = 'Generate Task';

  generateTask() {
    this.sugTask = true;
    this.boredService.generateTask().subscribe({
      next: (data) => {
        this.sugTaskTitle = data.activity;
      }
    });
    this.genButtonText = 'Regenerate Task';
  }

  addBoredTask(title: string) {
    this.sugTask = false;
    const dialogRef = this.dialog.open(TaskModalComponent, {

      data: {
        title: title,
      }
    })
  }

}
