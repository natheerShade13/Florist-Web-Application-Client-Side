import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer.model';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  constructor(private router: Router, private httpClient: HttpClient, private customerService: CustomerService) { }

  form = new FormGroup({
    firstName: new FormControl('', {
      validators: []
    }),
    lastName: new FormControl('', {
      validators: []
    }),
    email: new FormControl('', {
      validators: []
    }),
    password: new FormControl('', {
      validators: []
    }),
    confirmPassword: new FormControl('', {
      validators: []
    }),
  })

  onSubmit() {

    const customer: Customer = {
      customerId: '',
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password,
      mobileNumber: '',
      dateOfBirth: ''
    };

    const confirmPassword = this.form.value.confirmPassword;

    // Handle registration logic here
    if (customer.password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    } else {
      this.customerService.registerCustomer(customer).subscribe({ // Use next:
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