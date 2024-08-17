import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { WishlistService } from '../wishlist/wishlist.service';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  constructor(private router: Router, private cartService: CartService, private wishlistService: WishlistService
    , private customerService: CustomerService) { }

  ngOnInit(): void {
    //console.log(this.customerService.customer);
    //console.log(this.customerService.customerLocal);
    //console.log('test');
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.name} has been added to your cart.`);
  }

  addToWishlist(product: any) {
    this.wishlistService.addToWishlist(product);
  }

}