import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { CartService } from '../cart/cart.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  products = [
    { name: 'Plant 1', description: 'Beautiful indoor plant', price: 20, image: '../assets/plant1.jpg' },
    { name: 'Plant 2', description: 'Indoor Cheese', price: 500, image: '../assets/plant2.jpg' },
    { name: 'Plant 3', description: 'Succulent plant', price: 15, image: '../assets/plant3.jpg' },
    { name: 'Plant 4', description: 'Bonzai', price: 50, image: '../assets/plant4.jpg' },
    { name: 'Plant 5', description: 'Succulent unique', price: 40, image: '../assets/plant6.jpg' },
    // Add more products as needed
  ];

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  onSignOut() {
    // Handle sign-out logic here
    this.router.navigate(['/login']);
  }

  onCart() {
    this.router.navigate(['/cart']);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.name} has been added to your cart.`);
  }

}