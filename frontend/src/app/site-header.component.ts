import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup }   from '@angular/forms';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  providers: [ ApiService ]
})

export class SiteHeaderComponent {
  title = 'UsersAndConnections';


  master = {
    state: 'Login',
    showLogin: false,
    showSearch: false,
    loggedIn: false
  }


  constructor(private apiService: ApiService, fb: FormBuilder){
    if(typeof localStorage.getItem('userToken') !== 'undefined') {
      // try to login with token and switch the master vars.

      if(apiService.attemptAuthorization().valueOf()) {
        this.master.state = 'Profile';
        this.master.loggedIn = true;
      } else {
        this.master.state = 'Login';
        this.master.loggedIn = false;
      }

    }
  }

  public logout() {
    if(this.apiService.logoutUser()) {
      this.master.state = 'Login';
      this.master.loggedIn = false;
    }
  }

}
