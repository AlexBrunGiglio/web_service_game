import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Api2Service } from '../api-floor-2.service';
import { Api3Service } from '../api-floor-3.service';
import { ApiService, StatusResponse } from '../api.service';
import { HttpMethodType } from '../types';


interface LoginModel {
  username: string;
  password: string;
}

interface ResponseMessage {
  data: string;
  error: string;
}

interface AlgoChiffrage {
  algo: string;
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
  responseMessage!: string;
  headersResult: any;
  show8000btn = false;
  show7259btn = false;
  showDecryptInput = false;
  status = {} as StatusResponse;
  algoModel = {} as AlgoChiffrage;
  etagesList = ['Etage 1'];
  etageSelected!: string;
  secretRoute!: string;
  vieuxInput!: string;
  constructor(
    private api: ApiService,
    private api2: Api2Service,
    private api3: Api3Service,
  ) { }

  async ngOnInit() {
    this.etageSelected = 'Etage 1';
    this.setRouteListFromFloor();
    if (localStorage.getItem('token') !== null) {
      await this.resetData('get');
    }
  }

  async resetData(method: HttpMethodType) {
    firstValueFrom(this.api.reset(method)).then((response) => this.status = response, (error) => this.status.name = error.error);
  }

  async register() {
    localStorage.clear();
    let tokenValue: string;
    await firstValueFrom(this.api.inscription(this.loginModel.username, this.loginModel.password)).then((response) => {
      console.log("🚀 ~ HomeComponent ~ register ~ tokenValue", tokenValue!);
      tokenValue = response.headers.get('x-subject-token');
      localStorage.setItem('token', tokenValue!);
    });
    this.resetData('get');

  }

  async coffre(method: HttpMethodType) {
    this.showDecryptInput = false;
    await firstValueFrom(this.api.coffre(method)).then((response) => {
      this.responseMessage = '<b> Response : <br> ' + response.body?.text + '<br>' + response.body?.message + '<br> <br>' + this.getResponseHeader(response.headers);
      this.showDecryptInput = true;
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
  }

  async escalier(method: HttpMethodType) {
    this.show8000btn = false;
    await firstValueFrom(this.api.escalier(method)).then((response) => {
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
      if (error.error.text) {
        this.show8000btn = true;
        this.etagesList.push('Etage 2');
      }
    });
    this.resetData('get');

  }

  async tresor1(method: HttpMethodType) {
    await firstValueFrom(this.api.getTresor1(method)).then((response) => {
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
    this.resetData('get');
  }

  async validateTresor() {
    if (this.checkAnswer(this.algoModel.password) && this.checkAlgo(this.algoModel.algo)) {
      this.routesResponse.push('/36');
      this.responseMessage = "Rendez vous sur la route /36.";
      this.showDecryptInput = false;
    }
    else {
      this.responseMessage += "<br> <h1>La réponse est incorrecte !</h1>";
    }
  }

  async tresor2(method: HttpMethodType) {
    await firstValueFrom(this.api.getTresor2(method)).then((response) => {
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
    this.resetData('get');
  }


  getTokenFromStorage() {
    const token = localStorage.getItem('token');
    if (token == undefined) return false;
    else return true;
  }

  getResponseHeader(headers: HttpHeaders) {
    return '<b>Headers :</b><br>'
      + 'Access-Control-Allow-Origin: ' + headers.get('Access-Control-Allow-Origin') + '<br>'
      + 'Accept: ' + headers.get('Accept') + '<br>'
      + 'cipher: ' + headers.get('cipher') + '<br>'
      + 'connection: ' + headers.get('connection') + '<br>'
      + 'content-type: ' + headers.get('content-type') + '<br>'
      + 'date: ' + headers.get('date') + '<br>'
      + 'keep-alive: ' + headers.get('keep-alive') + '<br>'
      + 'transfer-encoding: ' + headers.get('transfer-encoding') + '<br>'
      + 'via: ' + headers.get('via') + '<br>'
      + 'X-Powered-By: ' + headers.get('X-Powered-By');
  }

  checkAnswer(input: string) {
    let regex = /^Roy Fielding$/i;
    return regex.test(input); // Return true or false
  }
  checkAlgo(input: string) {
    let regex = /^aes-256-ctr$/i;
    return regex.test(input);
  }

  validateSecretRoute() {
    if (this.secretRoute === 'tresor' && this.etageSelected === 'Etage 1') {
      this.routesResponse.push('/tresor');
      this.responseMessage = "Une nouvelle route a été découverte.";
    }
  }

  async tresor3(method: HttpMethodType) {
    await firstValueFrom(this.api.getTresor3(method)).then((response) => {
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
    this.resetData('get');
  }

  setRouteListFromFloor() {
    console.log("🚀 ~ HomeComponent ~ setRouteListFromFloor ~ this.etageSelected", this.etageSelected);
    if (this.etageSelected === "Etage 1") {
      this.api.init().subscribe(response => this.routesResponse = response.carte);
    }

    if (this.etageSelected === "Etage 2") {
      this.api2.init().subscribe(response => this.routesResponse = response.carte);
    }

    if (this.etageSelected === "Etage 3") {
      this.api3.init().subscribe(response => this.routesResponse = response.carte);
    }
    this.responseMessage = "";
    this.selectedRoute = "/inscription";
  }

  // SECOND FLOOR


  async register2() {
    localStorage.clear();
    let tokenValue: string;
    await firstValueFrom(this.api2.inscription(this.loginModel.username, this.loginModel.password)).then((response) => {
      tokenValue = response.headers.get('x-subject-token');
      localStorage.setItem('token', tokenValue!);
    });
    this.resetData2('get');
  }

  async resetData2(method: HttpMethodType) {
    firstValueFrom(this.api2.reset(method)).then((response) => this.status = response, (error) => this.status.name = error.error);
  }

  async escalier2(method: HttpMethodType) {
    this.show7259btn = false;
    await firstValueFrom(this.api2.escalier(method)).then((response) => {
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
      if (error.error.text) {
        this.show7259btn = true;
        this.etagesList.push('Etage 3');
      }
    });
    this.resetData2('get');
  }
  async vieux(method: HttpMethodType) {
    firstValueFrom(this.api2.vieux(method, this.vieuxInput)).then((response) => {
      console.log("🚀 ~ HomeComponent ~ firstValueFrom ~ response", response);
      this.responseMessage = '<b> Response : <br> ' + response.body?.descripton + '<br> <br>' + response.body?.question + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
    this.resetData2('get');
  }

  async note(method: HttpMethodType) {
    firstValueFrom(this.api2.note(method)).then((response) => {
      console.log("🚀 ~ HomeComponent ~ firstValueFrom ~ response", response);
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
  }

  async couloir(method: HttpMethodType) {
    firstValueFrom(this.api2.couloir(method)).then((response) => {
      console.log("🚀 ~ HomeComponent ~ firstValueFrom ~ response", response);
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
    if (this.routesResponse.length === 6)
      this.routesResponse.push('/couloir/1');
  }

  async couloir1(method: HttpMethodType) {
    firstValueFrom(this.api2.couloir1(method)).then((response) => {
      console.log("🚀 ~ HomeComponent ~ firstValueFrom ~ response", response);
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
    this.resetData2('get');
  }

  // floor 3 

  async register3() {
    localStorage.clear();
    let tokenValue: string;
    await firstValueFrom(this.api3.inscription(this.loginModel.username, this.loginModel.password)).then((response) => {
      tokenValue = response.headers.get('x-subject-token');
      localStorage.setItem('token', tokenValue!);
    });
    this.resetData3('get');
  }

  async resetData3(method: HttpMethodType) {
    firstValueFrom(this.api3.reset(method)).then((response) => this.status = response, (error) => this.status.name = error.error);
  }

  async dragon(method: HttpMethodType) {
    firstValueFrom(this.api3.dragon(method)).then((response) => {
      console.log("🚀 ~ HomeComponent ~ firstValueFrom ~ response", response);
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
  }

  async killDargon(method: HttpMethodType) {
    firstValueFrom(this.api3.killDragon(method)).then((response) => {
      console.log("🚀 ~ HomeComponent ~ firstValueFrom ~ response", response);
      this.responseMessage = '<b> Response : <br> ' + response.body + '<br> <br>' + this.getResponseHeader(response.headers);
    }, (error) => {
      this.responseMessage = error.error.text + '<br> <br>' + this.getResponseHeader(error.headers);
    });
    this.resetData3('get');
  }

}
