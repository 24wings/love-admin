import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  fields = [{
    label: '用户名',
    value: 'name'
  }, {
    label: '手机号',
    value: 'phone'
  }, {
    label: '性别',
    value: 'gender'
  }, {
    label: '年龄',
    value: 'age'
  }, {
    label: '状态',
    value: 'state'
  }];
  users: any = [];
  constructor(public http: Http) {

    this.refershTable();

  }

  deleteUser(_id: String) {
    this.http.delete('http://localhost:3000/rest.player?_id=' + _id).subscribe(rtn => {
      const result = rtn.json();

      if (result.issuccess) {
        this.refershTable();
      } else {
        alert(result.data);
      }
    })

  }

  ngOnInit() {

  }

  refershTable() {
    this.http.get('http://localhost:3000/rest.player').subscribe(rtn => {
      const result = rtn.json();
      if (result.issuccess) {
        this.users = result.data;
      } else {
        alert(result.data);
      }

    });
  }
}