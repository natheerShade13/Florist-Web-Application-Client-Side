import { Component, DestroyRef, inject } from "@angular/core";
import { CustomerService } from "../../customer/customer.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Customer } from "../../customer/customer.model";

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['../profile.component.css', './update-profile.component.css']
})

export class UpdateProfileComponent {

  constructor(private customerservice: CustomerService) { }

  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    firstName: new FormControl(this.customerservice.customer.firstName, {
      validators: []
    }),
    lastName: new FormControl(this.customerservice.customer.lastName, {
      validators: []
    }),
    email: new FormControl(this.customerservice.customer.email, {
      validators: []
    }),
    dateOfBirth: new FormControl(this.customerservice.customer.dateOfBirth, {
      validators: []
    }),
    mobileNumber: new FormControl(this.customerservice.customer.mobileNumber, {
      validators: []
    }),
  });

  onUpdate() {

    if (this.form.invalid) {
      return;
    }

    const customer: Customer = {
      customerId: this.customerservice.customer.customerId,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.customerservice.customer.password,
      mobileNumber: this.form.value.mobileNumber,
      dateOfBirth: this.form.value.dateOfBirth
    }

    const subscription = this.customerservice.updateCustomer(customer).subscribe({
      next: (customer: Customer) => {
        this.customerservice.customer =customer;
        alert('Successful Update');
      },
      error: () => {
        alert('Error');
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }

}