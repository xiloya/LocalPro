import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReservationsService,
  Reservation,
} from '../../services/reservations.service';

@Component({
  selector: 'app-reservations-prestataire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations-prestataire.html',
  styleUrls: ['./reservations-prestataire.css'],
})
export class ReservationsPrestataire implements OnInit {
  reservations: Reservation[] = [];
  loading: boolean = false;

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.loading = true;
    this.reservationsService.getReceivedReservations().subscribe({
      next: (res) => {
        this.reservations = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  updateStatus(id: number, status: string) {
    this.reservationsService.updateReservationStatus(id, status).subscribe({
      next: () => {
        alert('Reservation status updated.');
        this.loadReservations();
      },
      error: (err) => alert(err.error.msg || 'Failed to update status'),
    });
  }
}
