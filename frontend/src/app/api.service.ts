import  { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  constructor (private http: Http) {}

  private endpoint = 'http://localhost:4300/';

  public tryLogin(username, password) {
    return this.http.post(this.endpoint+'login', {username: username, password: password}).toPromise().then(function(resp) {
      if(resp.status==200) {
        return true;
      }
    }).catch(function(data) {
      return false;
    });
  }


}