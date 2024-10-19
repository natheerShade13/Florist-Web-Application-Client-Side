import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer.model";

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, NgIf],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css'],
})
export class AdminLoginComponent {

  constructor(private router: Router, private httpClient: HttpClient, private customerService: CustomerService) { }

  private destroyRef = inject(DestroyRef);

  @ViewChild('form') form!: NgForm;

  email = '';
  password = '';
  empty = false;

  onLogin() {
    if (this.form.invalid) {
      this.empty = true;
      console.log('Form is invalid');
      return;
    }

    this.email = this.form.form.value.email;
    this.password = this.form.form.value.password;

    const subscription = this.customerService.verifyAdmin(this.email, this.password).subscribe({
      next:(customer: Customer)=>{
        localStorage.setItem('customer', JSON.stringify(customer));
        if (typeof customer.token === "string") {
          localStorage.setItem('authToken', customer.token)
        }
        alert('Login successful');
        this.router.navigate(['/admin']).then(success => {
          if (success) {
            console.log('Navigation to /home successful');
            // There is no need to reload the page here
            window.location.reload(); //Insurance @Thabo
          } else {
            console.log('Navigation to /home failed');
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        alert('Incorrect details');
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
