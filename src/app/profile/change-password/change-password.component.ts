import { Component } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { CustomerService } from "../../customer/customer.service";
import { Customer } from "../../customer/customer.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['../profile.component.css', './change-password.component.css']
})

export class ChangePasswordComponent {

  constructor(private customerService: CustomerService) { }

  // customer: Customer | null = this.customerService.getCustomerLocal();

  form = new FormGroup({
    password: new FormControl('', {
      validators: []
    }),
    confirmPassword: new FormControl('', {
      validators: []
    })
  });

  onChangePassword() {

    if (this.form.invalid) {
      return;
    }

    const customer: Customer = {
      customerId: this.customerService.getCustomerLocal()?.customerId ?? null,
      firstName: this.customerService.getCustomerLocal()?.firstName ?? null,
      lastName: this.customerService.getCustomerLocal()?.lastName ?? null,
      email: this.customerService.getCustomerLocal()?.email ?? null,
      password: this.form.value.password,
      mobileNumber: this.customerService.getCustomerLocal()?.mobileNumber ?? null,
      dateOfBirth: this.customerService.getCustomerLocal()?.dateOfBirth ?? null
    }

    const confirmPassword = this.form.value.confirmPassword;

    if (customer.password !== confirmPassword) {
      alert('Passwords do not match!');
      this.form.reset();
    } else {
      this.customerService.updateCustomer(customer).subscribe({
        next: (customer: Customer) => {
          //console.log(customer);
          localStorage.setItem('customer', JSON.stringify(customer));
          alert('Changed password successfully');
        }, error: (error: HttpErrorResponse) => {
          alert('Something went wrong');
        }
      })
      this.form.reset();
    }

  }

}