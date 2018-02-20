import  { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Account} from "../account";
import {Transferdetails} from "../transferdetails";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public account: Account[]
  transfer_details = new Transferdetails()
  private transfer: boolean = false
  private deposit: boolean = false
  private withdraw: boolean = false
  constructor(private route:ActivatedRoute,private location:Location,private accountservice:AccountService,private router:Router,private msgservice:MessageService) { }
  ngOnInit() {
    this.getaccount()
  }

  goBack() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/customer/',id]);
  }

  getaccount(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountservice.getaccount(id).subscribe(account => this.account = account,(error) => this.msgservice.error("Error",error));
  }
  account_activate(account){
    this.accountservice.activate(account).subscribe(() => {this.getaccount(),this.msgservice.success('Success',"successfully reactivated account")},(error) => this.msgservice.error("Error",error))
  }
  account_deactivate(account){
    this.accountservice.deactivate(account).subscribe(() => {this.getaccount(),this.msgservice.success('Success',"successfully deactivated account")},(error) => this.msgservice.error("Error",error))
  }

  transfer_activate(){
    this.transfer = ! this.transfer;
    this.deposit = false
    this.withdraw = false
  }
  deposit_activate(){
    this.deposit = ! this.deposit;
    this.transfer = false
    this.withdraw = false
  }

  deposit_amount(account_id,amount){
   this.accountservice.deposit(account_id,amount).subscribe((message) => {this.getaccount(),this.msgservice.success('Success',"successfully credited #{amount}")},(error) => this.msgservice.error("Error",error))
  }

  withdraw_activate(){
    this.withdraw =  ! this.withdraw;
    this.transfer = false
    this.deposit = false
  }

  withdraw_amount(id,amount){
   this.accountservice.withdraw(id,amount).subscribe((message) => {this.getaccount(),this.msgservice.success('Success',"successfully debited #{amount}")},(error) => this.msgservice.error("Error",error))
  }

  transaction(details){
    this.accountservice.transfer(details).subscribe((message) => {this.getaccount(),this.msgservice.success('Success',"successfully transfered #{details.amount}")},(error) => this.msgservice.error("Error",error))
  }

}
