import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Customer } from '../model/Customer';
import { DataServerService } from '../service/data-server.service';
import { EventPing } from '../service/event-ping.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  selectedCustomer: Customer;
  newCustomer: Customer;
  showInputCustomer: boolean;

  constructor(
    private dataservice: DataServerService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): void {
    this.dataservice.getCustomer()
      .subscribe((data: Customer[]) => {
        this.customers = data;
      }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red`);
      });
  }

  selectCustomer(event: Customer): void {
    this.selectedCustomer = event;
    console.log(this.selectedCustomer);
  }

  setNewCustomer(): void {
    this.newCustomer = new Customer();
    this.showInputCustomer = true;
  }

  insert(event: EventPing): void {
    console.log(event);
    this.dataservice.addCustomer(event.object)
      .subscribe((data: Customer) => {
        this.customers.push(data);
      }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red`);
      });
  }

  addCustomer(event: Customer): void {
    console.log(event);
    this.dataservice.addCustomer(event);
  }
}
