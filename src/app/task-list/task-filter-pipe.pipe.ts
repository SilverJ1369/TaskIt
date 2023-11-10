import { Pipe, PipeTransform } from '@angular/core';
import { Priority, Status, Task } from './task.model';
import { filter } from 'rxjs';

@Pipe({
  name: 'taskFilter'
})
export class TaskFilterPipe implements PipeTransform {


  transform(task: Task[], selectedStatus: Status, selectedPriority: Priority, selectedDate: Date): any {
    console.log(selectedDate);
    return task.filter((task) => {
      let filterDate: Date = new Date(task.dueDate);
      let today: Date = new Date();
      if (selectedStatus === null && selectedPriority === null && selectedDate === null) {
        console.log('first if');
        return task;
       } else if (selectedStatus === null && selectedPriority === null) {
        const dateMatch = filterDate <= selectedDate && filterDate.getDate() >= today.getDate();
        console.log('second if', typeof filterDate, dateMatch);
        return dateMatch;
       } else if (selectedStatus === null && selectedDate === null) {
        const priorityMatch = task.priority === selectedPriority;
        console.log('third if');
        console.log(selectedDate);
        const dateMatch = task.dueDate == selectedDate;
        return priorityMatch && dateMatch;
      } else if (selectedPriority === null && selectedDate === null) {
        const statusMatch = task.status === selectedStatus;
        console.log('fourth if');
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
        console.log('last else');
        return priorityMatch && statusMatch && dateMatch;
      }
    })
  }

}
