import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProjectService } from 'src/app/shared/project.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm} from '@angular/forms';
import { ProjectList1Component } from '../project-list1/project-list1.component';
import { ProjectModel } from 'src/app/shared/project.model';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/users/user.service';
import { User } from 'src/app/users/user.model';
import { DOCUMENT } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private service: ProjectService,
    private toastr: ToastrService, private userService: UserService) { }

    @Input() projectList1: ProjectList1Component; 
    isValidDate: any;
    error:any={isError:false,errorMessage:''};
    minDate: Date;
    IsChecked:boolean;
    managerList: User[];   

    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['FirstName', 'actions'];  
    searchKey: string;    

  ngOnInit() {
    this.resetForm();    
    this.IsChecked = true;
    this.service.formData.StartDate = new Date();    
    this.minDate = this.service.formData.StartDate;
    this.service.formData.EndDate = new Date((new Date()).setDate(this.service.formData.StartDate.getDate() + 1));   
    }  
  
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      ProjectID: null,
      ProjectName: '',
      StartDate:null ,
      EndDate:null ,
      Priority: 0,      
      ProjectManager:null,
      UserID:null ,
      NumberOfTasks: 0,
      Status: null   
    }
    this.IsChecked=false;       
  }  

  onSubmit(form: NgForm) {    
      if (form.value.ProjectID == null)    
        this.insertRecord(form);
      else
        this.updateRecord(form);
   }

  insertRecord(form: NgForm) {
    this.service.postProject(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Project. Register');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putProject(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Project. Register');
      this.resetForm(form);
      this.service.refreshList();      
    });
  }

  OnChangeStartDate(event: any){
    this.service.formData.EndDate = null; 
    this.minDate = event;  
  }

  OnCheckBoxChange(event: any)
  {
  }

  validateDates(sDate:string , eDate: string){
    this.isValidDate = true;    
    if((sDate != null && eDate !=null) && (eDate) < (sDate)){      
      this.isValidDate = false;
    }    
    return this.isValidDate;
  }

  searchManager()
  {
    this.userService.getUserList().subscribe(data =>{    
      this.listData = new MatTableDataSource(data);      
  });  
}

  populateForm(user : User) {      
    this.service.formData.ProjectManager = (user.FirstName+' '+ user.LastName);
    this.service.formData.UserID = user.UserID;           
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}