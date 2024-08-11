import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);

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
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        // Decrement the quantity and update the total price
        existingItem.quantity -= 1;
        existingItem.totalPrice = existingItem.quantity * item.price;
      } else {
        // Remove the item entirely if the quantity is 1
        this.cartItems = this.cartItems.filter(cartItem => cartItem.name !== item.name);
      }
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

}
           