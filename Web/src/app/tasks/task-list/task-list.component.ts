import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { Task } from 'src/app/shared/task.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private service: TaskService,
    private toastr: ToastrService) { }

    
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['TaskID','TaskName', 'StartDate', 'EndDate', 'Priority','actions'];
  @ViewChild(MatSort,null) sort: MatSort;
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.refreshList();               
        this.listData.filterPredicate = (data, filter) => {
           return this.displayedColumns.some(ele => {
             return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
           });
        };    
  }

  onEdit(row : Task) {    
    this.service.formData = Object.assign({}, row);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteTask(id).subscribe(res => {
        this.refreshList();        
        this.toastr.warning('Deleted successfully', 'Project. Register');
      });
    }
  }

  refreshList(){
    this.service.getTaskList().subscribe(data =>{    
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
