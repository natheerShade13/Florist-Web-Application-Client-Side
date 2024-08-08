import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { User } from './registration.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  //standalone: true,
  //imports: [FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  user = {
    customerId: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    dateOfBirth: null,
  };

  confirmPassword: string = '';

  constructor(private router: Router, private httpClient: HttpClient) { }

  public registerCustomer(user: any): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/customer/register`, user);
  }

  onSubmit() {
    // Handle registration logic here
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    } else {
      this.registerCustomer(this.user).subscribe( // Use next:
        (user: any) => { // Check if email or mobile number already exists in the back end and return response
          console.log(user);
          alert('Registration successful!');
          this.router.navigate(['/login']);
        }, (error: HttpErrorResponse)  => {
          alert(error.message);
        }
      )
    }
  }
}