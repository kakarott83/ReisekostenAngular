import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Location, DecimalPipe } from '@angular/common';

import { Travel } from '../model/Travel';
import { EventPing } from '../service/event-ping.service';
import { DataServerService } from '../service/data-server.service';
import { Customer } from '../model/Customer';

import { SelectItem, MenuItem } from 'primeng/api';
import { Reason } from '../model/Reason';
import { Observable } from 'rxjs';
import { Cost } from '../model/Cost';

@Component({
  selector: 'app-travel-add',
  templateUrl: './travel-add.component.html',
  styleUrls: ['./travel-add.component.css']
})
export class TravelAddComponent implements OnInit {

  private travel: Travel;
  private selectedCustomer: Customer;
  private selectedReason: Reason;
  private selectedCostType: MenuItem;
  private selectedCostCurrency: MenuItem;
  private selectedCost: Cost;
  private customers: Customer[];
  private reasons: Reason[];
  private defaultDate = new Date();
  private range: Date;
  private costs: Cost[];
  private cost: Cost;
  private costType: MenuItem [];
  private costCurrency: MenuItem [];
  private costValue: number;
  private costDate: Date;
  private cols: any[];
  private items: any[];
  private existCost: boolean;

  @Output() ping: EventEmitter<any> = new EventEmitter<any> ();

  constructor(
    private location: Location,
    private dataservice: DataServerService) {

      this.dataservice.getCustomer()
        .subscribe((data: Customer[]) => {
          this.customers = data;
          this.selectedCustomer = this.customers[0];
      // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red`);
      });

      this.dataservice.getReason()
        .subscribe((data: Reason[]) => {
          this.reasons = data;
          this.selectedReason = this.reasons[0];
        }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red`);
        });

         // Set DefaultDate
        this.defaultDate.setHours(9);
        this.defaultDate.setMinutes(0);

        this.selectedCostType = {
          label: 'Auto'
        };
        this.selectedCostCurrency = {
          label: 'Euro'}
        ;

        this.costType = [
          { label: ''},
          { label: 'Auto'},
          { label: 'Taxi'},
          { label: 'Fähre'},
          { label: 'Hotel'},
          { label: 'Sonstiges'}
        ];

        this.costCurrency = [
          { label: 'Euro'},
          { label: 'CHF'}
        ];

        this.cols = [
          {field: 'date', header: 'Datum'},
          {field: 'type', header: 'Art'},
          {field: 'value', header: 'Betrag'},
          {field: 'currency', header: 'Währung'}
        ];

        this.items = [
          { label: 'Test', icon: 'pi pi-times', command: (event) => this.test(this.selectedCost)}
        ];

  }

  ngOnInit( ) {

    console.log('OnInit');

    this.createInitTravel();

    }


  createInitTravel(): Travel {

    this.existCost = false;
    this.travel = new Travel();
    this.costs = [];

    return this.travel;

  }

  goBack(): void {

    this.location.back();

  }

  insert(travel?: Travel) {

      this.travel.start = this.range[0];
      this.travel.end = this.range[1];
      this.travel.customer = this.selectedCustomer;
      this.travel.reason = this.selectedReason;
      this.travel.costs = this.costs;

      this.dataservice.addTravel(this.travel)
        .subscribe((data: Travel) => {
          data = this.travel;
        }, error => {
          console.log(`%cERROR: ${error.message}`, `color: red`);
        });

      this.goBack();
  }

  addCosts(cost?: Cost): void {

    this.cost = new Cost();
    this.cost.date = this.costDate;
    this.cost.type = this.selectedCostType.label;
    this.cost.value = this.costValue;
    this.cost.currency = this.selectedCostCurrency.label;

    // ToDo Liste bearbeiten
    this.costs.push(this.cost);
    this.cost = null;
    this.existCost = true;
    console.log(this.costs);
  }


  insertCost(event?: any): void {

    this.travel.costs.push({type: ''});
    }

  deleteCost(i: number): void {

    this.costs.splice(i, 1);

    if (this.costs.length === 0) {
      this.existCost = false;
    }
  }

  test(event?: any) {
    console.log(this.selectedCost);
  }


}
