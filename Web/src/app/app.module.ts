import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material/material.module";
import {RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeeService } from './shared/employee.service';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskService } from './shared/task.service';
import { MenuComponent } from './menu/menu.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { ProjectListComponent } from './projects/project-list/project-list.component'
import { ProjectService } from './shared/project.service';
import { ProjectList1Component } from './projects/project-list1/project-list1.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserService } from './users/user.service';


const appRoutes: Routes =[
  {path:'addProject',component : ProjectsComponent },
   {path:'addTask',component : TasksComponent},
  {path:'addUser',component : UsersComponent},
  {path:'viewTask',component : TaskListComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    TasksComponent,
    TaskComponent,
    TaskListComponent,
    MenuComponent,
    ProjectComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectList1Component,
    UsersComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [EmployeeService, TaskService, ProjectService,DatePipe,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
