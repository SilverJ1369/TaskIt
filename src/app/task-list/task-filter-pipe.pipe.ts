import { Pipe, PipeTransform } from '@angular/core';
import { Priority, Status, Task } from './task.model';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {

  transform(task: Task[], selectedStatus: Status, selectedPriority: Priority, selectedDate: Date): any {
    return task.filter((task) => {
      let filterDate: Date = new Date(task.dueDate);
      let today: Date = new Date();
      if (selectedStatus === null && selectedPriority === null && selectedDate === null) {
        return task;
       } else if (selectedStatus === null && selectedPriority === null) {
        const dateMatch = filterDate <= selectedDate && filterDate.getDate() >= today.getDate();
        return dateMatch;
       } else if (selectedStatus === null && selectedDate === null) {
        const priorityMatch = task.priority === selectedPriority;
        return priorityMatch
      } else if (selectedPriority === null && selectedDate === null) {
        const statusMatch = task.status === selectedStatus;
        return statusMatch;
      } else if (selectedPriority === null) {
        const statusMatch = task.status === selectedStatus;
        const dateMatch = filterDate <= selectedDate && filterDate.getDate() >= today.getDate();
        return statusMatch && dateMatch;
      }else if (selectedStatus === null) {
        const priorityMatch = task.priority === selectedPriority;
        const dateMatch = filterDate <= selectedDate && filterDate.getDate() >= today.getDate();
        return priorityMatch && dateMatch;
      }else if (selectedDate === null) {
        const priorityMatch = task.priority === selectedPriority;
        const statusMatch = task.status === selectedStatus;
        return priorityMatch && statusMatch;
      }else {
        const priorityMatch = task.priority === selectedPriority;
        const statusMatch = task.status === selectedStatus;
        const dateMatch = filterDate <= selectedDate && filterDate.getDate() >= today.getDate();
        return priorityMatch && statusMatch && dateMatch;
      }
    })
  }

}
