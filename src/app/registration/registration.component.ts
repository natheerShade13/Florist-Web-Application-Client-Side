import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer.model';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  customer: Customer = {
    customerId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    dateOfBirth: '2000-10-05'
  };

  confirmPassword: string = '';

  constructor(private router: Router, private httpClient: HttpClient, private customerService: CustomerService) { }

  onSubmit() {
    // Handle registration logic here
    if (this.customer.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    } else {
      this.customerService.registerCustomer(this.customer).subscribe({ // Use next:
        next: (customer: Customer) => { // Check if email or mobile number already exists in the back end and return response
          console.log(customer);
          alert('Registration successful!');
          this.router.navigate(['/login']);
        }, error: (error: HttpErrorResponse) => {
          alert('Something went wrong');
        }
      })
    }
  }
}