import { Component } from '@angular/core';
import { TasklistService } from '../tasklist.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {


  constructor(private tasklistService: TasklistService) {}
}
