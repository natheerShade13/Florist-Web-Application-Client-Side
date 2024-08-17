import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [HeaderComponent, CommonModule, NgFor],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  products = [
    { productId: 1, name: 'Plant 1', description: 'Beautiful indoor plant', price: 20, image: '../assets/plant1.jpg', stockQuantity: 1, category: '' },
    { productId: 2, name: 'Plant 2', description: 'Indoor Cheese', price: 500, image: '../assets/plant2.jpg', stockQuantity: 1, category: '' },
    { productId: 3, name: 'Plant 3', description: 'Succulent plant', price: 15, image: '../assets/plant3.jpg', stockQuantity: 1, category: '' },
    { productId: 4, name: 'Plant 4', description: 'Bonzai', price: 50, image: '../assets/plant4.jpg', stockQuantity: 1, category: '' },
    { productId: 5, name: 'Plant 5', description: 'Succulent unique', price: 40, image: '../assets/plant6.jpg', stockQuantity: 1, category: '' },
    // Add more products as needed
  ];

  constructor(private router: Router, private cartService: CartService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    //alert(`${product.name} has been added to your cart.`);
  }

  addToWishlist(product: any) {
    this.wishlistService.addToWishlist(product);
  }

}
