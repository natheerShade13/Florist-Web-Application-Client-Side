import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { CustomerService } from "../../customer/customer.service";
import { Address } from './add-address.models';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-address.component.html',
  styleUrls: ['../profile.component.css', './add-address.component.css']
})
export class AddAddressComponent {
  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.addressForm = this.fb.group({
      streetNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      streetName: ['', Validators.required],
      suburb: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern("^[0-9]{5}$")]]
    });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      const newAddress: Address = this.addressForm.value;

      const customerString = localStorage.getItem('customer');
      if (customerString) {
        const customer = JSON.parse(customerString);
        newAddress.customerId = customer.customerId;
      }

      this.customerService.addAddress(newAddress).subscribe({
        next: (createdAddress: Address) => {
          console.log('Address added successfully:', createdAddress);
          alert('Address added successfully');
        },
        error: (error) => {
          console.error('Error adding address:', error);
          if (error.status === 404) {
            alert('The server endpoint for adding an address was not found. Please contact support.');
          } else if (error.status === 400) {
            alert('Invalid address data. Please check your input and try again.');
          } else {
            alert('Error adding address: ' + (error.error?.message || error.statusText || 'Unknown error'));
          }
        }
      });
    } else {
      console.error('Form is invalid:', this.addressForm.errors);
      alert('Please fill out all required fields correctly.');
    }
  }
}
