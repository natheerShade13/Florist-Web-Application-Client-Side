import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishlistSource = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSource.asObservable();

  constructor() {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.wishlistSource.next(savedWishlist);
  }

  addToWishlist(plant: any) {
    const currentWishlist = this.wishlistSource.value;

    // Check if the plant is already in the wishlist
    const existingProduct = currentWishlist.find(item => item.name === plant.name);

    if (!existingProduct) {
      currentWishlist.push(plant);
      this.wishlistSource.next(currentWishlist);
      localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
    } else {
      alert('This product is already in your wishlist.');
    }
  }

  removeFromWishlist(plant: any) {
    const currentWishlist = this.wishlistSource.value.filter(p => p !== plant);
    this.wishlistSource.next(currentWishlist);
    localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
  }

  clearWishlist() {
    this.wishlistSource.next([]);
    localStorage.setItem('wishlist', JSON.stringify([]));
  }
}