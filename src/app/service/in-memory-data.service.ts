import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Travel } from '../model/Travel';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const travels = [
      {id: 11, start: '01.01.2019', end: '02.01.2019', customer: 'BANK-now', reason: 'Vor Ort Betruung'},
      {id: 12, start: '05.01.2019', end: '07.01.2019', customer: 'BANK-now', reason: 'Vor Ort Betruung'},
      {id: 13, start: '08.01.2019', end: '10.01.2019', customer: 'HCBE', reason: 'Vor Ort Betruung'},
      {id: 14, start: '09.02.2019', end: '13.02.2019', customer: 'HCBE', reason: 'Vor Ort Betruung'},
      {id: 15, start: '10.01.2019', end: '12.01.2019', customer: 'Sirconic', reason: 'Workshop'}
    ];

    return {travels};
  }

  genId(travels: Travel[]): number {
    return travels.length > 0 ? Math.max(...travels.map(travel => travel.id)) + 1 : 11;
  }

}
