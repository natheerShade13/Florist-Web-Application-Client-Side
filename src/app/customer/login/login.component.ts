import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers: [provideHttpClient()]
})
export class LoginComponent {

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
  
    // No longer using customerAuth 
    const subscription = this.customerService.authenticate(this.email, this.password).subscribe({
      next: (userType: string) => {
        console.log('Login verification response:', userType); // Debug log
  
        if (userType === 'Admin') {
          this.router.navigate(['/admin']).then(success => {
            if (success) {
              console.log('Navigation to /admin successful');
          
            } else {
              console.log('Navigation to /admin failed');
            }
          });
        } else if (userType === 'Customer') {
          this.customerService.getCustomer(this.email).subscribe({
            next: (customer: Customer) => {
              console.log('Customer retrieved:', customer); // Debug log
              localStorage.setItem('customer', JSON.stringify(customer));
  
              
              alert('Login successful');
              this.router.navigate(['/home']).then(success => {
                if (success) {
                  console.log('Navigation to /home successful');
                  // There is no need to reload the page here
                } else {
                  console.log('Navigation to /home failed');
                }
              });
            },
            error: (error: HttpErrorResponse) => {
              alert('Failed to retrieve customer details');
              console.error('Customer retrieval error:', error);//debug code
            }
          });
        } else {
          alert('Incorrect details');
        }
      },
      error: (error: HttpErrorResponse) => {
        alert('Incorrect details');
        console.error('Login error:', error); // Debug log
      }
    });
  
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}