import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Reservation {
  id: number;
  date: string;
  status: string;
  client_id: number;
  prestataire_id: number;
  service_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private apiUrl = 'http://localhost:5000/reservations'; // Adjust backend URL as needed

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createReservation(service_id: number): Observable<Reservation> {
    const headers = this.getAuthHeaders();
    return this.http.post<Reservation>(
      this.apiUrl,
      { service_id },
      { headers }
    );
  }

  getMyReservations(): Observable<Reservation[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reservation[]>(`${this.apiUrl}/mine`, { headers });
  }

  getReceivedReservations(): Observable<Reservation[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Reservation[]>(`${this.apiUrl}/received`, { headers });
  }

  updateReservationStatus(id: number, status: string): Observable<Reservation> {
    const headers = this.getAuthHeaders();
    return this.http.put<Reservation>(
      `${this.apiUrl}/${id}`,
      { status },
      { headers }
    );
  }

  cancelReservation(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
