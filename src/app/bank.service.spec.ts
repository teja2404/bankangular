import { TestBed, inject } from '@angular/core/testing';
import { BankService } from './bank.service';
import {HttpClientModule} from "@angular/common/http";
import {Customer} from "./customer";
import {MessageService} from "./message.service";
import {AccountService} from "./account.service";



let customer: Customer;
let service: BankService;
let accountservice: AccountService
let existing_cust:Customer;

describe('BankService', () => {
  let customer
  let existing_cust
  let numb

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BankService,MessageService,AccountService]
    });
    service = TestBed.get(BankService);
    accountservice = TestBed.get(AccountService);
    numb = (Math.random() * (1000 - 100 + 1) | 0) + 100
    customer = {name:"analytics"+numb+"",email:"analytics"+numb+"@gmail.com",phone:1233,branch_id:1,status:true}
  });

  describe('customer creation', () => {
    it('should not create customer if name is blank', (done) => {
      customer.name = null
      service.createcustomer(customer).subscribe(() => {
          done();
        },
        (error) => {
          expect(error).toBe('name is empty');
          done();
        });
    });

    it('should not create customer if phone is blank', (done) => {
      customer.phone = null
      service.createcustomer(customer).subscribe(() => {
          done();
        },
        (error) => {
          expect(error).toBe('phone is empty');
          done();
        });
    });

    it('should not create customer if email is blank', (done) => {
      customer.email = null
      service.createcustomer(customer).subscribe(() => {
          done();
        },
        (error) => {
          expect(error).toBe('email is empty');
          done();
        });
    });

    it('should create new customer', (done) => {
      service.createcustomer(customer).subscribe((cust) => {
        expect(cust["name"]).toBe(customer.name)
        expect(cust["email"]).toBe(customer.email)
        expect(cust["phone"]).toBe(1233)
        done();
      })
    });
  });

  it('should update new customer', (done) => {
    service.createcustomer(customer).subscribe((cust) => {
      existing_cust = cust
      existing_cust.name = "newName"+numb+""
      service.updatecustomer(existing_cust).subscribe((cust) => {
        expect(cust).toBeTruthy()
        done();
      })
    })
  });
  describe('customer deactivation test', () => {
    it('should deactivate customer', (done) => {
      service.createcustomer(customer).subscribe((cust) => {
        existing_cust = cust
        service.deactivate(existing_cust).subscribe((customer) => {
          expect(customer).toBeTruthy()
          done();
        })
      })
    });

    it('should not  deactivate if customer is already deactivated', (done) => {
      customer.status = false
      service.createcustomer(customer).subscribe((cust) => {
        existing_cust = cust
        service.deactivate(existing_cust).subscribe(() => {
            done();
          },
          (error) => {
            expect(error).toBe('Record invalid');
            done();
          });
      })
    });
  });

  describe('customer activation test', () => {
    it('should deactivate customer', (done) => {
      customer.status = false
      service.createcustomer(customer).subscribe((cust) => {
        existing_cust = cust
        service.activate(existing_cust).subscribe((customer) => {
          expect(customer).toBeTruthy()
          done();
        })
      })
    });

    it('should not  activate if customer is already active', (done) => {
      service.createcustomer(customer).subscribe((cust) => {
        existing_cust = cust
        service.activate(existing_cust).subscribe(() => {
            done();
          },
          (error) => {
            expect(error).toBe('Record invalid');
            done();
          });
      })
    });
  });

  describe('list account test cases', () => {
    it('should list account of customer if active', (done) => {
      service.createcustomer(customer).subscribe((cust) => {
        existing_cust = cust
        accountservice.getaccount(existing_cust["id"]).subscribe((account) => {
          expect(account["status"]).toBeTruthy()
          expect(account["account_type"]).toBe("saving")
          done();
        })
      })
    });

    it('should not list account if customer is inactive', (done) => {
      customer.status = false
      service.createcustomer(customer).subscribe((cust) => {
        existing_cust = cust
        accountservice.getaccount(existing_cust["id"]).subscribe(() => {
            done();
          },
          (error) => {
            expect(error).toBe('Record invalid');
            done();
          });
      })
    });
  });
});
