import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusResponse } from './api.service';
import { HttpMethodType } from './types';

@Injectable({
  providedIn: 'root'
})
export class Api2Service {
  baseUrl = 'http://localhost:8100/api2';
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

  escalier(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/escalier', { observe: 'response', });
  }

  reset(method: HttpMethodType): Observable<StatusResponse> {
    return this.http.request<StatusResponse>(method, this.baseUrl + '/reset');
  }

  vieux(method: HttpMethodType, input: string): Observable<HttpResponse<VieuxResponse>> {
    if (method === "post") {
      return this.http.post<VieuxResponse>(this.baseUrl + '/vieux', input, { observe: 'response', headers: new HttpHeaders({ 'Application': 'text/plain' }) });
    } else
      return this.http.request<VieuxResponse>(method, this.baseUrl + '/vieux', { observe: 'response' });
  }

  note(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/note', { observe: 'response', });
  }

  couloir(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/couloir', { observe: 'response', });
  }

  couloir1(method: HttpMethodType): Observable<HttpResponse<string>> {
    return this.http.request<string>(method, this.baseUrl + '/couloir/1', { observe: 'response', });
  }
}

interface VieuxResponse {
  descripton: string;
  question: string;
}