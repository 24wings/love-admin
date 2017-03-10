import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import 'rxjs/add/operator/map';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  oldUser = {};
  user = {
    name: '',
    phone: '',
    password: '',
    age: 18,
    anwsers: [],
    creatDt: '',
    filterAge: { label: '', value: '' },
    filterCity: { label: '', value: '' },
    filterGender: { label: '', value: '' },
    gender: '',
    height: 175,
    tags: [{
      tagName: '',
      results: [''],
      options: ['']
    }]
  };
  fields: any[] = [{
    type: 'Input',
    label: '用户名',
    property: 'name'
  }];


  constructor(public http: Http, public router: Router, public route: ActivatedRoute) {
    this.route.params.map(params => params['_id']).subscribe(_id => {
      this.refershForm(_id);
    });
  }
  pushResult(tag, result) {
    if (tag.result.indexOf(result) === -1) {
      tag.result.push(result);
    }

  }
  removeResult(tag, result) {
    if (tag.result.indexOf(result) !== -1) {
      tag.result.splice(tag.result.indexOf(result), 1);
    }

  }

  ngOnInit() {
  }

  refershForm(_id: String) {
    this.http.get('http://localhost:3000/rest.player?_id=' + _id)
      .map(rtn => rtn.json())
      .subscribe(result => {
        if (result.issuccess) {
          console.log(result.data);
          this.oldUser = result.data[0];
          this.user = result.data[0];
        } else {
          alert(result.data);
        }
      });
  }

  update() {
    this.http.put('http://localhost:3000/rest.player', this.user).subscribe(rtn => {
      const result = rtn.json();
      if (result.issuccess) {
        console.log(result);
      } else {
        alert(result.data);
      }

    });
  }

  reset() {
    this.user = <any>this.oldUser;
  }

}
