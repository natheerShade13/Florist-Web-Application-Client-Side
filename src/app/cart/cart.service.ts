import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct } from './cart.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CustomerService } from '../customer/customer.service';
import { Product } from '../catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProductSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProduct$ = this.cartProductSubject.asObservable();
  private customerId: number | null | undefined = null;
  //count = 0;

  private shippingInfo: any = {};
  private orders: any[] = []; // Array to store multiple orders

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
      const customerId = this.customerId
      const currentCart = this.cartProductSubject.value;
      const existingProduct = currentCart.find(item => item.product.productId === product.productId);
      // const existingItem = this.cartProductSubject.find(cartItem => cartItem.product.name === item.name);

      // if (existingItem) {
      //   // If the item already exists in the cart, increment the quantity and update the price
      //   existingItem.quantity += 1;
      //   existingItem.totalPrice = existingItem.quantity * item.price;
      // } else {
      //   // If the item does not exist, add it with an initial quantity of 1
      //   this.cartItems.push({ ...item, quantity: 1, totalPrice: item.price });
      // }

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
    // const existingItem = this.cartItems.find(cartItem => cartItem.product.name === item.name);

    // if (existingItem) {
    //   if (existingItem.quantity > 1) {
    //     // Decrement the quantity and update the total price
    //     existingItem.quantity -= 1;
    //     existingItem.totalPrice = existingItem.quantity * item.price;
    //   } else {
    //     // Remove the item entirely if the quantity is 1
    //     this.cartItems = this.cartItems.filter(cartItem => cartItem.product.name !== item.name);
    //   }
    // }

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
            alert(error);
          }
        })

    }

  }

  clearCart() {
    // this.cartProductSubject = [];
  }

  setShippingInfo(info: any) {
    this.shippingInfo = info;
  }

  getShippingInfo() {
    return this.shippingInfo;
  }

  completeOrder() {
    // const order = {
    //   items: [...this.cartItems],
    //   shippingInfo: this.shippingInfo,
    //   totalAmount: this.cartItems.reduce((total, item) => total + item.totalPrice, 0),
    //   orderDate: new Date()
    // };
    // this.orders.push(order);
    // this.clearCart();
    // return order;
  }

  getOrders() {
    return this.orders;
  }

}
