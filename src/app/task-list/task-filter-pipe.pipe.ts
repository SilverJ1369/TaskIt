import { Pipe, PipeTransform } from '@angular/core';
import { Priority, Status, Task } from './task.model';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {


  transform(task: Task[], selectedStatus: Status, selectedPriority: Priority): any {
    console.log(selectedStatus);
    return task.filter((task) => {
      if (selectedStatus === null && selectedPriority === null) {
        return task;
      } else if (selectedStatus === null) {
        const priorityMatch = task.priority === selectedPriority;
        return priorityMatch;
      } else if (selectedPriority === null) {
        const statusMatch = task.status === selectedStatus;
        return statusMatch;
      } else {
        const priorityMatch = task.priority === selectedPriority;
        const statusMatch = task.status === selectedStatus;
        return priorityMatch && statusMatch;
      }
    })
  }

}
