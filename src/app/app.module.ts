import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormModalComponent } from './shared/form-modal/form-modal.component';
import { TaskModalComponent } from './task-list/task-modal/task-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';
import { DeleteModalComponent } from './task-list/delete-modal/delete-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TaskListComponent,
    FormModalComponent,
    TaskModalComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    NgIf,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
