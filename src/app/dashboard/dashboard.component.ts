import { Component, OnInit } from '@angular/core';
import {BankService} from "../bank.service";
import {Customer} from "../customer";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public customers: Customer[]
  constructor(private bankservice:BankService) { }

  ngOnInit() {
    this.getcustomer()
  }


  getcustomer(){
    this.bankservice.getcustomers().subscribe(customers=> this.customers = customers)
  }

}
