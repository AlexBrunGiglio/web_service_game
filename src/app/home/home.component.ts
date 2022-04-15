import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiService, StatusResponse } from '../api.service';
import { HttpMethodType } from '../types';


interface LoginModel {
  username: string;
  password: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  loginModel = {} as LoginModel;
  routesResponse: string[] = [];
  selectedRoute = '/inscription' || '/reset' || '/escalier' || '/coffre' || '/1';
  response: any;
  headersResult: any;
  status!: StatusResponse;
  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.init().subscribe(response => this.routesResponse = response.carte);
    if (localStorage.getItem('token') !== null) {
      firstValueFrom(this.api.reset()).then((response) => this.status = response, (error) => this.status.name = error.error);
    }
    console.log("🚀 ~ HomeComponent ~ ngOnInit ~ this.response ", this.routesResponse);
  }

  async register() {
    localStorage.clear();
    let tokenValue: string;
    await firstValueFrom(this.api.inscription('est', 'test')).then((response) => {
      console.log("🚀 ~ HomeComponent ~ register ~ tokenValue", tokenValue!);
      tokenValue = response.headers.get('x-subject-token');
      localStorage.setItem('token', tokenValue!);
    });
  }

  async coffre(method: HttpMethodType) {
    await firstValueFrom(this.api.coffre(method)).then((response) => {
      this.response.presentation = response.text;
    }, (error) => {
      this.response.presentation = error.error;
    });
  }

  getTokenFromStorage() {
    const token = localStorage.getItem('token');
    if (token == undefined) return false;
    else return true;
  }
}
