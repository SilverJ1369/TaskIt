export enum Priority{
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export enum Status {
  todo = 'todo',
  inProgress = 'inprogress',
  completed = 'completed',
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
