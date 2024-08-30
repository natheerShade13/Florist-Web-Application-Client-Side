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
  customerId: number | null = null;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartProduct$.subscribe(cartProducts => {
      this.cartProduct = cartProducts;
    });
    this.customerId = this.cartService.getCustomerId() ?? null; // Use the public getter method
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalCartPrice();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  checkout() {
    if (this.cartProduct.length > 0) {
      this.router.navigate(['/checkout']); 
    } else {
      alert('Your cart is empty.');
    }
  }

  continueShopping() {
    this.router.navigate(['/catalog']); 
  }

  increaseQuantity(product: Product) {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: Product) {
    this.cartService.removeFromCart(product);
  }
}