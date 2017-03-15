import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
  get serverIp() {
    return 'http://teach.wanviv.com:5000/';
  }
  constructor() { }

}
