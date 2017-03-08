import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AppConfigService } from '../../services/index';
@Component({
  selector: 'app-week-record',
  templateUrl: './week-record.component.html',
  styleUrls: ['./week-record.component.scss']
})
export class WeekRecordComponent implements OnInit {
  weekRecords: any[] = [];


  constructor(public http: Http, public appConfig: AppConfigService) {
    this.refershTable();
  }

  ngOnInit() {
  }

  startNewWeekRecord() {
    this.http.get(this.appConfig.serverIp + 'recordWeek/newRecordWeek').subscribe(rtn => {
      const result = rtn.json();
      if (result.issuccess) {
        console.log(result.data);
      } else {
        alert(result.data);
      }
    });

  }

  refershTable() {
    this.http.get(this.appConfig.serverIp + 'rest.recordWeek')
      .subscribe(rtn => {
        const result = rtn.json();
        if (result.issuccess) {
          this.weekRecords = result.data;
        } else {
          alert(result.data);
        }

      })
  }

}
