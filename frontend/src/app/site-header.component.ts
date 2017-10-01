import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  providers: [ ApiService ]
})

export class SiteHeaderComponent {
  title = 'UsersAndConnections';
  @Input() alert = 0;


  constructor(private apiService: ApiService){}

  increment() {
    console.log(this.apiService.tryLogin('taylor', 'admin'));
  }
}
