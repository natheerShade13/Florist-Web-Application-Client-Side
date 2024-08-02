import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onRegister() {
    // Handle registration logic here
    alert('Registration successful');
    this.router.navigate(['/login']);
  }
}