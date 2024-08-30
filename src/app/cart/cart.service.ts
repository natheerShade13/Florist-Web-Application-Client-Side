import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct } from './cart.model';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private orders: any[] = []; 

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
          cartProducts.forEach(cartProduct => {
            cartProduct.totalPrice = cartProduct.quantity * cartProduct.unitPrice;
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
              existingProduct.totalPrice = existingProduct.quantity * existingProduct.unitPrice;
            } else {
              cartProduct.totalPrice = cartProduct.quantity * cartProduct.unitPrice;
              currentCart.push(cartProduct);
            }
            this.cartProductSubject.next([...currentCart]);
          },
          error: (error: HttpErrorResponse) => {
            const errorMessage = error.error.message || 'An error occurred while adding the product to the cart.';
            alert(errorMessage);
          }
        });
    }
  }

  getTotalCartPrice(): number {
    return this.cartProductSubject.value.reduce((total, item) => total + item.totalPrice, 0);
  }

  public removeFromCart(product: Product) {
    if (this.customerId) {
      const customerId = this.customerId;
      const currentCart = this.cartProductSubject.value;
      const existingProduct = currentCart.find(item => item.product.productId === product.productId);

      this.httpClient.delete<boolean>(`http://localhost:8080/cart/delete/customerId/${customerId}/productId/${product.productId}`)
        .subscribe({
          next: (success: boolean) => {
            if (success && existingProduct) {
              existingProduct.quantity -= 1;
              if (existingProduct.quantity <= 0) {
                const updatedCart = currentCart.filter(item => item.product.productId !== product.productId);
                this.cartProductSubject.next(updatedCart);
              } else {
                existingProduct.totalPrice = existingProduct.quantity * existingProduct.unitPrice;
                this.cartProductSubject.next([...currentCart]);
              }
            }
          },
          error: (error: HttpErrorResponse) => {
            const errorMessage = error.error.message || 'An error occurred while removing the product from the cart.';
            alert(errorMessage);
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

  completeOrder() {
    const order = {
      items: [...this.cartProductSubject.value],
      shippingInfo: this.shippingInfo,
      totalAmount: this.cartProductSubject.value.reduce((total, item) => total + item.totalPrice, 0),
      orderDate: new Date()
    };
    this.orders.push(order);
    this.clearCart();
    return order;
  }

  getOrders() {
    return this.orders;
  }

  // Public getter for customerId
  public getCustomerId(): number | null | undefined {
    return this.customerId;
  }
}