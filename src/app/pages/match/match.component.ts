import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AppConfigService } from '../../services/index';
@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  record: any = {};
  peoples: any[] = [];
  boys: any[] = [];
  girl: any[] = [];
  constructor(public route: ActivatedRoute, public http: Http, public appConfig: AppConfigService) {
    this.route.params.subscribe(params => {
      let _id = params['recordWeekId'];
      this.http.get(this.appConfig.serverIp + 'recordWeek/all?_id=' + _id)
        .subscribe(rtn => {
          const result = rtn.json();
          if (result.issuccess) {
            this.record = result.data[0];
            this.peoples = result.peoples;
            this.separateByGender();
          } else {
            alert(result.data);
          }
        });
    });
  }

  separateByGender() {
    this.boys = this.peoples.filter(people => {
      return people.gender === '男';
    });
    this.girl = this.peoples.filter(people => {
      return people.gender !== '女';
    });
  }

  ngOnInit() {
  }

}
