import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { CustomerService } from "../../customer/customer.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Customer } from "../../customer/customer.model";
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['../profile.component.css', './update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  customerEmail: string | null = null;
  customerNumber: string | null = null;
  customer: Customer | null;
  form: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {
    this.customer = this.customerService.getCustomerLocal();
    this.form = this.initForm();
  }

  ngOnInit() {
  }

  private initForm(): FormGroup {
    return this.fb.group({
      firstName: [this.customer?.firstName || '', Validators.required],
      lastName: [this.customer?.lastName || '', Validators.required],
      email: [this.customer?.email || '', [Validators.required, Validators.email]],
      dateOfBirth: [this.customer?.dateOfBirth || ''],
      mobileNumber: [this.customer?.mobileNumber || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onUpdate() {
    if (this.form.invalid) {
      return;
    }

    const updatedCustomer: Customer = {
      customerId: this.customer?.customerId ?? null,
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      email: this.form.value.email!,
      password: this.customer?.password ?? null,
      mobileNumber: this.form.value.mobileNumber!,
      dateOfBirth: this.form.value.dateOfBirth!
    };

    const emailCheck$ = this.customerService.getCustomer(this.form.value.email!).pipe(
      map(customer => customer || null),
      catchError(() => of(null))
    );
    const mobileCheck$ = this.customerService.getCustomerByMobileNumber(this.form.value.mobileNumber!).pipe(
      map(customer => customer || null),
      catchError(() => of(null))
    );

    const subscription = forkJoin([emailCheck$, mobileCheck$]).subscribe({
      next: ([emailCustomer, mobileCustomer]) => {
        let canUpdate = true;

        if (emailCustomer && emailCustomer.email && emailCustomer.email !== this.customer?.email) {
          this.customerEmail = emailCustomer.email;
          canUpdate = false;
        } else {
          this.customerEmail = null;
        }

        if (mobileCustomer && mobileCustomer.mobileNumber && mobileCustomer.mobileNumber !== this.customer?.mobileNumber) {
          this.customerNumber = mobileCustomer.mobileNumber ?? null;
          canUpdate = false;
        } else {
          this.customerNumber = null;
        }

        if (canUpdate) {
          this.updateCustomerProfile(updatedCustomer);
        }
      },
      error: (error) => {
        console.error('Error checking existing customer details:', error);
        alert('Error checking existing customer details');
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }


  private updateCustomerProfile(customer: Customer) {
    this.customerService.updateCustomer(customer).subscribe({
      next: (updatedCustomer: Customer) => {
        localStorage.setItem('customer', JSON.stringify(updatedCustomer));
        alert('Profile updated successfully');
      },
      error: (error) => {
        console.error('Error updating customer:', error);
        alert('Error updating profile');
      }
    });
  }
}
