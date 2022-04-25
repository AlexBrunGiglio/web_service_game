import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethodType } from './types';

@Injectable({
  providedIn: 'root'
})
export class Api3Service {
  baseUrl = 'http://localhost:8100/api3';
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

  dragon(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/dragon', { observe: 'response', });
  }

  killDragon(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/dragon', { observe: 'response', });
  }

  reset(method: HttpMethodType): Observable<StatusResponse> {
    return this.http.request<StatusResponse>(method, this.baseUrl + '/reset');
  }
}

interface StatusResponse {
  name: string;
  start_time: string;
  retreived_tresors: string[];
  end_time?: string;
  finished?: boolean;
}