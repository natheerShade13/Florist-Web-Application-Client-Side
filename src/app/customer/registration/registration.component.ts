import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import * as bcrypt from 'bcryptjs'; 
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule], 
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private customerService: CustomerService
  ) {}

  customerEmail: string | undefined | null;
  emailExists: boolean = false;

  // Regular expressions for validation
  private nameRegex: RegExp = /^[a-zA-Z]+$/; // Only letters
  private mobileNumberRegex: RegExp = /^[0-9]{10}$/; // 10-digit number
  private passwordRegex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,12}$/; // At least 3 characters, letters and numbers

  form = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.nameRegex)]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.nameRegex)]
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern(this.passwordRegex)
      ]
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
    }),
    mobileNumber: new FormControl('', {
      validators: [Validators.pattern(this.mobileNumberRegex)]
    })
  });

  async onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
  
    // Compare plain text password and confirmPassword
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

    // Check if email already exists
    this.customerService.getCustomer(customer.email).subscribe({
      next: (customerExist: Customer) => {
        if (customerExist) {
          this.emailExists = true; // Set emailExists to true if the email exists
        } else {
          this.emailExists = false; // Reset emailExists if the email does not exist
          this.customerService.registerCustomer(customer).subscribe({
            next: (customer: Customer) => {
              console.log(customer);
              alert('Registration successful!');
              this.router.navigate(['/login']);
            },
            error: (error: HttpErrorResponse) => {
              alert('Something went wrong');
            }
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        alert('Error checking email.');
      }
    });
  }
}
