import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlist: any[] = [];

  ngOnInit() {
    // Load wishlist from localStorage or some backend service
    const savedWishlist = localStorage.getItem('wishlist');
    this.wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  }

  removeFromWishlist(plant: any) {
    this.wishlist = this.wishlist.filter(p => p !== plant);
    // Save the updated wishlist to localStorage or some backend service
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }
}