import { TestBed, inject } from '@angular/core/testing';
import { BankService } from './bank.service';
import {HttpClientModule} from "@angular/common/http";
import {Customer} from "./customer";
import {MessageService} from "./message.service";



let customer: Customer;
let service: BankService;

describe('BankService', () => {
  let customer
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BankService,MessageService]
    });
    service= TestBed.get(BankService);
    customer = {name:"analytics",email:"analytics@gmail.com",phone:1233,branch_id:1,status:true}
  });


  it('should not create customer if name is blank',  (done) => {
    customer.name = null
    service.createcustomer(customer).subscribe(() => {
        done();
      },
      (error) => {
      console.log(error)
        expect(error).toBe('name is empty');
        done();
      });
  });

  it('should not create customer if phone is blank',  (done) => {
    customer.phone = null
    service.createcustomer(customer).subscribe(() => {
        done();
      },
      (error) => {
        console.log(error)
        expect(error).toBe('phone is empty');
        done();
      });
  });

  it('should not create customer if email is blank',  (done) => {
    customer.email = null
    service.createcustomer(customer).subscribe(() => {
        done();
      },
      (error) => {
        console.log(error)
        expect(error).toBe('email is empty');
        done();
      });
  });

  it('should create new customer',  (done) => {
    service.createcustomer(customer).subscribe((cust)=>{
      expect(cust["name"]).toBe("analytics")
      expect(cust["email"]).toBe("analytics@gmail.com")
      expect(cust["phone"]).toBe(1233)
      done();
    })
  });
});
