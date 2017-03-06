import { Component } from '@angular/core';
import { AdminService } from './services/admin.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSignIn = true;

  constructor(public adminService: AdminService) {
    this.adminService.adminLogin$.subscribe(result => this.isSignIn = result === 'true' ? true : false);
  }

}
