import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup }   from '@angular/forms';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  providers: [ ApiService ]
})

export class ProfilePageComponent {
  @Input('master') master;



  constructor(private apiService: ApiService, fb: FormBuilder){
  }

}
