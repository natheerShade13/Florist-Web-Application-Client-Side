import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(private router: Router) { }

  onCart() {
    this.router.navigate(['/cart']);
  }

  onSignOut() {
    this.router.navigate(['/login']);
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
}
