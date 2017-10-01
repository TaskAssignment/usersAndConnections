import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup }   from '@angular/forms';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.component.html',
  providers: [ ApiService ]
})

export class LoginDialogComponent {
  @Input('master') master;
  myForm: FormGroup;
  alertMessage = '';
  showAlert = false;
  alertType = 'danger';
  // 1 = ok, 0 = none, -1 invalid
  result = 0;



  constructor(private apiService: ApiService, fb: FormBuilder){
    this.myForm = fb.group({
      'username': [''],
      'password': ['']
    })
  }

  login(form) {
    // set alerts to off
    this.showAlert = false;
    this.result = 0;
    if(!form.username || !form.password) {
      this.alertMessage = 'You did not input all the values required.'
      this.showAlert = true
      return false;
    }

    this.apiService.tryLogin(form.username, form.password).then(result => {
      if(result) {
        this.master.state = 'Profile';
        this.master.showLogin = false;
        this.master.loggedIn = true;
      } else {
        this.alertMessage = 'You have incorrect login credentials.';
        this.showAlert = true;
      }
    });

  }
}
