import { HttpClient, HttpErrorResponse, HttpResponse, provideHttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, viewChild, ViewChild } from '@angular/core';
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

  constructor(private router: Router, private httpClient: HttpClient, private customerservice: CustomerService) { }

  private destroyRef = inject(DestroyRef);

  //@ViewChild('form') form!: NgForm;
  private form = viewChild.required<NgForm>('form')

  email = '';
  password = '';
  empty = false;

  //saveEmail: string = '';

  onLogin() {
    if (this.form().invalid) {
      return;
    }

    this.email = this.form().form.value.email;
    this.password = this.form().form.value.password;

    this.customerservice.verifyCustomer(this.email, this.password).subscribe({
      next: (data: boolean) => {
        if (data) {
          this.customerservice.getCustomer(this.email).subscribe({
            next: (customer: Customer) => {
              localStorage.setItem('customer', JSON.stringify(customer));
              alert('Login successful');
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            }
          });
        } else {
          alert('Incorrect details');
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
