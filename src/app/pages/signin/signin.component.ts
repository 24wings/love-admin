import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild('staticModal') public staticModal: ModalDirective;
  admin = {
    username: '',
    password: ''
  }

  constructor(public adminService: AdminService) {

  }

  ngOnInit() {
  }

  login() {
    if (this.admin.username === 'admin' && this.admin.password === 'admin') {
      this.adminService.adminLogin(true);
    } else {
      this.staticModal.show();
    }
  }

}
