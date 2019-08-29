export class TaskModel {
    ProjectID: number;  
    ProjectName : string; 
    TaskID : number; 
    TaskName : string;
    IsParentTask: boolean;
    Priority : number;
    ParentTask: string;
    ParentTaskID: number;
    StartDate : Date;
    EndDate : Date;
    UserID: number;
    UserName: string;    
    Status: string;    
}