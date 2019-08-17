import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/project.service';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/shared/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private service: ProjectService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(proj : Project) {
    this.service.formData = Object.assign({}, proj);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteProject(id).subscribe(res => {
        this.service.refreshList();
        this.toastr.warning('Deleted successfully', 'Project. Register');
      });
    }
  }

}
