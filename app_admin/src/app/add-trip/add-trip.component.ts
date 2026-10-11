import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {

  public newTrip: Trip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  public errorMessage = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  public onSubmit(): void {
    this.errorMessage = '';

    const tripToSave: Trip = {
      ...this.newTrip,
      perPerson: String(this.newTrip.perPerson)
    };

    this.tripDataService.addTrip(tripToSave).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding trip:', err);
        this.errorMessage = 'Unable to add trip. Please try again.';
      }
    });
  }
}