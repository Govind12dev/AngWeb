import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from 'src/app/shared/task.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private service: TaskService,
    private toastr: ToastrService) { }

    @Input() taskList: TaskListComponent;

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      TaskID:null,
      ParentID:null,
      ProjectID: null,
      TaskName: null,
      StartDate:null ,
      EndDate:null ,
      Priority: null,
      Status:null
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
      //this.service.getProjectList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putTask(form.value).subscribe(res => {
      this.toastr.info('Updated successfully', 'Task. Register');
      this.resetForm(form);
      this.service.refreshList();
      //this.service.getProjectList();
    });
  }

}
