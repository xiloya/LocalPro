import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ReservationsService,
  Reservation,
} from '../../services/reservations.service';
import { ServicesService, Service } from '../../services/services.service';

@Component({
  selector: 'app-reservations-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations-client.html',
  styleUrls: ['./reservations-client.css'],
})
export class ReservationsClient implements OnInit {
  reservations: Reservation[] = [];
  services: Service[] = [];
  selectedServiceId: number | null = null;
  loading: boolean = false;

  constructor(
    private reservationsService: ReservationsService,
    private servicesService: ServicesService
  ) {}

  ngOnInit() {
    this.loadReservations();
    this.loadServices();
  }

  loadReservations() {
    this.loading = true;
    this.reservationsService.getMyReservations().subscribe({
      next: (res) => {
        this.reservations = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  loadServices() {
    this.servicesService.getServices().subscribe({
      next: (res) => (this.services = res),
    });
  }

  createReservation() {
    if (!this.selectedServiceId) {
      alert('Please select a service to book.');
      return;
    }
    this.reservationsService
      .createReservation(this.selectedServiceId)
      .subscribe({
        next: () => {
          alert('Reservation created successfully.');
          this.loadReservations();
        },
        error: (err) => alert(err.error.msg || 'Failed to create reservation'),
      });
  }

  cancelReservation(id: number) {
    if (!confirm('Are you sure you want to cancel this reservation?')) {
      return;
    }
    this.reservationsService.cancelReservation(id).subscribe({
      next: () => {
        alert('Reservation canceled.');
        this.loadReservations();
      },
      error: (err) => alert(err.error.msg || 'Failed to cancel reservation'),
    });
  }
}
