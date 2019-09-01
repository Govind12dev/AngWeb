import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';
import { User } from 'src/app/users/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private service: UserService,
    private toastr: ToastrService) { }

    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['EmployeeID','FirstName', 'LastName','actions'];
    @ViewChild(MatSort,null) sort: MatSort;
    @ViewChild(MatPaginator,null) paginator: MatPaginator;
    searchKey: string;

  ngOnInit() {    
    this.service.refreshList(); 
    this.subscribeToList();              
        // this.listData.filterPredicate = (data, filter) => {
        //    return this.displayedColumns.some(ele => {
        //      return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        //    });
        // };    
  }

  onEdit(row : User) {    
    this.service.formData = Object.assign({}, row);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteUser(id).subscribe(res => {
        this.subscribeToList();        
        this.toastr.warning('Deleted successfully', 'User. Register');
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