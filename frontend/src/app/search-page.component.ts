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



  constructor(private apiService: ApiService, fb: FormBuilder){
  }


}
