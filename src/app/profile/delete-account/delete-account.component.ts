import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../customer/customer.service';
import { Customer } from '../../customer/customer.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  customer: Customer | null;
  constructor(private customerService: CustomerService, public router: Router) {
    this.customer = this.customerService.getCustomerLocal();
  }

  confirmDelete() {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed && this.customer && this.customer.customerId) {
      this.deleteAccount(this.customer.customerId);
    }
  }

  deleteAccount(customerId: number) {
    console.log(`Initiating delete for customer ID: ${customerId}`);
    this.customerService.deleteCustomer(customerId).subscribe({
      next: (result) => {
        console.log('Delete operation result:', result);
        if (result) {
          localStorage.removeItem('customer');
          alert('Your account has been deleted successfully.');
          this.router.navigate(['/login']);
        } else {
          alert('Failed to delete account. Please try again.');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error during delete operation:', err);
        if (err.error instanceof Error) {
          console.error('An error occurred:', err.error.message);
        } else {
          console.error(`Backend returned code ${err.status}, body was:`, err.error);
        }
        alert(`There was an error deleting your account: ${err.message}`);
      }
    });
  }
}
