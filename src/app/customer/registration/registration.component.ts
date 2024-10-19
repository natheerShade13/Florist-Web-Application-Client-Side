import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
import { DatePipe } from '@angular/common';
import { CustomerService } from '../customer.service';
import * as bcrypt from 'bcryptjs'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  constructor(private router: Router, private httpClient: HttpClient, private customerService: CustomerService) { }

  customerEmail: string | undefined | null;
  emailExists: boolean = false;

    // Regular expressions for validation
    private nameRegex: RegExp = /^[a-zA-Z]+$/; // Only letters
    private mobileNumberRegex: RegExp = /^[0-9]{10}$/; // 10-digit number
    private passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,12}$/; // At least 3 characters, letters and numbers

  form = new FormGroup({
    firstName: new FormControl('', {    // this.customerService.customer.firstName
      validators: [Validators.required]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
    }),
    mobileNumber: new FormControl('', {
      validators: [Validators.pattern(this.mobileNumberRegex)]
    }),
  })

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }
  
  
    const customer: Customer = {
      customerId: null,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password,
      mobileNumber: null,
      dateOfBirth: null
    };

    const confirmPassword = this.form.value.confirmPassword;

    // Handle registration logic here
    if (customer.password !== confirmPassword) {
      //alert('Passwords do not match!');
      return;
    } else {

      const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const hashedPassword = await bcrypt.hash(this.form.value.password as string, 5);
      const customer: Customer = {
      customerId: null,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      email: this.form.get('email')?.value,
      password: hashedPassword,
      mobileNumber: this.form.get('mobileNumber')?.value || null,
      dateOfBirth: null,
    };

      this.customerService.getCustomer(this.form.value.email).subscribe({
        next: (customerExist: Customer) => {
          if (customerExist) {
            //alert('Email already taken');
            this.customerEmail = customerExist.email;
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
      })
    }
  }
}