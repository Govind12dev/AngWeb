import { Injectable } from '@angular/core';
import {User} from './user.model';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formData : User;
  list: User[];
  readonly rootURL ="http://localhost:49470/api"

  constructor(private http: HttpClient) { }

  postUser(formData : User){
    return this.http.post(this.rootURL+'/User',formData);     
   }

   getUserList(): Observable<User[]>{
     return this.http.get<User[]>(this.rootURL+'/User/');
   }   
 
   refreshList(){
     return this.http.get(this.rootURL+'/User')
     .toPromise().then(res => this.list = res as User[]);
    }
 
    putUser(formData : User){
     return this.http.put(this.rootURL+'/User/'+formData.UserID,formData);      
     }
 
    deleteUser(id : number){
     return this.http.delete(this.rootURL+'/User/'+id);
     }
}