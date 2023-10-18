export enum Priority{
  low = 'Low',
  medium = 'Medium',
  high = 'High'
}

export enum Status {
  todo = 'Todo',
  inProgress = 'In-Progress',
  completed = 'Completed',
}
export class Task {
  public title: string;
  public dueDate: Date;
  public priority: Priority;
  public status: Status;
  public desc?: string;

  constructor(title: string, dueDate: Date, priority: Priority, status: Status, desc?: string) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.desc = desc;
  }
}
