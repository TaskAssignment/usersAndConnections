import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { FormBuilder, FormGroup }   from '@angular/forms';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  providers: [ ApiService ]
})

export class SearchPageComponent {
  @Input('master') master;
  myForm: FormGroup;
  alert = {};
  showAlert = false;
  results = {};
  hasResults = false;

  constructor(private apiService: ApiService, fb: FormBuilder){
    this.myForm = fb.group({
      'query': [''],
    })
  }

  public search(form) {
    this.showAlert = false;
    this.apiService.searchUsers(form.query).then(resp => {
      if(resp && resp.length) {
        this.hasResults = true;
        this.results = resp;
      } else {
        this.alert = {type: 'warning', message: 'Could not find any users with that query.'}
        this.showAlert = true;
      }

    })
  }


}
