    
import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { TaskModel } from 'src/app/shared/task.model';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/shared/project.service';
import {ProjectModel} from 'src/app/shared/project.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private service: TaskService, private projectService: ProjectService,
    private toastr: ToastrService) { }

    
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['TaskName','ParentTask',  'Priority','StartDate', 'EndDate','actions'];
  @ViewChild(MatSort,null) sort: MatSort;
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
  searchKey: string;
  filterProjectId: number;

  listProjectData: MatTableDataSource<any>;
  displayedProjectColumns: string[] = ['ProjectName', 'actions'];  
  searchProjectKey: string;

  ngOnInit() {
    this.service.refreshList();
    this.subscribeToList();              
        // this.listData.filterPredicate = (data, filter) => {
        //    return this.displayedColumns.some(ele => {
        //      return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        //    });
        // };    
  }

  onEdit(row : TaskModel) {    
    this.service.formData = Object.assign({}, row);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to complete this record?')) {
      this.service.deleteTask(id).subscribe(res => {
        this.subscribeToList();        
        this.toastr.warning('Completed successfully', 'Task. Register');
      });
    }
  }

  subscribeToList(){
    this.service.list$.subscribe(data =>{    
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  refreshTaskList(){
    this.service.getTaskListByProject(this.filterProjectId).subscribe(data =>{    
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  searchProject()
  {
    this.projectService.getProjectList().subscribe(data =>{    
      this.listProjectData = new MatTableDataSource(data);
      });  
  }

  populateProjectValue(project : ProjectModel) {     
    this.searchKey = project.ProjectName;
    this.filterProjectId = project.ProjectID;
    this.refreshTaskList();
  }

  onSearchProjectClear() {
    this.searchProjectKey = "";
    this.applyProjectFilter();
  }

  applyProjectFilter() {
    this.listProjectData.filter = this.searchProjectKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}