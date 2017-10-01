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

  public attemptAuthorization() {
    let header = new Headers();
    if(!localStorage.getItem('userToken')) {
      return false;
    }
    header.append('authorization', localStorage.getItem('userToken'))
    header.append('content-type', 'application/json')
    return this.http.get(this.endpoint, {
      headers: header
    }).toPromise().then(resp => {
      if(resp.status==200) {
        console.log('Your logged in.')
        return true;
      } else {
        console.log('non-200 status')
        return false;
      }
    }).catch(err => {
      console.log('HTTP ERR: ', err.status)
      return false;
    })

  }

  public logoutUser() {
    let header = new Headers();
    if(!localStorage.getItem('userToken')) {
      return true;
    }
    header.append('authorization', localStorage.getItem('userToken'))
    header.append('content-type', 'application/json')
    return this.http.get(this.endpoint+'logout', {
      headers: header
    }).toPromise().then(resp => {
      localStorage.removeItem('userToken');
      return true;
    }).catch(err => {
      console.log('HTTP ERR')
      console.log(err)
      return false
    })

  }


  public getProfile() {
    let header = new Headers();
    header.append('authorization', localStorage.getItem('userToken'))
    header.append('content-type', 'application/json')
    return this.http.get(this.endpoint+'profile', {
      headers: header
    }).toPromise().then(resp => {
      return JSON.parse(resp.text())
    }).catch(resp => {
      alert('Server Error!')
      return false
    });
  }

  public searchUsers(query) {
    let header = new Headers();
    header.append('authorization', localStorage.getItem('userToken'))
    header.append('content-type', 'application/json')
    return this.http.post(this.endpoint+'search', {
      query: query
    }, {
      headers: header
    }).toPromise().then(resp => {
      return JSON.parse(resp.text())
    }).catch(resp => {
      return false
    });
  }

  public updateProfile(name) {
    let header = new Headers();
    header.append('authorization', localStorage.getItem('userToken'))
    header.append('content-type', 'application/json')

    return this.http.post(this.endpoint+'profile', {name: name}, {
      headers: header
    }).toPromise().then(resp => {
      return JSON.parse(resp.text())
    }).catch(resp => {
      console.log('Couldn\'t update user.')
      return false;
    })
  }


}
