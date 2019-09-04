import { Injectable } from '@angular/core';
import { ProjectModel } from './project.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  formData  : ProjectModel;
  list$ : BehaviorSubject<any>= new BehaviorSubject([]);
  readonly rootURL ="http://localhost/api/api"

  constructor(private http: HttpClient) { }

  postProject(formData : ProjectModel){
    console.log(formData);  
    return this.http.post(this.rootURL+'/Project',formData);     
   }

   getProjectList(): Observable<ProjectModel[]>{
     return this.http.get<ProjectModel[]>(this.rootURL+'/Project/');
   }
 
   refreshList(){
     return this.http.get(this.rootURL+'/Project')
     .toPromise().then(res => this.list$.next(res));
    }
 
    putProject(formData : ProjectModel){
     return this.http.put(this.rootURL+'/Project/'+formData.ProjectID,formData);      
     }
 
    deleteProject(id : number){
     return this.http.delete(this.rootURL+'/Project/'+id);
     }
  }