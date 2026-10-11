import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {

  public trip: Trip | null = null;
  public errorMessage = '';
  public isSaving = false;

  private tripCode = '';

  constructor(
    private tripDataService: TripDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') || '';

    if (!this.tripCode) {
      this.errorMessage = 'No trip code was provided.';
      return;
    }

    this.tripDataService.getTrip(this.tripCode).subscribe({
      next: (data: Trip) => {
        this.trip = {
          ...data,
          start: data.start ? data.start.substring(0, 10) : ''
        };
      },
      error: (err: unknown) => {
        console.error('Error retrieving trip:', err);
        this.errorMessage = 'Unable to load trip information.';
      }
    });
  }

  public onSubmit(): void {
    if (!this.trip || this.isSaving) {
      return;
    }

    this.errorMessage = '';
    this.isSaving = true;

    const tripToSave: Trip = {
      ...this.trip,
      perPerson: String(this.trip.perPerson)
    };

    this.tripDataService.updateTrip(this.tripCode, tripToSave).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: unknown) => {
        console.error('Error updating trip:', err);
        this.errorMessage = 'Unable to update trip. Please try again.';
        this.isSaving = false;
      }
    });
  }
}