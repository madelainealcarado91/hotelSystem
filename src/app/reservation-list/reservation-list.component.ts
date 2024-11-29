import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  
  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService
  ){}
  ngOnInit(): void {
    //for local storage
    // this.reservations = this.reservationService.getReservations();  

    //with http, we need to subscribe because the array in getreservations is observable
    //once the observable is completed we can now get our returned value then assigned it to the property
    this.reservationService.getReservations().subscribe( reservations => {
      this.reservations = reservations;
    });
  }

  deleteReservation(id:string) {
    // this.reservationService.deleteReservation(id);
    this.reservationService.deleteReservation(id).subscribe(() => {
      console.log("Reservation has been deleted")
    });

  }


  
  
}
