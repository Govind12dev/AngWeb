import { Injectable } from '@angular/core';
import {Task} from './task.model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  formData : Task;
  list: Task[];
  readonly rootURL ="http://localhost:59782/api"

  constructor(private http: HttpClient) { }

  postTask(formData : Task){
    return this.http.post(this.rootURL+'/Task',formData);     
   }

   getTaskList(): Observable<Task[]>{
     return this.http.get<Task[]>(this.rootURL+'/Task/');
   }
 
   refreshList(){
     return this.http.get(this.rootURL+'/Task')
     .toPromise().then(res => this.list = res as Task[]);
    }
 
    putTask(formData : Task){
     return this.http.put(this.rootURL+'/Task/'+formData.TaskID,formData);      
     }
 
    deleteTask(id : number){
     return this.http.delete(this.rootURL+'/Task/'+id);
     }
}
