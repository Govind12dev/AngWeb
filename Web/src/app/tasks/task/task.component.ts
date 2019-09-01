import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatTableDataSource } from '@angular/material';
import { ProjectService } from 'src/app/shared/project.service';
import { ProjectListComponent } from 'src/app/projects/project-list/project-list.component';
import { ProjectModel } from 'src/app/shared/project.model';
import { User } from 'src/app/users/user.model';
import { TaskModel } from 'src/app/shared/task.model';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private service: TaskService,private projectService: ProjectService, private userService: UserService,
    private toastr: ToastrService) { }

    @Input() taskList: TaskListComponent;

    listProjectData: MatTableDataSource<any>;
    displayedProjectColumns: string[] = ['ProjectName', 'actions'];  
    searchProjectKey: string;

    listTaskData: MatTableDataSource<any>;
    displayedTaskColumns: string[] = ['TaskName', 'actions'];  
    searchTaskKey: string;

    listUserData: MatTableDataSource<any>;
    displayedUserColumns: string[] = ['FirstName', 'actions'];  
    searchUserKey: string;

    minDate: Date;
    IsParentTask:boolean;
    disableFields: boolean;

  ngOnInit() {
    this.resetForm();
    this.IsParentTask = false;
    this.disableFields = false;
    this.service.formData.StartDate = new Date();    
    this.minDate = this.service.formData.StartDate;
    this.service.formData.EndDate = new Date((new Date()).setDate(this.service.formData.StartDate.getDate() + 1));
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
    ProjectID: null, 
    ProjectName : null,
    TaskID : null,
    TaskName : null,
    IsParentTask: false,
    Priority : 0,
    ParentTask: null,
    ParentTaskID: null,
    StartDate : null,
    EndDate : null,
    UserID: null,
    UserName: null,   
    Status: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.TaskID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postTask(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Task. Register');
      this.resetForm(form);
      this.service.refreshList();  
    });
  }

  updateRecord(form: NgForm) {
    this.service.putTask(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Task. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  OnChangeStartDate(event: any){
    this.service.formData.EndDate = null; 
    this.minDate = event;  
  }

  searchProject()
  {
    this.projectService.getProjectList().subscribe(data =>{    
      this.listProjectData = new MatTableDataSource(data);
      });  
  }

searchTask()
  {
    this.service.getTaskList().subscribe(data =>{    
      this.listTaskData = new MatTableDataSource(data);
  });  
}

searchUser()
  {
    this.userService.getUserList().subscribe(data =>{    
      this.listUserData = new MatTableDataSource(data);
  });  
}

populateProjectValue(project : ProjectModel) { 
    console.log(project);   
    this.service.formData.ProjectName = project.ProjectName;
    this.service.formData.ProjectID = project.ProjectID;          
  }

  onSearchProjectClear() {
    this.searchProjectKey = "";
    this.applyProjectFilter();
  }

  applyProjectFilter() {
    this.listProjectData.filter = this.searchProjectKey.trim().toLowerCase();
  }

  populateTaskValue(task : TaskModel) { 
    console.log(task);   
    this.service.formData.ParentTask = task.TaskName;
    this.service.formData.ParentTaskID = task.TaskID;          
  }

  onSearchTaskClear() {
    this.searchTaskKey = "";
    this.applyTaskFilter();
  }

  applyTaskFilter() {
    this.listTaskData.filter = this.searchTaskKey.trim().toLowerCase();
  }

  populateUserValue(user : User) { 
    console.log(user);   
    this.service.formData.UserName = (user.FirstName +' '+ user.LastName);
    this.service.formData.UserID = user.UserID;          
  }

  onSearchUserClear() {
    this.searchUserKey = "";
    this.applyUserFilter();
  }

  applyUserFilter() {
    this.listUserData.filter = this.searchUserKey.trim().toLowerCase();
  }

}