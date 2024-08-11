import { HttpClient, HttpErrorResponse, HttpResponse, provideHttpClient } from '@angular/common/http';
import { Component, DestroyRef, inject, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer.model';
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

    // if (this.password === '') {
    //   this.empty = true;
    // } else{
    //   this.empty = false
    // }

    if (this.form().invalid) { // Check with the previous
      return
    }

    this.email = this.form().form.value.email;
    this.password = this.form().form.value.password;

    // Using validation which returns boolean
    const subscription = this.customerservice.verifyCustomer(this.email, this.password).subscribe({
      next: (data: boolean) => {
        if (data) {
          //this.customerservice.customer = data;
          //localStorage.setItem('username', this.username)
          //this.saveUsername = this.username;
          //console.log(this.saveUsername);
          // Handle login logic here
          alert('Login successful');
          //console.log(data)
          this.router.navigate(['/home']);
          //} else {
          //  alert('Login failed')
          //console.log(data)
          //this.form.form.reset;
        } else {
          alert('Incorrect details')
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        //this.form.form.reset;
      }
    }
    )
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }
}