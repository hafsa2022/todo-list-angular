import { Task } from './../models/task';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/tasks';
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl + '/' + task.id, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.baseUrl + '/' + task.id);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
}
