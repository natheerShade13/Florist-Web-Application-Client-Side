import { Component, DestroyRef, inject } from "@angular/core";
import { CustomerService } from "../../customer/customer.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Customer } from "../../customer/customer.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['../profile.component.css', './update-profile.component.css']
})

export class UpdateProfileComponent {

  constructor(private customerService: CustomerService) { }

  private destroyRef = inject(DestroyRef);

  customerEmail: string | undefined | null;
  customerNumber: string | undefined | null;

  // customer: Customer = this.customerservice.customer;
  // customer = this.customerService.getCustomerLocal();

  getCustomer(): Customer | null {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      // Parse the JSON string to a Customer object
      const customer: Customer = JSON.parse(storedCustomer);
      //console.log(customer);
      return (customer)
    }
    return null;
  }

  customer: Customer | undefined | null = this.getCustomer();

  form = new FormGroup({
    firstName: new FormControl(this.getCustomer()?.firstName || '', {
      validators: [Validators.required]
    }),
    lastName: new FormControl(this.getCustomer()?.lastName || '', {
      validators: [Validators.required]
    }),
    email: new FormControl(this.getCustomer()?.email || '', { //{value: this.getCustomer()?.email || '', disabled: true}
      validators: [Validators.required, Validators.email]
    }),
    dateOfBirth: new FormControl(this.getCustomer()?.dateOfBirth || '', {
      validators: []
    }),
    mobileNumber: new FormControl(this.getCustomer()?.mobileNumber || '', {
      validators: [Validators.minLength(10), Validators.maxLength(10)]
    }),
  });

  onUpdate() {

    if (this.form.invalid) {
      return;
    }

    const customer: Customer = {
      customerId: this.getCustomer()?.customerId ?? null,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.getCustomer()?.password ?? null,
      mobileNumber: this.form.value.mobileNumber,
      dateOfBirth: this.form.value.dateOfBirth
    }


    const subscription = this.customerService.getCustomer(this.form.value.email).subscribe({
      next: (customerExist: Customer) => {
        if (customerExist) {
          //alert('Email already taken');
          if (customerExist.email === this.getCustomer()?.email) {
            this.customerEmail = null;
          } else {
            this.customerEmail = customerExist.email;
            return;
          }
        }
        // if (this.form.value.mobileNumber !== null) {
        //   this.customerService.getCustomerByMobileNumber(this.form.value.mobileNumber).subscribe({
        //     next: (customerNew: Customer) => {
        //       if (customerNew) {
        //         //alert('Email already taken');
        //         if (customerNew.mobileNumber === this.getCustomer()?.mobileNumber) {
        //           this.customerNumber = null;
        //         } else {
        //           this.customerNumber = customerNew.mobileNumber;
        //           return;
        //         }
        //       }
        //     }
        //   });
        // }
        this.customerService.updateCustomer(customer).subscribe({
          next: (customer: Customer) => {
            //this.customerservice.customer = customer;
            localStorage.setItem('customer', JSON.stringify(customer));
            alert('Successful Update');
          },
          error: () => {
            alert('Error');
          }
        })
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }

}