import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Travel } from '../model/Travel';
import { TravelService } from '../service/travel.service';
import { DataServerService } from '../service/data-server.service';

@Component({
  selector: 'app-travel-search',
  templateUrl: './travel-search.component.html',
  styleUrls: ['./travel-search.component.css']
})
export class TravelSearchComponent implements OnInit {

  travels$: Observable<Travel[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private travelService: TravelService,
    private dataService: DataServerService) { }

  search(term: string): void {

    this.searchTerms.next(term);

  }

  ngOnInit(): void {

    this.travels$ = this.searchTerms
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.dataService.searchCustomer(term))
      );
  }

}
