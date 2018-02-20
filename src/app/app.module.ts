///<reference path="message.service.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AppRoutingModule} from './app_routing.module';
import {BankService} from './bank.service';
import {HttpClientModule} from '@angular/common/http';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {DataTableModule, RadioButtonModule} from 'primeng/primeng';
import {PanelModule} from "primeng/primeng";
import {ButtonModule} from "primeng/primeng";
import { CustomerComponent } from './customer/customer.component';
import {AccountService} from "./account.service";
import { AccountComponent } from './account/account.component';
import {GrowlModule} from 'primeng/primeng';
import {MessageService} from "./message.service";
import { TransferDetailsComponent } from './transfer-details/transfer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CustomerdetailsComponent,
    CustomerComponent,
    AccountComponent,
    TransferDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    AccordionModule,
    DataTableModule,
    ReactiveFormsModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,GrowlModule
  ],
  providers: [BankService,AccountService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
