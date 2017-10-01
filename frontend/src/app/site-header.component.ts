import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup }   from '@angular/forms';
import 'rxjs/add/operator/catch';


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
  }
}
