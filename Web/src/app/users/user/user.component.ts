import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/users/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: UserService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      UserID:null,
      TaskID:null,
      EmployeeID:null,
      ProjectID: null,
      FirstName: null,
      LastName:null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value.UserID == null)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postUser(form.value).subscribe(res => {
      this.toastr.success('Inserted successfully', 'User. Register');
      this.resetForm(form);
      this.service.refreshList();      
      //this.service.getProjectList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putUser(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'User. Register');
      this.resetForm(form);
      this.service.refreshList();
      //this.service.getProjectList();
    });
  }

}