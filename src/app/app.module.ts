import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AdminService } from './services/admin.service';
import { AppConfigService } from './services/app-config.service';
import { ModalModule, AccordionModule, DatepickerModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { UserComponent } from './pages/user/user.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import 'rxjs/add/operator/map';
import { BsSelectComponent } from './components/bs-select/bs-select.component';
import { WeekRecordComponent } from './pages/week-record/week-record.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    SigninComponent,
    UserComponent,
    UserDetailComponent,
    BsSelectComponent,
    WeekRecordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'user',
        component: UserComponent
      }, {
        path: 'user-detail/:_id',
        component: UserDetailComponent
      }, {
        path: 'weekRecord',
        component: WeekRecordComponent
      }
    ]),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    DatepickerModule.forRoot(),
    DropdownModule.forRoot()

  ],
  providers: [AdminService, AppConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
