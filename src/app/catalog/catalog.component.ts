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
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  products: Product[] = [];

  constructor(private router: Router, private cartService: CartService, private wishlistService: WishlistService, 
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    //alert(`${product.name} has been added to your cart.`);
  }

  addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
  }

  // "https://m.media-amazon.com/images/I/61mMytOBsJL._AC_SL1024_.jpg"
  // "https://m.media-amazon.com/images/I/51vqAIkTbsL._AC_SL1024_.jpg"
  // "https://m.media-amazon.com/images/I/61QFtjVVy5L._AC_SL1024_.jpg"
  // "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  // "https://media.istockphoto.com/id/2111424340/photo/orange-gerbera-flower-head-macro-top-view.jpg?s=1024x1024&w=is&k=20&c=bI_KOI2yzxVD8r9CILC9v1aCmI5VatA-aoVLR7xqsQU="

}
