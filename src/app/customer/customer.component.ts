import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {Customer} from "../customer";
import {BankService} from "../bank.service";
import {Location} from "@angular/common";
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private bankservice:BankService,private location:Location) { }
    customer = new Customer();
  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  create(customer){
    this.bankservice.createcustomer(customer).subscribe(()=>this.goBack())
  }
}
