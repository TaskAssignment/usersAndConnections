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
      // try to login with token, if that is the case switch the master vars.
      // if the token is invalid, remove it from local storage.
      console.log('auth attempt: ',apiService.attemptAuthorization())
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
