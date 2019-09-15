import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Travel } from '../model/Travel';
import { SelectTravelItem } from '../model/SelectTravelItem';
import { EventPing } from '../service/event-ping.service';
import { DataServerService } from '../service/data-server.service';

import {DataViewModule} from 'primeng/dataview';
import { Customer } from '../model/Customer';
import { MenuItem } from 'primeng/api';
/*Testzwecke*/
/* import { TRAVELS } from '../mock-travels'; */

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent implements OnInit {


  selectedTravel: Travel;
  travels: Travel[];
  cols: any[];
  travel: Travel;
  items: MenuItem[];

  constructor(
    private dataservice: DataServerService,
    private router: Router) {
      this.travels = [];
      this.loadData();
    }

  ngOnInit() {

    // leeres Objekt für den Table
    this.travel = new Travel();

    this.cols = [
      {field: 'image', header: 'Logo'},
      {field: 'start', header: 'Start'},
      {field: 'end', header: 'Ende'},
      {field: 'customer', header: 'Kunde'},
      {field: 'reason', header: 'Grund'},
      {field: 'id', header: 'id'}
    ];

    this.items = [
      { label: 'Details', icon: 'pi pi-search', command: (event) => this.getTravelDetail(this.selectedTravel)},
      { label: 'Löschen', icon: 'pi pi-times', command: (event) => this.deleteTravel(this.selectedTravel)}
    ];
  }

  public loadData(): void {
    this.dataservice.getTravel().subscribe((data: Travel[]) => {
      this.travels = data;
      console.log(this.travels);
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red`);
    });
  }

  onSelect(travel: Travel): void {

    this.selectedTravel = travel;

  }

  getTravelDetail(travel: Travel) {

    this.router.navigate(['/detail/' + travel.id]);
  }

  insert(event: EventPing): void {

    this.dataservice.addTravel(event.object)
      .subscribe((data: Travel) => {
        this.travels.push(data);
      }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red`);
    });
  }

  // todo: Liste muss aktualisiert werden
  deleteTravel(travel: Travel): void {
    this.dataservice.deleteTravel(travel.id)
      .subscribe(() => {
        this.travels.slice(travel.id, 1);
      }, error => {
        console.log(`%cERROR: ${error.message}`, `color: red`);
      });
  }

}
