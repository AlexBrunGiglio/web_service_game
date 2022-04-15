import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethodType } from './types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8100/api1';
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

  coffre(method: HttpMethodType): Observable<HttpResponse<CoffreResponse>> {
    return this.http.request<CoffreResponse>(method, this.baseUrl + '/coffre', { observe: 'response', });
  }

  getTresor1(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/1', { observe: 'response', });
  }

  getTresor2(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/36', { observe: 'response', });
  }

  escalier(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/escalier', { observe: 'response', });
  }

  reset(method: HttpMethodType): Observable<StatusResponse> {
    return this.http.request<StatusResponse>(method, this.baseUrl + '/reset');
  }

  getTresor3(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/tresor', { observe: 'response', });
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