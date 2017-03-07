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
import { ModalModule, AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
import { UserComponent } from './pages/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    SigninComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'user',
        component: UserComponent
      }
    ]),
    ModalModule.forRoot(),
    AccordionModule.forRoot()

  ],
  providers: [AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
