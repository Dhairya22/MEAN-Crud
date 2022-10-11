import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  loader = new BehaviorSubject<Boolean>(false);
  token = new BehaviorSubject<any>('');
  isAuthenticate: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }

  login(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}login`, payload);
  }

  signup(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}register`, payload);
  }

  getList(): Observable<any> {
    return this.http.get(`${environment.baseUrl}list`);
  }

  getDetails(_id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}list/${_id}`);
  }

  saveData(payload: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}create`, payload);
  }

  updateData(_id: any, payload: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}update/${_id}`, payload);
  }

  deleteData(_id: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}delete/${_id}`);
  }

  searchData(key: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}search/${key}`);
  }
}
