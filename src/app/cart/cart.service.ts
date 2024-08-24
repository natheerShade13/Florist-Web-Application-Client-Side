import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartProduct } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartProduct[] = [];
  private shippingInfo: any = {};
  private orders: any[] = []; // Array to store multiple orders

  constructor(private httpClient: HttpClient){}



  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.product.name === item.name);

    if (existingItem) {
      // If the item already exists in the cart, increment the quantity and update the price
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.quantity * item.price;
    } else {
      // If the item does not exist, add it with an initial quantity of 1
      this.cartItems.push({ ...item, quantity: 1, totalPrice: item.price });
    }
  }

  removeFromCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.product.name === item.name);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        // Decrement the quantity and update the total price
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * item.price;
      } else {
        // Remove the item entirely if the quantity is 1
        this.cartItems = this.cartItems.filter(cartItem => cartItem.product.name !== item.name);
      }
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

  setShippingInfo(info: any) {
    this.shippingInfo = info;
  }

  getShippingInfo() {
    return this.shippingInfo;
  }

  completeOrder() {
    const order = {
      items: [...this.cartItems],
      shippingInfo: this.shippingInfo,
      totalAmount: this.cartItems.reduce((total, item) => total + item.totalPrice, 0),
      orderDate: new Date()
    };
    this.orders.push(order);
    this.clearCart();
    return order;
  }

  getOrders() {
    return this.orders;
  }

}
           