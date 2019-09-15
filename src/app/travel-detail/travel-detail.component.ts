import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Travel } from '../model/Travel';
import { DataServerService } from '../service/data-server.service';
import { Cost } from '../model/Cost';

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.css']
})
export class TravelDetailComponent implements OnInit {

  @Input() travel: Travel;
  costs: Cost[];
  range: Date[];
  start: Date;
  end: Date;
  existCost: boolean;
  cols: any;


  constructor(
    private route: ActivatedRoute,
    private dataservice: DataServerService,
    private location: Location) {

      this.cols = [
        {field: 'date', header: 'Datum'},
        {field: 'type', header: 'Art'},
        {field: 'value', header: 'Betrag'},
        {field: 'currency', header: 'Währung'}
      ];
     }

  ngOnInit() {

    this.existCost = false;
    this.getTravelById();

  }

  getTravelById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataservice.getTravelById(id)
      .subscribe(
        travel => this.travel = travel
        );
  }

  getCosts(travel: Travel) {
    console.log(this.travel.customer);
  }

  goBack(): void {
    this.location.back();
  }

  saveTravel(): void {
    this.dataservice.updateTravel(this.travel)
      .subscribe(() => this.goBack());
  }

}
