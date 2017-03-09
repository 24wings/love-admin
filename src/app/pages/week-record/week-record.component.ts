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
    /**
     * 若有尚未完成的记录，则提交记录
     */
    if (this.weekRecords.some(weekRecords => weekRecords.isActive === true)) {
      alert('有尚未完成的活动,请先结束激活的活动');
    } else {
      this.http.get(this.appConfig.serverIp + 'recordWeek/newRecordWeek').subscribe(rtn => {
        const result = rtn.json();
        if (result.issuccess) {
          this.refershTable();
          console.log(result.data);
        } else {
          alert(result.data);
        }
      });
    }
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

      });
  }

  matchWeekRecord(weekRecord: any) {
    // this.

  }

  finishWeekRecord(weekRecord: any) {
    weekRecord.isActive = false;
    /**
     * 一般在这里要先进行匹配,才能执行成功 
     */
    this.http.put(this.appConfig.serverIp + 'recordWeek/finish', weekRecord)
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

  deleteWeekRecord(weekRecord: any) {
    this.http.delete(this.appConfig.serverIp + 'rest.recordWeek?_id=' + weekRecord._id).subscribe(rtn => {
      const result = rtn.json();
      if (result.issuccess) {
        this.refershTable();
      } else {
        alert(result.data);
      }
    });

  }

}
