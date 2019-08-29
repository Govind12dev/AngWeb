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

    //@ViewChild('searchModal',null) searchModal: ElementRef;
    //projectManager:string;

    listData: MatTableDataSource<any>;
    displayedColumns: string[] = ['FirstName', 'actions'];  
    searchKey: string;
    

  ngOnInit() {
    this.resetForm();    
    this.IsChecked = true;
    this.service.formData.StartDate = new Date();    
    this.minDate = this.service.formData.StartDate;
    this.service.formData.EndDate = new Date((new Date()).setDate(this.service.formData.StartDate.getDate() + 1));   
    //this.projectManager = null;    
  }

  //@HostListener('id')
  //click() {
    //this.projectList1.refreshList();
  //}

  
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      ProjectID: null,
      ProjectName: '',
      StartDate:null ,
      EndDate:null ,
      Priority: 0,
      //IsChecked:null, 
      ProjectManager:null,
      UserID:null ,
      NumberOfTasks: 0,
      Status: null   
    }
    this.IsChecked=false;  
    //this.projectManager = null;  
  }

  

  onSubmit(form: NgForm) {
    //this.isValidDate = this.validateDates(this.service.formData.StartDate.toDateString(), this.service.formData.EndDate.toDateString());
    //if(this.isValidDate)
    //{
      if (form.value.ProjectID == null)    
        this.insertRecord(form);
      else
        this.updateRecord(form);
    //}
  }

  insertRecord(form: NgForm) {
    this.service.postProject(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'Project. Register');
      this.resetForm(form);
      this.service.refreshList();
      //this.click();
      //this.service.getProjectList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putProject(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Project. Register');
      this.resetForm(form);
      this.service.refreshList();
      //this.service.getProjectList();
    });
  }

  OnChangeStartDate(event: any){
    this.service.formData.EndDate = null; 
    this.minDate = event;  
  }

  OnCheckBoxChange(event: any)
  {
    // if(event)
    // {
    //   this.service.formData.StartDate = new Date();    
    //   this.minDate = this.service.formData.StartDate;
    //   this.service.formData.EndDate = new Date((new Date()).setDate(this.service.formData.StartDate.getDate() + 1));   
    // }
    // else{
    //   this.service.formData.StartDate = null;
    //   this.service.formData.EndDate = null; 
    // }
  }

  validateDates(sDate:string , eDate: string){
    this.isValidDate = true;
    // if((sDate == null || eDate ==null)){
    //   this.error={isError:true,errorMessage:'Start date and end date are required.'};
    //   this.isValidDate = false;
    // }
    if((sDate != null && eDate !=null) && (eDate) < (sDate)){
      //this.error={isError:true,errorMessage:'End date should be grater then start date.'};
      this.isValidDate = false;
    }    
    return this.isValidDate;
  }

  searchManager()
  {
    this.userService.getUserList().subscribe(data =>{    
      this.listData = new MatTableDataSource(data);
      //users => { this.managerList = users} )
    //console.log(this.managerList);
  });
  console.log(this.listData);
}

  populateForm(user : User) { 
    console.log(user);   
    this.service.formData.ProjectManager = (user.FirstName+' '+ user.LastName);
    this.service.formData.UserID = user.UserID; 
    //this.modal.hide();       
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}