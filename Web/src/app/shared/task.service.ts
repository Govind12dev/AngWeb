import { Injectable } from '@angular/core';
import {TaskModel} from './task.model';
import { HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  formData : TaskModel;
  list$: BehaviorSubject<any>=new BehaviorSubject([]);
  readonly rootURL ="http://localhost/api/api"

  constructor(private http: HttpClient) { }

  postTask(formData : TaskModel){
    return this.http.post(this.rootURL+'/Task',formData);     
   }

   getTaskList(): Observable<TaskModel[]>{
     return this.http.get<TaskModel[]>(this.rootURL+'/Task/');
   }

   getTaskListByProject(id : number): Observable<TaskModel[]>
   {
    return this.http.get<TaskModel[]>(this.rootURL+'/Task/'+id);
  }
 
   refreshList(){
     return this.http.get(this.rootURL+'/Task')
     .toPromise().then(res => this.list$.next(res));
    }
 
    putTask(formData : TaskModel){
     return this.http.put(this.rootURL+'/Task/'+formData.TaskID,formData);      
     }
 
    deleteTask(id : number){
     return this.http.delete(this.rootURL+'/Task/'+id);
     }
}