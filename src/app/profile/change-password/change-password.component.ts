import { Component } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
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

   customerPassword = this.customerService.getCustomerLocal()?.password;

  form = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(12)]
    })
  });

  onChangePassword() {

    if (this.form.invalid) {
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) {
      //alert('Passwords do not match!');
      return;
    }

    if (this.form.value.password === this.customerService.getCustomerLocal()?.password
      && this.form.value.confirmPassword === this.customerService.getCustomerLocal()?.password) {
        alert('Can not use the same password'); // Use alternative to delete
        return;
    }

    const customer: Customer = {
      customerId: this.customerService.getCustomerLocal()?.customerId ?? null,
      firstName: this.customerService.getCustomerLocal()?.firstName ?? null,
      lastName: this.customerService.getCustomerLocal()?.lastName ?? null,
      email: this.customerService.getCustomerLocal()?.email ?? null,
      password: this.form.value.password,
      mobileNumber: this.customerService.getCustomerLocal()?.mobileNumber ?? null,
      dateOfBirth: this.customerService.getCustomerLocal()?.dateOfBirth ?? null,
      token: null
    }

    const confirmPassword = this.form.value.confirmPassword;

    if (customer.password !== confirmPassword) {
      alert('Passwords do not match!');
      this.form.reset();
    } else {
      this.customerService.updateCustomerPassword(customer).subscribe({
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
