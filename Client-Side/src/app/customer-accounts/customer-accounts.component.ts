import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {AccountsService} from "../service/accounts.service";
import {Observable} from "rxjs";
import {AccountsCustomersDetails} from "../model/account.model";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customer! : Customer;
  customerId! : string;
  bankAccount!: Observable<Array<AccountsCustomersDetails>>;
  constructor(private accountsService : AccountsService, private route : ActivatedRoute, private router :Router) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
      this.customerId = this.route.snapshot.params['id'];
      this.bankAccount = this.accountsService.bankAccountList(this.customerId);
  }

  handleCustomerAccountsDetail(account: AccountsCustomersDetails) {
    this.router.navigateByUrl("/accounts/"+account.id, {state : account});
  }

}
