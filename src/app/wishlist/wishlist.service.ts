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
    currentWishlist.push(plant);
    this.wishlistSource.next(currentWishlist);
    localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
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