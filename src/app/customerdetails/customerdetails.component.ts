import {Component, Input, OnInit} from '@angular/core';
import {BankService} from "../bank.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {Customer} from "../customer";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {
  @Input() customer: Customer[]
  constructor(private bankservice:BankService,private route:ActivatedRoute,private location:Location,private router:Router,private msgservice:MessageService) { }

  ngOnInit() {
    this.getcustomer()
  }

  getcustomer(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.bankservice.getcustomer(id).subscribe(customer => this.customer = customer);
  }
  //
  // getcustomeraccount():void{
  //
  // }



  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  update(customer) :void {
    this.bankservice.updatecustomer(customer).subscribe(() => {this.getcustomer(),this.msgservice.success("Success","Successfully Updated customer")});
  }

  activate(customer): void{
    this.bankservice.activate(customer).subscribe(() => { this.getcustomer(),this.msgservice.success("Success","Successfully reactivated customer") })
  }
  deactivate(customer): void{
    this.bankservice.deactivate(customer).subscribe(() => { this.getcustomer(),this.msgservice.success("Success","Successfully deactivated customer") })
  }

}
