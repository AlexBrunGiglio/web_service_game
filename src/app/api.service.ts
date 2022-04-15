import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethodType } from './types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8100/api';
  constructor(private http: HttpClient) {
  }

  init(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  inscription(user: string, password: string): Observable<any> {
    const req = this.http.get(this.baseUrl + '/inscription', {
      headers: {
        'Authorization': `Basic ${user}:${password}`
      },
      observe: 'response',
      responseType: 'text',
    });
    return req;
  }

  coffre(method: HttpMethodType): Observable<CoffreResponse> {
    return this.http.request<CoffreResponse>(method, this.baseUrl + '/coffre');
  }

  getTresor1(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/1');
  }

  getTresor2(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/36');
  }

  escalier(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/esccalier');
  }

  reset(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(this.baseUrl + '/reset');
  }
}


export interface CoffreResponse {
  text: string;
  message: string;
}

export interface StatusResponse {
  name: string;
  start_time: string;
  retreived_tresors: string[];
  end_time?: string;
  finished?: boolean;
}