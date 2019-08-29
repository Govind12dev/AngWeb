import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  formData  : Project;
  list : Project[];
  readonly rootURL ="http://localhost:49470/api"
  

  constructor(private http: HttpClient) { }

  postProject(formData : Project){
    return this.http.post(this.rootURL+'/Project',formData);
     
   }

   getProjectList(): Observable<Project[]>{
     return this.http.get<Project[]>(this.rootURL+'/Project/');
   }
 
   refreshList(){
     return this.http.get(this.rootURL+'/Project')
     .toPromise().then(res => this.list = res as Project[]);
    }
 
    putProject(formData : Project){
     return this.http.put(this.rootURL+'/Project/'+formData.ProjectID,formData);      
     }
 
    deleteProject(id : number){
     return this.http.delete(this.rootURL+'/Project/'+id);
     }
  }
