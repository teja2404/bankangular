import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Customer} from "./customer";
import {MessageService} from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BankService {

  private bank_api = 'http://localhost:3001/api/v1/1/customer';

  constructor(private http:HttpClient,private messageService:MessageService) { }

  createcustomer(customer: Customer): Observable<Customer[]> {
    return this.http.post(`${this.bank_api}/create`, customer, httpOptions).map(this.extractData).catch((response: any) => this.handleError(response));;
  }


  getcustomers(): Observable<Customer[]> {
    return this.http.get(`http://localhost:3001/api/v1/1/customers`).map(this.extractData).catch((response: any) => this.handleError(response));;
  }

  getcustomer(id: number): Observable<Customer[]> {
    const url = `${this.bank_api}/${id}`;
    return this.http.get(url).map(this.extractData).catch((response: any) => this.handleError(response));;
  }

  updatecustomer(customer: Customer): Observable<Customer[]> {
    const url = `${this.bank_api}/${customer.id}/update`;
    return this.http.put(url, customer, httpOptions).map(this.extractData).catch((response: any) => this.handleError(response));;
  }

  deactivate(customer: Customer): Observable<Customer[]> {
    return this.http.get(`${this.bank_api}/${customer.id}/deactivate`).map(this.extractData).catch((response: any) => this.handleError(response));;
  }
  activate(customer: Customer): Observable<Customer[]> {
    return this.http.get(`${this.bank_api}/${customer.id}/activate`).map(this.extractData).catch((response: any) => this.handleError(response));;
  }

  private extractData(res: Response) {
    const body = res;
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
    console.log(error)
    return Observable.throw(error["error"].error);
  }


}
