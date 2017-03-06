import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class AdminService {
  private adminLoginSource = new Subject<string>();
  adminLogin$ = this.adminLoginSource.asObservable();

  constructor() { }

  adminLogin(loginState: boolean) {
    this.adminLoginSource.next(loginState + '');
  }

}
