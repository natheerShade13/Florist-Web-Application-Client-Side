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
  // "https://www.interflora.co.za/wp-content/uploads/2023/01/Red-and-White-Roses-Bunch-12-Stems-238BU12.jpg"
  // "https://www.interflora.co.za/wp-content/uploads/2022/09/Red-Pink-Roses-Bunch-24-roses%E2%80%93162BU24.jpg"
  // "https://www.interflora.co.za/wp-content/uploads/2022/04/Aria-1.jpg"
  // "https://www.interflora.co.za/wp-content/uploads/2022/04/Garnet.jpg"
  // "https://www.interflora.co.za/wp-content/uploads/2022/04/Enchanted-PR.jpg"
  // "https://www.interflora.co.za/wp-content/uploads/2022/04/Dolce-Vita.jpg"
}
