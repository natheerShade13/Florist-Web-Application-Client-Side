import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSource = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlistSource.asObservable();
  private customerId: number | null = null; // Ensure this is never undefined
  private apiUrl = 'http://localhost:8080/wishlist';

  constructor(
    private customerService: CustomerService,
    private httpClient: HttpClient
  ) {
    const customer = this.customerService.getCustomerLocal();
    if (customer && customer.customerId !== undefined) {
      this.customerId = customer.customerId;
      this.loadWishlistFromServer();
    }
  }

  private loadWishlistFromServer(): void {
    if (this.customerId !== null) {
      this.httpClient.get<Product[]>(`${this.apiUrl}/${this.customerId}`)
        .subscribe(wishlist => {
          this.wishlistSource.next(wishlist);
        });
    }
  }

  addToWishlist(product: Product): void {
    if (this.customerId !== null) {
      this.httpClient.post(`${this.apiUrl}/${this.customerId}/add`, product)
        .subscribe(() => {
          this.loadWishlistFromServer(); // Reload wishlist after adding
        });
    }
  }

  removeFromWishlist(product: Product): void {
    if (this.customerId !== null) {
      this.httpClient.delete(`${this.apiUrl}/${this.customerId}/remove/${product.productId}`)
        .subscribe(() => {
          this.loadWishlistFromServer(); // Reload wishlist after removal
        });
    }
  }

  clearWishlist(): void {
    if (this.customerId !== null) {
      this.httpClient.delete(`${this.apiUrl}/${this.customerId}/clear`)
        .subscribe(() => {
          this.loadWishlistFromServer(); // Reload wishlist after clearing
        });
    }
  }
}
