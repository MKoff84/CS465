import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'travlr-admin';

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}