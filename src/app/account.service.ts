import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Account} from "./account";
import {Transferdetails} from "./transferdetails";
// import {MessageService} from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountService {

  private bank_api = 'http://localhost:3000/api/v1/1/account';

  constructor(private http:HttpClient) { }

  createaccount(account: Account): Observable<Account[]> {
    return this.http.post(`${this.bank_api}/create`, account, httpOptions).map(this.extractData).catch(this.handleError);
  }


  getaccounts(): Observable<Account[]> {
    return this.http.get(`http://localhost:3001/api/v1/1/accounts`).map(this.extractData).catch(this.handleError);
  }

  getaccount(id: number): Observable<Account[]> {
    const url = `http://localhost:3001/api/v1/1/customer/${id}/list_accounts`;
    return this.http.get(url).map(this.extractData).catch(this.handleError);
  }

  updateaccount(account: Account): Observable<Account[]> {
    const url = `${this.bank_api}/${account.id}/update`;
    return this.http.put(url, account, httpOptions).map(this.extractData).catch(this.handleError);
  }

  deactivate(account: Account): Observable<Account[]> {
    return this.http.get(`${this.bank_api}/${account.id}/deactivate`).map(this.extractData).catch(this.handleError);
  }
  activate(account: Account): Observable<Account[]> {
    return this.http.get(`${this.bank_api}/${account.id}/activate`).map(this.extractData).catch(this.handleError);
  }

  transfer(details): Observable<Transferdetails[]>{
    const url = `${this.bank_api}/${details.frm_account}/transfer`;
    return this.http.post(url, details, httpOptions).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res;
    // this.messageservice.success('Success',body["message"])
    console.log(body)
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
