import { TaskListComponent } from "./task-list/task-list.component";
import { KanbanBoardComponent } from "./kanban-board/kanban-board.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/landing-page", pathMatch: "full" },
  { path: "landing-page", component: LandingPageComponent },
  { path: "tasklist", component: TaskListComponent },
  { path: "kanban", component: KanbanBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
