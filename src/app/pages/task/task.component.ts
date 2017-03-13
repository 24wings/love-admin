import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Http } from '@angular/http';
import { AppConfigService } from '../../services';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild('childModal') public childModal: ModalDirective;
  @ViewChild('editModal') public editModal: ModalDirective;
  tasks = [];
  editTask = {};
  newTask = {
    time: this.tasks.length,
    title: '任务标题',
    description: '任务的内容',
    isFinish: false
  };
  isEditing: boolean = true;
  constructor(public http: Http, public appConfig: AppConfigService) {

    this.refershTable();
  }

  ngOnInit() {

  }

  addTask() {
    console.log(this.newTask);
    this.http.post(this.appConfig.serverIp + 'rest.task', this.newTask).subscribe(rtn => {
      const result = rtn.json();
      if (result.issuccess) {
        this.refershTable();
      } else {
        alert(result.data);
      }
    });
  }

  showEditTaskModal(task) {
    this.editTask = task;
    this.editModal.show();

  }
  hideEditTaskModal() {

    this.editModal.hide();
    this.editTask = null;

  }


  showAddTaskModal() {
    this.childModal.show();
  }
  hideAddTaskModal() {
    this.childModal.hide();
  }
  refershTable() {
    this.http.get(this.appConfig.serverIp + 'rest.task').subscribe(rtn => {
      const result = rtn.json();
      if (result.issuccess) {
        console.log(result);
        this.tasks = result.data;

      } else {
        alert(result.data);
      }
    });
  }

  changeNewDay(num: number) {
    this.newTask.time = num;
  }
  changeEditDay(num: number) {
    this.editTask['time'] = num;
  }

  deleteTask(task: any) {
    this.http.delete(this.appConfig.serverIp + 'rest.task?_id=' + task._id).subscribe(rtn => {
      const result = rtn.json();
      if (result.issuccess) {
        console.log(result);
        this.refershTable();
      } else {
        alert(result.data);
      }
    });
  }

  updateTask(task) {
    this.http.put(this.appConfig.serverIp + 'rest.task?_id=' + this.editTask['_id'], this.editTask)
      .subscribe(rtn => {
        const result = rtn.json();
        if (result.issuccess) {
          console.log(result);
          this.refershTable();
        } else {
          alert(result.data);
        }
      });

  }
}
