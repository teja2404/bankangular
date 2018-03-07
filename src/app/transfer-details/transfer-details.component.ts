import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../account.service";
import {Transaction} from "../transaction";

@Component({
  selector: 'app-transfer-details',
  templateUrl: './transfer-details.component.html',
  styleUrls: ['./transfer-details.component.css']
})
export class TransferDetailsComponent implements OnInit {
  private transactions : Transaction[];
  private display : boolean = false;
  constructor(private route:ActivatedRoute,private accountservice:AccountService) { }

  ngOnInit() {
    this.display = !this.display
    this.gettranctionsdetails()
  }
  gettranctionsdetails(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountservice.gettranctionsdetails(id).subscribe(transactions => this.transactions = transactions)
  }
}
