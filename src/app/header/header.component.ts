import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  dropdownVisible = false; // To control dropdown visibility

  constructor(private router: Router) { }

  onCart() {
    this.router.navigate(['/cart']);
  }

  onOrder() {
    this.router.navigate(['/order']);
  }

  onSignOut() {
    localStorage.removeItem('customer');
    localStorage.removeItem('authToken')
    this.router.navigate(['/login']).then(() => {
      // Reload the page
      window.location.reload();
    });
  }

  onProfile() {
    this.router.navigate(['/profile']);
  }

  onWishList() {
    this.router.navigate(['/wishlist']);
  }

  onCatalog() {
    this.router.navigate(['/catalog']);
  }

  onHome() {
    this.router.navigate(['/home']);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

}
