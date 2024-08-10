import { HttpClient, HttpErrorResponse, HttpResponse, provideHttpClient } from '@angular/common/http';
import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer.model';

@Component({
  selector: 'app-login',
  //standalone: true,
  //imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers: [provideHttpClient()]
})
export class LoginComponent {

  //@ViewChild('form') form!: NgForm;
  private form = viewChild.required<NgForm>('form')

  email = '';
  password = '';

  //saveEmail: string = '';

  constructor(private router: Router, private httpClient: HttpClient, private customerservice: CustomerService) { }

  onLogin() {

    if (this.form().form.invalid) {
      return;
    }

    this.email = this.form().form.value.email;
    this.password = this.form().form.value.password;

    this.customerservice.verifyCustomer(this.email, this.password).subscribe({
      next: (data: Customer) => { //Added boolean recently
        if (data.email === this.email && data.password === this.password) {
          this.customerservice.customer = data;
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
        }
      },
      error: () => {
        alert('Incorrect details');
        //this.form.form.reset;
      }
    }
    )
  }
}