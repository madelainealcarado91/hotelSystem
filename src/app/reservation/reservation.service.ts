import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http'; //for requests
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3001"

  private reservations: Reservation[] = [];

  //only for local storage
  // constructor(){
  //   let savedReservations = localStorage.getItem("reservations");
  //   this.reservations = savedReservations? JSON.parse(savedReservations) : [];
  // }

  //dependency injection
  constructor(private http: HttpClient){}

  //CRUD
  // getting all reservations
  //observable is for waiting for the processing time
  getReservations(): Observable<Reservation[]> {
    //for localstorage
    // return this.reservations;

    //with http get request
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");

  }
  
  // undefined if the reservation is not faound
  getReservation(id: string) : Observable<Reservation>{
    // return this.reservations.find(res => res.id === id);
    return this.http.get<Reservation>(this.apiUrl + "/reservation/"+id);
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiUrl + "/reservation/", reservation);
   
    //only for local storage
    // reservation.id = Date.now().toString( );
    // this.reservations.push(reservation);
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));


    
  } 

  deleteReservation(id: string): Observable<void>{
    
    //only for local storage
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
    // let index = this.reservations.findIndex(res => res.id === id);
    // this.reservations.splice(index, 1)
    return this.http.delete<void>(this.apiUrl + "/reservation/"+id);

  }

  updateReservation(id: string, updatedReservation: Reservation) : Observable<void> {
    
    //only for local storage

    // let index = this.reservations.findIndex(res => res.id === id);
    // this.reservations[index] = updatedReservation;
    // localStorage.setItem("reservations", JSON.stringify(this.reservations));
    return this.http.put<void>(this.apiUrl + "/reservation/"+id, updatedReservation);

    
  }
}
