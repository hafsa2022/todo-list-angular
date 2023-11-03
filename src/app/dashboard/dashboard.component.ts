import { TaskService } from './../services/task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from './../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.taskService.getTasks().subscribe(
      (res) => {
        this.taskArr = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addTask() {
    this.taskObj.taskName = this.addTaskValue;
    this.taskService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();

        this.addTaskValue = '';
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editTask() {
    this.taskObj.taskName = this.editTaskValue;
    this.taskService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();

        this.editTaskValue = '';
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskObj).subscribe((res) => {
      this.ngOnInit();
    });
  }

  call(editTask: Task) {
    this.taskObj = editTask;
    this.editTaskValue = editTask.taskName;
  }

  call2(deleteTask: Task) {
    this.taskObj = deleteTask;
  }
}
