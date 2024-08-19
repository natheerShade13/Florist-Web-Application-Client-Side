import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Product } from '../catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSource = new BehaviorSubject<Product[]>([]);
  wishlist$ = this.wishlistSource.asObservable();
  private customerId: number | null | undefined = null;

  constructor(
    private customerService: CustomerService,
    private httpClient: HttpClient
  ) {
    const customer = this.customerService.getCustomerLocal();

    if (customer) {
      this.customerId = customer.customerId;
      this.loadWishlistFromServer();
    }
  }

  public loadWishlistFromServer() {
    if (this.customerId) {
      this.httpClient.get<any[]>(`http://localhost:8080/api/wishlist/customer/${this.customerId}/products`)
        .subscribe(wishlist => {
          this.wishlistSource.next(wishlist);
        });
    }
  }

  addToWishlist(product: any) {
    if (this.customerId) {
      const currentWishlist = this.wishlistSource.value;
      const existingProduct = currentWishlist.find(item => item.productId === product.productId);

      if (!existingProduct) {
        currentWishlist.push(product);
        this.wishlistSource.next(currentWishlist);

        // Save to server
        this.httpClient.post(`http://localhost:8080/wishlist/${this.customerId}/add`, product)
          .subscribe(() => {
            localStorage.setItem(`wishlist_${this.customerId}`, JSON.stringify(currentWishlist));
          });
      } else {
        alert('This product is already in your wishlist.');
      }
    }
  }

  removeFromWishlist(product: any) {
    if (this.customerId) {
      const currentWishlist = this.wishlistSource.value.filter(p => p.productId !== product.productId);
      this.wishlistSource.next(currentWishlist);

      // Save to server
      this.httpClient.delete(`http://localhost:8080/wishlist/${this.customerId}/remove/${product.productId}`)
        .subscribe(() => {
          localStorage.setItem(`wishlist_${this.customerId}`, JSON.stringify(currentWishlist));
        });
    }
  }

  clearWishlist() {
    if (this.customerId) {
      this.wishlistSource.next([]);
      localStorage.removeItem(`wishlist_${this.customerId}`);

      // Clear from server
      this.httpClient.delete(`http://localhost:8080/wishlist/${this.customerId}/clear`)
        .subscribe();
    }
  }
}