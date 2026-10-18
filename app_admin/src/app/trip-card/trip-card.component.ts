import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {

  @Input() trip!: Trip;
  @Output() tripDeleted = new EventEmitter<void>();

  isDeleting = false;
  deleteError = '';

  constructor(
    public authService: AuthenticationService,
    private tripDataService: TripDataService
  ) {}

  public deleteTrip(): void {
    if (!this.authService.isLoggedIn() || this.isDeleting) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${this.trip.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.deleteError = '';
    this.isDeleting = true;

    this.tripDataService.deleteTrip(this.trip.code).subscribe({
      next: () => {
        this.isDeleting = false;
        this.tripDeleted.emit();
      },
      error: () => {
        this.isDeleting = false;
        this.deleteError = 'Unable to delete trip. Please try again.';
      }
    });
  }
}