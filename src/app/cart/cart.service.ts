import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct, Order } from './cart.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Product } from '../catalog/product.model';
import { OrderService } from '../orders/order.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProductSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProduct$ = this.cartProductSubject.asObservable();
  private customerId: number | null | undefined = null;

  private shippingInfo: any = {};
  private orders: Order[] = []; // Array to store multiple orders

  constructor(private httpClient: HttpClient, private customerService: CustomerService, private ordersService: OrderService) {
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
      const customerId = this.customerId
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
            alert(error.message);
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
             }else{
              const removeProduct = this.cartProductSubject.value.filter((item) => item.product.productId !== product.productId)
              this.cartProductSubject.next(removeProduct);
             }
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          }
        })
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
    // const order: Order = {
    //   cartProduct: [...this.cartProductSubject.value], // Get the current cart items
    //   shippingInfo: this.shippingInfo,
    //   totalAmount: this.cartProductSubject.value.reduce((total, cartProduct) => total + cartProduct.totalPrice, 0),
    //   orderDate: new Date()
    // };
  
    // this.orders.push(order); // Add the order to the orders array

    this.ordersService.addOrder();
  
    // Clear the cart after order completion
    this.clearCart();
  
    // return order;
  }

  getOrders() {
    return this.orders;
  }

  public getCartItemQuantity(productId: number): number {
    const currentCart = this.cartProductSubject.value;
    const existingProduct = currentCart.find(item => item.product.productId === productId);
    return existingProduct ? existingProduct.quantity : 0; // Return the quantity or 0 if not found
  }
  
  public updateCartQuantity(product: Product, newQuantity: number) {
    const currentCart = this.cartProductSubject.value;
    const existingProduct = currentCart.find(item => item.product.productId === product.productId);
  
    if (existingProduct) {
      existingProduct.quantity = newQuantity;
      existingProduct.totalPrice = existingProduct.quantity * product.price;
      this.cartProductSubject.next([...currentCart]); // Update the observable
    }
  }

}
