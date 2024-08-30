import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
      this.httpClient.get<Product[]>(`http://localhost:8080/wishlist/customer/${this.customerId}/products`)
        .subscribe({
          next: (wishlist) => {
            this.wishlistSource.next(wishlist);
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          }
        });
    }
  }

  public addToWishlist(product: Product) {
    if (this.customerId) {
      const currentWishlist = this.wishlistSource.value;
      const existingProduct = currentWishlist.find(item => item.productId === product.productId);

      if (!existingProduct) {
        this.httpClient.post<any>(`http://localhost:8080/wishlist/${this.customerId}/addProduct`, product)
          .subscribe({
            next: () => {
              currentWishlist.push(product);
              this.wishlistSource.next(currentWishlist);
            },
            error: (error: HttpErrorResponse) => {
              alert(error.message);
            }
          });
      } else {
        alert('This product is already in your wishlist.');
      }
    }
  }

  public removeFromWishlist(product: Product) {
    if (this.customerId) {
      this.httpClient.delete<boolean>(`http://localhost:8080/wishlist/${this.customerId}/removeProduct/${product.productId}`)
        .subscribe({
          next: () => {
            const updatedWishlist = this.wishlistSource.value.filter(p => p.productId !== product.productId);
            this.wishlistSource.next(updatedWishlist);
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          }
        });
    }
  }

  public clearWishlist() {
    if (this.customerId) {
      this.wishlistSource.next([]);
      this.httpClient.delete(`http://localhost:8080/wishlist/${this.customerId}/clear`)
        .subscribe({
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          }
        });
    }
  }

  // New method to check if a product is in the wishlist
  public isInWishlist(product: Product): boolean {
    const currentWishlist = this.wishlistSource.value;
    return currentWishlist.some(item => item.productId === product.productId);
  }
}
