import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Account} from "../account";
import {Transferdetails} from "../transferdetails";
import {Customer} from "../customer";
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private account: Account[]
  transfer_details = new Transferdetails()
  private transfer: boolean = false
  constructor(private route:ActivatedRoute,private location:Location,private accountservice:AccountService,private router:Router) { }
  ngOnInit() {
    this.getaccount()
  }

  goBack() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/customer/',id]);
  }

  getaccount(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountservice.getaccount(id).subscribe(account => this.account = account);
  }
  account_activate(account){
    this.accountservice.activate(account).subscribe(() => this.getaccount())
  }
  account_deactivate(account){
    this.accountservice.deactivate(account).subscribe(() => this.getaccount())
  }

  transfer_activate(){
    this.transfer = ! this.transfer;
  }

  transaction(details){
    this.accountservice.transfer(details).subscribe(() => this.getaccount())
  }

}
