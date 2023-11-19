import { TaskListComponent } from "./task-list/task-list.component";
import { KanbanBoardComponent } from "./kanban-board/kanban-board.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AuthGuard } from "./shared/auth.guard";
import { BoredComponent } from "./bored/bored.component";

const appRoutes: Routes = [
  { path: "", redirectTo: "/landing-page", pathMatch: "full" },
  { path: "landing-page", component: LandingPageComponent },
  { path: "tasklist", component: TaskListComponent, canActivate: [AuthGuard] },
  { path: "kanban", component: KanbanBoardComponent, canActivate: [AuthGuard]},
  { path: "bored", component: BoredComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
