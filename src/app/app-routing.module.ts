import { TaskListComponent } from "./task-list/task-list.component";
import { KanbanBoardComponent } from "./kanban-board/kanban-board.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: "", redirectTo: "/tasklist", pathMatch: "full" },
  { path: "tasklist", component: TaskListComponent },
  { path: "kanban", component: KanbanBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
