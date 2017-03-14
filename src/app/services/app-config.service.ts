import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {
  get serverIp() {
    return 'http://localhost:5000/';
  }
  constructor() { }

}
