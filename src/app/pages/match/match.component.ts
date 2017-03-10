import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { AppConfigService } from '../../services/index';
import { People } from '../../interfaces/person';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  record: any = { creatDt: new Date() };
  peoples: People[] = [];
  boys: any[] = [];
  girls: any[] = [];
  matchBoys: People[] = [];
  matchGirls: People[] = [];
  looseMatchBoys: People[] = [];
  matchPairs: { boy: People, girl: People }[] = [];
  constructor(public route: ActivatedRoute, public http: Http, public appConfig: AppConfigService) {
    this.route.params.subscribe(params => {
      let _id = params['recordWeekId'];
      this.http.get(this.appConfig.serverIp + 'recordWeek/all?_id=' + _id)
        .subscribe(rtn => {
          const result = rtn.json();
          if (result.issuccess) {
            this.record = result.data;
            this.peoples = result.peoples;
            this.separateByGender();
          } else {
            alert(result.data);
          }
        });
    });
  }

  separateByGender() {
    this.peoples = this.peoples.map((people: People) => {
      // 基础分
      let baseScore = 0;
      /**
       * 计算问答题分数
       */
      people.anwsers.forEach(anwser => {
        let score = anwser.value.length / anwser.fullLength;
        baseScore += score > 1 ? 1 : score;
      });

      console.log(baseScore);

      people['baseScore'] = baseScore;
      return people;
    });
    /**
     * 顺便按基础分排序
     */
    this.boys = this.peoples.filter(people => {
      return people.gender === '男';
    }).sort((people1, people2) => {
      return people2.baseScore - people1.baseScore;
    });

    this.girls = this.peoples.filter(people => {
      return people.gender !== '男';
    }).sort((people1, people2) => {
      return people2.baseScore - people1.baseScore;
    });
    console.log(this.peoples);
    console.log(this.boys, this.girls);
  }

  ngOnInit() {
  }

  startMatch() {
    this.matchBoys = this.boys.map(boy => boy);
    this.matchGirls = this.girls.map(girl => girl);

    this.matchBoys.forEach(boy => {
      let matchGirls = this.startMatchOne(boy);
      let matchGirl = this.matchGirls.filter(girl => (!girl.isMatched))[0];
      console.log(`${boy.name} 匹配到了`, matchGirl);
      if (matchGirl && (!matchGirl.isMatched)) {
        boy.isMatched = true;
        matchGirl.isMatched = true;
        this.matchPairs.push({ boy: boy, girl: matchGirl });

      } else {
        console.log(boy, '已经落单');
      }
    });
    // 落单
    this.looseMatchBoys = this.matchBoys.filter(boy => !boy.isMatched);




  }

  filterMatched(peoples: People[]) {
    return peoples.filter(people => !people.isMatched);
  }
  /**
   * 为个人匹配
   * @param people 
   */
  startMatchOne(people: People) {
    /**
     * 过滤性别
     */
    let unMatchedPeoples = this.filterMatched(this.peoples);
    let filtedGender = this.filterGender(unMatchedPeoples, people.filterGender.value, people.gender);
    let filtedAge = this.filterAge(filtedGender, people.filterAge.value, people.age);
    // let filtedCity = this.fi
    this.peoples.forEach(peo => peo.isSelected = false);

    filtedAge.forEach(peo => {
      peo.isSelected = true;
    });
    return filtedAge;


  }

  getClass(i: number) {
    switch (i) {
      case 0:
        return 'success';
      case 1:
        return 'info';
      case 2:
        return 'active';
      case 3:
        return 'warning';
      case 4:
        return 'info';
    }
  }
  colors: string[] = ['aqua', 'green', 'orange', 'aquamarine',
    'antiquewhite',
    'brown',
    'violet',
    'turquoise',
    'tomato',
    'teal',
    'thistle',
    'steelblue'
  ];
  getColor(i: number) {

    return this.colors[i % this.colors.length];
  }
  /**
   * 根据性别过滤,其实也要进行反向考核,但是这些留着第二轮吧,先选符合自己的,然后符合别人的
   * @param peoples   过滤的人
   * @param filterGender 
   * @param gender 
   */
  filterGender(peoples: People[], filterGender: 'different' | 'same' | 'both', gender: '男' | '女') {
    switch (filterGender) {
      case 'different':
        return peoples.filter(people => people.gender !== gender);
      case 'same':
        return peoples.filter(people => people.gender === gender);
      case 'both':
        return peoples;

    }
  }

  filterAge(peoples: People[], filterAge: 'old' | 'small' | 'both', age: number) {
    switch (filterAge) {
      case 'old':
        return peoples.filter(people => {
          return people.age >= age;
        });
      case 'small':
        return peoples.filter(people => {
          return people.age < age;
        });
      case 'both':
        return peoples;


    }

  }

  publishMatchResult() {
    this.http.post(this.appConfig.serverIp + 'recordWeek/publish', {
      matchPairs: this.matchPairs,
      looseMatchBoys: this.looseMatchBoys
    }).subscribe(rtn => {
      const result = rtn.json();
      console.log(result);
    });
  }

}
