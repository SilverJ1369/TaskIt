export class Task {
  public title: string;
  public dueDate: Date;
  public priority: string;
  public status: string;

  constructor(title: string, dueDate:Date, priority:string, status:string) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }
}
