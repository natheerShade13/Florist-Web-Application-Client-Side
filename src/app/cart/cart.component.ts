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
    this.cartService.cartProduct$.subscribe(cartProducts =>{
      this.cartProduct = cartProducts;
    })
  }

  removeFromCart(product: Product) {
     this.cartService.removeFromCart(product);
    // this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalCartPrice();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  checkout() {
    // if (this.cartItems.length > 0) {
    //   this.router.navigate(['/checkout']); // Redirects to the checkout page
    // } else {
    //   alert('Your cart is empty.');
    // }
  }
}