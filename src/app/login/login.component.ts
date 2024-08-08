import { HttpClient, HttpErrorResponse, HttpResponse, provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  //standalone: true,
  //imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  //providers: [provideHttpClient()]
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  saveUsername: string = '';

  constructor(private router: Router, private httpClient: HttpClient) { }

  public verifyCustomer(username: string, password: string): Observable<boolean> { // Return user object
    return this.httpClient.get<boolean>(`http://localhost:8080/customer/login/${username}/${password}`);
  }

  onLogin() {
    this.verifyCustomer(this.username, this.password).subscribe({
      next: (data: boolean) => { //Added boolean recently
        if (data == true) {

          //localStorage.setItem('username', this.username)
          //this.saveUsername = this.username;
          //console.log(this.saveUsername);
          // Handle login logic here
          alert('Login successful');
          //console.log(data)
          this.router.navigate(['/home']);
        } else {
          alert('Login failed')
          //console.log(data)
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    }
    )
  }

  getUsername(username: string){

  }

}