import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

import { Travel } from '../model/Travel';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TravelService {

  private travelsUrl = 'api/travels';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTravels(): Observable<Travel[]> {

    return this.http.get<Travel[]>(this.travelsUrl)
      .pipe(
        tap(_ => this.log('fetched travels')),
        catchError(this.handleError<Travel[]>('getTravels', []))
      );

  }

  getTravel(id: number): Observable<Travel> {

    const url = `${this.travelsUrl}/${id}`;

    return this.http.get<Travel>(url)
      .pipe(
        tap(_ => this.log(`fetched travel id=${id}`)),
        catchError(this.handleError<Travel>(`getTravel id=${id}`))
      );
  }

  updateTravel(travel: Travel): Observable<any> {
    return this.http.put(this.travelsUrl, travel, httpOptions)
      .pipe(
        tap(_ => this.log(`updated travel id=${travel.id}`)),
        catchError(this.handleError<any>('updatedHero'))
      );
  }

  addTravel(travel: Travel): Observable<Travel> {
    console.log('TravelServiceLog');
    return this.http.post<Travel>(this.travelsUrl, travel, httpOptions)
      .pipe(
        tap((newTravel: Travel) => this.log(`added travel w/ id=${newTravel.id}`)),
        catchError(this.handleError<Travel>('addedTravel'))
      );
  }

  deleteTravel(travel: Travel | number): Observable<Travel> {
    const id = typeof travel === 'number' ? travel : travel.id;
    const url = `${this.travelsUrl}/${id}`;

    return this.http.delete<Travel>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted travel id=${id}`)),
        catchError(this.handleError<Travel>('deleteHero'))
      );
  }

  searchTravel(term: string): Observable<Travel[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Travel[]>(`${this.travelsUrl}/?customer=${term}`)
      .pipe(
        tap(_ => this.log(`found travels matching "${term}"`)),
        catchError(this.handleError<Travel[]>('searchTravels', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /*Log a TravelService message with the MessageService*/
  private log(message: string) {
    this.messageService.add(`TravelService: ${message}`);
  }

}
