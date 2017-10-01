import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup }   from '@angular/forms';
import { OnInit } from '@angular/core';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  providers: [ ApiService ]
})

export class ProfilePageComponent implements OnInit {
  @Input('master') master;
  data;
  ngOnInit() {
    this.apiService.getProfile().then(results => {
      this.data = results

    })

  }
  constructor(private apiService: ApiService, fb: FormBuilder){
  }


}
