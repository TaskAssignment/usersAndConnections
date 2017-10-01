import  { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  constructor (private http: Http) {}

  private endpoint = 'http://localhost:4300/';

  public tryLogin(username, password) {
    return this.http.post(this.endpoint+'login', {username: username, password: password}).toPromise().then(function(resp) {
      if(resp.status==200) {
        var data = JSON.parse(resp.text())
        localStorage.setItem('userToken', data.token)
        return true;
      }
    }).catch(function(data) {
      return false;
    });
  }


  public getProfile() {
    let header = new Headers();
    console.log(localStorage.getItem('userToken'))
    header.append('authorization', localStorage.getItem('userToken'))
    header.append('content-type', 'application/json')
    return this.http.get(this.endpoint+'profile', {
      headers: header
    }).toPromise().then(resp => {
      console.log(JSON.parse(resp.text()))
      return JSON.parse(resp.text())
    }).catch(resp => {
      alert('Server Error!')
      return false
    });
  }

  public updateProfile(name) {
    return this.http.post(this.endpoint+'profile', {name: name}, {})
  }


}
