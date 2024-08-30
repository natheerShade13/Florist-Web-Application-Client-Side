import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct, Order } from './cart.model';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Product } from '../catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProductSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProduct$ = this.cartProductSubject.asObservable();
  private customerId: number | null | undefined = null;

  private shippingInfo: any = {};
  private orders: Order[] = []; // Array to store multiple orders

  constructor(private httpClient: HttpClient, private customerService: CustomerService) {
    const customer = this.customerService.getCustomerLocal();
    if (customer) {
      this.customerId = customer.customerId;
      this.getCartItems();
    }
  }

  public getCartItems() {
    if (this.customerId) {
      this.httpClient.get<CartProduct[]>(`http://localhost:8080/cart/customer/${this.customerId}`)
        .subscribe(cartProducts => {
          // Calculate the total price for each cart product
          cartProducts.forEach(cartProduct => {
            cartProduct.totalPrice = cartProduct.quantity * cartProduct.product.price;
          });
          this.cartProductSubject.next(cartProducts);
        });
    }
  }

  public addToCart(product: Product) {
    if (this.customerId) {
      const customerId = this.customerId;
      const currentCart = this.cartProductSubject.value;
      const existingProduct = currentCart.find(item => item.product.productId === product.productId);

      this.httpClient.post<CartProduct>(`http://localhost:8080/cart/customerId/${customerId}/productId/${product.productId}`, {})
        .subscribe({
          next: (cartProduct: CartProduct) => {
            if (existingProduct) {
              existingProduct.quantity += 1;
              existingProduct.totalPrice = existingProduct.quantity * product.price;
            } else {
              cartProduct.totalPrice = product.price;
              currentCart.push(cartProduct);
            }
            this.cartProductSubject.next([...currentCart]);
          },
          error: (error: HttpErrorResponse) => {
            alert(error);
          }
        });
    }
  }

  getTotalCartPrice(): number {
    return this.cartProductSubject.value.reduce((total, item) => total + item.totalPrice, 0);
  }

  removeFromCart(product: Product) {
    if (this.customerId) {
      const customerId = this.customerId;
      const currentCart = this.cartProductSubject.value;
      const existingProduct = currentCart.find(item => item.product.productId === product.productId);

      this.httpClient.delete<boolean>(`http://localhost:8080/cart/delete/customerId/${customerId}/productId/${product.productId}`)
        .subscribe({
          next: (cart: boolean) => {
            if (cart) {
              if (existingProduct) {
                existingProduct.quantity -= 1;
                existingProduct.totalPrice = existingProduct.quantity * product.price;
              }
            } else {
              const updatedCart = this.cartProductSubject.value.filter(item => item.product.productId !== product.productId);
              this.cartProductSubject.next(updatedCart);
            }
          },
          error: (error: HttpErrorResponse) => {
            alert(error);
          }
        });
    }
  }

  clearCart() {
    this.cartProductSubject.next([]);
  }

  setShippingInfo(info: any) {
    this.shippingInfo = info;
  }

  getShippingInfo() {
    return this.shippingInfo;
  }

  public completeOrder(): Observable<Order> {
    const order: Order = {
      cartProduct: [...this.cartProductSubject.value],  // Current cart items
      shippingInfo: this.shippingInfo,
      totalAmount: this.getTotalCartPrice(),
      orderDate: new Date()
    };

    return this.httpClient.post<Order>('http://localhost:8080/orders/create', order)
      .pipe(
        tap(savedOrder => {
          console.log('Order completed and saved:', savedOrder);
          this.orders.push(savedOrder);  // Add the order to the orders list
          this.clearCart();  // Clear the cart after the order is completed
        }),
        catchError(this.handleError)  // Handle errors
      );
  }

  // Error handling method
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    throw new Error('Error completing the order: ' + error.message);
  }

  getOrders() {
    return this.orders;
  }
}
