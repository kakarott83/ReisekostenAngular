import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Travel } from '../model/Travel';
import { Customer } from '../model/Customer';
import { Reason } from '../model/Reason';

@Injectable({
  providedIn: 'root'
})
export class DataServerService {

  private serverUrl = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(
    private _http: HttpClient
  ) { }

  // GET
  public getTravel(): Observable<Travel[]> {

    return this._http.get<Travel[]>(`${this.serverUrl}/travels`, this.httpOptions);
  }

  public getCustomer(): Observable<Customer[]> {

    return this._http.get<Customer[]>(`${this.serverUrl}/customers`, this.httpOptions);
  }

  public getReason(): Observable<Reason[]> {

    return this._http.get<Reason[]>(`${this.serverUrl}/reasons`, this.httpOptions);
  }

  // GETbyID
  public getTravelById(id: number): Observable<Travel> {

    return this._http.get<Travel>(`${this.serverUrl}/travels/${id}`, this.httpOptions);
  }

  public getCustomerById(id: number): Observable<Customer> {

    return this._http.get<Customer>(`${this.serverUrl}/customers/${id}`, this.httpOptions);
  }

  public getReasonById(id: number): Observable<Reason> {

    return this._http.get<Reason>(`${this.serverUrl}/reasons/${id}`, this.httpOptions);
  }

  // POST
  public addTravel(travel: Travel): Observable<Travel> {

    console.log(travel);
    return this._http.post<Travel>(`${this.serverUrl}/travels`, travel, this.httpOptions);
  }

  public addCustomer(customer: Customer): Observable<Customer> {

    console.log(customer);
    return this._http.post<Customer>(`${this.serverUrl}/customers`, customer, this.httpOptions);
  }

  public addReason(reason: Reason): Observable<Reason> {

    return this._http.post<Reason>(`${this.serverUrl}/reasons/`, reason, this.httpOptions);
  }

  // PUT
  public updateTravel(travel: Travel): Observable<Travel> {

    return this._http.put<Travel>(`${this.serverUrl}/travels/${travel.id}`, travel, this.httpOptions);
  }

  public updateCustomer(customer: Customer): Observable<Customer> {

    return this._http.put<Customer>(`${this.serverUrl}/customers/${customer.id}`, customer, this.httpOptions);
  }

  public updateReason(reason: Reason): Observable<Reason> {

    return this._http.put<Reason>(`${this.serverUrl}/reasons/${reason.id}`, reason, this.httpOptions);
  }

  // Delete
  public deleteTravel(id: number): Observable<any> {

    return this._http.delete<Travel>(`${this.serverUrl}/travels/${id}`, this.httpOptions);
  }

  public deleteCustomer(id: number): Observable<any> {

    return this._http.delete<Customer>(`${this.serverUrl}/customers/${id}`, this.httpOptions);
  }

  public deleteReason(id: number): Observable<any> {

    return this._http.delete<Reason>(`${this.serverUrl}/reasons/${id}`, this.httpOptions);
  }

  // GET Search
  searchCustomer(term: string): Observable<Travel[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this._http.get<Travel[]>(`${this.serverUrl}/?customer=${term}`);
  }

}
