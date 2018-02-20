import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CustomerdetailsComponent} from "./customerdetails/customerdetails.component";
import {CustomerComponent} from "./customer/customer.component";
import {AccountComponent} from "./account/account.component";
import {TransferDetailsComponent} from "./transfer-details/transfer-details.component";

const routes:Routes =[
  {path:'',redirectTo:'/',pathMatch:'full'},
  {path:'dashboard',component:DashboardComponent},
  {path:'create_customer',component:CustomerComponent},
  {path:'customer/:id',component:CustomerdetailsComponent,children: [
      { path: 'list/:id', component: AccountComponent, outlet: 'accountlist',children:[
            {path:'get_transaction',component:TransferDetailsComponent,outlet: 'transactionlist'},
        ] },
    ]},

]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{

}
