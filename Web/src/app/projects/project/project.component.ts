import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProjectService } from 'src/app/shared/project.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { ProjectList1Component } from '../project-list1/project-list1.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private service: ProjectService,
    private toastr: ToastrService) { }

    @Input() projectList1: ProjectList1Component;

  ngOnInit() {
    this.resetForm();
  }

  @HostListener('id')
  click() {
    this.projectList1.refreshList();
  }

  // searchText;
  // Managers = [
  //   { id: 11, name: 'Mr. Nice', country: 'India' },
  //   { id: 12, name: 'Narco' , country: 'USA'},
  //   { id: 13, name: 'Bombasto' , country: 'UK'},
  //   { id: 14, name: 'Celeritas' , country: 'Canada' },
  //   { id: 15, name: 'Magneta' , country: 'Russia'},
  //   { id: 16, name: 'RubberMan' , country: 'China'},
  //   { id: 17, name: 'Dynama' , country: 'Germany'},
  //   { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
  //   { id: 19, name: 'Magma' , country: 'South Africa'},
  //   { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  // ];
  
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      ProjectID: null,
      ProjectName: '',
      StartDate:null ,
      EndDate:null ,
      Priority: null
    }
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
}
