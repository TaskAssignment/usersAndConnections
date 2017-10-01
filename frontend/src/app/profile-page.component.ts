import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup }   from '@angular/forms';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  providers: [ ApiService ]
})

export class ProfilePageComponent implements OnInit {
  @Input('master') master;
  data = {name: ''};
  myForm: FormGroup;
  alert = {};
  showAlert = false;


  ngOnInit(): void {
    this.apiService.getProfile().then(results => {
      this.data = results
    }).catch(err => {
      console.log('error getting user info')
    })


  }
  constructor(private apiService: ApiService, fb: FormBuilder){
    this.myForm = fb.group({
      'name': this.data.name,
    })
  }

  public update(form) {
    this.showAlert = false;
    console.log(form);
    this.apiService.updateProfile(form.name).then(resp => {
      console.log(resp)
      console.log('updated.')
      this.data = resp
      this.alert = {type: 'success', message: 'You have successfully updated your profile.'}
      this.showAlert = true;
    })
  }


}
