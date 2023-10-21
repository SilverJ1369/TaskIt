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
  public id: number;
  public title: string;
  public dueDate: Date;
  public priority: Priority;
  public status: Status;
  public desc?: string;

  constructor(id: number, title: string, dueDate: Date, priority: Priority, status: Status, desc?: string) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.desc = desc;
  }
}
