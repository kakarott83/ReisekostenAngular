import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Travel } from '../model/Travel';
import { DataServerService } from '../service/data-server.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedTravel: Travel;
  travels: Travel[];
  cols: any[];
  travel: Travel;
  items: MenuItem[];
  sum: number;

  constructor(
    private dataService: DataServerService,
    private router: Router) {

     this.getTravels();

     }

  ngOnInit() {

    this.cols = [
      {field: 'image', header: ''},
      {field: 'start', header: 'Start'},
      {field: 'end', header: 'Ende'},
      {field: 'customer', header: 'Kunde'},
      {field: 'reason', header: 'Grund'},
      {field: 'costs', header: 'Ausgaben'},
      {field: 'id', header: 'id'}
    ];


    this.items = [
      { label: 'Details', icon: 'pi pi-search', command: (event) => this.getTravelDetail(this.selectedTravel)},
      { label: 'Löschen', icon: 'pi pi-times', command: (event) => this.deleteTravel(this.selectedTravel)}
    ];


  }

  // die letzten 3 Reisen
  getTravels(): void {
    this.dataService.getTravel()
      .subscribe(travels => this.travels = travels.slice(-3, travels.length));
  }

  addTravel(): void {
    this.router.navigate(['/add']);
  }

  getTravelDetail(travel: Travel) {

    this.router.navigate(['/detail/' + travel.id]);
  }

  deleteTravel(travel: Travel) {

    this.dataService.deleteTravel(travel.id)
      .subscribe(() =>  {
        this.travels.slice(travel.id, 1);
    }, error => {
      console.log(`%cERROR: ${error.message}`, `color: red`);
    });
  }

}
