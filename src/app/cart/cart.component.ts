import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CartProduct } from './cart.model';
import { Product } from '../catalog/product.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, HeaderComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProduct: CartProduct[] = [];

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartProduct$.subscribe(cartProducts => {
      this.cartProduct = cartProducts;
    });
  }

  reduceQuantity(product: Product) {
    const quantity = this.cartService.getCartItemQuantity(product.productId);
    if (quantity > 1) {
      this.cartService.updateCartQuantity(product, quantity - 1);
    } else {
      this.removeFromCart(product); 
    }
  }

  increaseQuantity(product: Product) {
    const currentQuantity = this.cartService.getCartItemQuantity(product.productId);
    const availableStock = product.stockQuantity; 

    if (currentQuantity < availableStock) {
      this.cartService.updateCartQuantity(product, currentQuantity + 1);
    } else {
      alert(`Cannot increase quantity. Only ${availableStock} items available in stock.`);
    }
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalCartPrice();
  }

  checkout() {
    if (this.cartProduct.length > 0) {
      this.router.navigate(['/checkout']); 
    } else {
      alert('Your cart is empty.');
    }
  }
}
