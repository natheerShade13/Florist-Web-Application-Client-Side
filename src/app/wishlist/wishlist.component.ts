import { Component, OnInit } from '@angular/core';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlist = wishlist;
    });
  }

  removeFromWishlist(product: any) {
    this.wishlistService.removeFromWishlist(product);
  }
}