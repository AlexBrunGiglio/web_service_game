import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

  escalier(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/esccalier');
  }

  reset(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(this.baseUrl + '/reset');
  }

  vieux(): Observable<VieuxResponse> {
    return this.http.get<VieuxResponse>(this.baseUrl + 'vieux');
  }

  note(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/note');
  }

  couloir(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/couloir');
  }

  couloir1(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/couloir/1');
  }
}

interface StatusResponse {
  name: string;
  start_time: string;
  retreived_tresors: string[];
  end_time?: string;
  finished?: boolean;
}

interface VieuxResponse {
  description: string;
  question: string;
}