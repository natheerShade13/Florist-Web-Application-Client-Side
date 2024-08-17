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

  // customer: Customer = this.customerservice.customer;

  getCustomer(): Customer | null {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      // Parse the JSON string to a Customer object
      const customer: Customer = JSON.parse(storedCustomer);
      //console.log(customer);
      return(customer)
    }
    return null;
  }

  form = new FormGroup({
    firstName: new FormControl(this.getCustomer()!.firstName, {
      validators: []
    }),
    lastName: new FormControl(this.getCustomer()?.lastName, {
      validators: []
    }),
    email: new FormControl(this.getCustomer()?.email, {
      validators: []
    }),
    dateOfBirth: new FormControl(this.getCustomer()?.dateOfBirth, {
      validators: []
    }),
    mobileNumber: new FormControl(this.getCustomer()?.mobileNumber, {
      validators: []
    }),
  });

  onUpdate() {

    if (this.form.invalid) {
      return;
    }

    const customer: Customer = {
      customerId: this.getCustomer()?.customerId,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.getCustomer()?.password,
      mobileNumber: this.form.value.mobileNumber,
      dateOfBirth: this.form.value.dateOfBirth
    }

    const subscription = this.customerservice.updateCustomer(customer).subscribe({
      next: (customer: Customer) => {
        this.customerservice.customer = customer;
        localStorage.setItem('customer', JSON.stringify(customer));
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