import { Component, OnInit } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Product } from '../catalog/product.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [HeaderComponent, CommonModule, NgIf, NgFor],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];

  constructor(private wishlistService: WishlistService, private cartService: CartService) {}

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlist = wishlist;
    });
  }

  removeFromWishlist(product: Product): void {
    this.wishlistService.removeFromWishlist(product);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    //this.removeFromWishlist(product);
  }
  
}
