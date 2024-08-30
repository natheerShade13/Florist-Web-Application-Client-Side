import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule, NgFor } from '@angular/common';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [HeaderComponent, CommonModule, NgFor],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  products: Product[] = [];

  constructor(private router: Router, private cartService: CartService, private wishlistService: WishlistService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
  }

  isProductInWishlist(product: Product): boolean {
    return this.wishlistService.isInWishlist(product);
  }
}
