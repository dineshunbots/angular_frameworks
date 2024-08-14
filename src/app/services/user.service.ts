
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3001/v1/auth/';
  public httpOptions;
  public authToken: any;
  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        "wtoken": this.authToken
      }),
      body: {}
    };
   }


   async login(postData: any) {
    const response = await this.http.post(this.apiUrl +'login', postData).toPromise();
    return response;
  }

  async register(postData: any) {
    const response = await this.http.post(this.apiUrl +'signup', postData).toPromise();
    return response;
  }

  async getUsers() {
    const response = await this.http.get(this.apiUrl + 'user-list', this.httpOptions).toPromise();
    return response;
  }

}
