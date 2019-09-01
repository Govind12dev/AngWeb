import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { ProjectService } from 'src/app/shared/project.service';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { ProjectModel } from 'src/app/shared/project.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-list1',
  templateUrl: './project-list1.component.html',
  styleUrls: ['./project-list1.component.css']
})
export class ProjectList1Component implements OnInit {

  constructor(private service: ProjectService,
    private toastr: ToastrService) { } 
    

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['ProjectName', 'StartDate', 'EndDate', 'Priority',
  'NumberOfTasks','Status','actions'];
  @ViewChild(MatSort,null) sort: MatSort;
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
  searchKey: string;

  @HostBinding('id')   
  isOpen = false;
  
  ngOnInit() { 
    this.service.refreshList(); 
    this.subscribeToList();
        //this.listData = new MatTableDataSource(array);        
        // this.listData.filterPredicate = (data, filter) => {
        //    return this.displayedColumns.some(ele => {
        //      return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        //    });
        // };      
  }

  onEdit(row : ProjectModel) {    
    this.service.formData = Object.assign({}, row);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to suspend this record?')) {
      this.service.deleteProject(id).subscribe(res => {
        this.subscribeToList();        
        this.toastr.warning('Suspended successfully', 'Project');
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

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}