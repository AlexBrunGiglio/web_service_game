import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

  dragon(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/dragon');
  }

  killDragon(): Observable<string> {
    return this.http.delete<string>(this.baseUrl + '/dragon');
  }

  reset(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(this.baseUrl + '/reset');
  }
}

interface StatusResponse {
  name: string;
  start_time: string;
  retreived_tresors: string[];
  end_time?: string;
  finished?: boolean;
}