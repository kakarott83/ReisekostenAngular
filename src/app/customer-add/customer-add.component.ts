import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Customer } from '../model/Customer';
import { EventPing } from '../service/event-ping.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  newCustomer: Customer;

  @Output() ping: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.newCustomer = {
      id: undefined,
      name: undefined,
      city: undefined,
      country: undefined,
      travelrate: undefined,
      travelpartrate: undefined
    };
   }

  ngOnInit() {
  }

  insert(event?: any): void {

    const eventObject: EventPing = {
      action: 'insert',
      object: this.newCustomer
    };

    this.ping.emit(eventObject);
    this.clearCustomer();

  }

  clearCustomer(): void {
    this.newCustomer.name = '';
    this.newCustomer.city = '';
    this.newCustomer.country = '';
    this.newCustomer.travelrate = 0;
    this.newCustomer.travelpartrate = 0;
    }

}
