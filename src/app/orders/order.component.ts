import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../cart/cart.service";
import { CommonModule, NgFor } from "@angular/common";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [CommonModule, NgFor, HeaderComponent],
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit{

    cartItems: any[] = [];
    totalAmount: number = 0;
    shippingInfo: any = {};

    constructor(private cartService: CartService, private router: Router) { }

    ngOnInit(): void {
        // Fetch the cart items and total amount from the CartService
        this.cartItems = this.cartService.getCartItems();
        this.totalAmount = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
        this.shippingInfo = this.cartService.getShippingInfo();

        // Simulating shipping info retrieval (you might get this from a service or state management)
        // For example:
        // this.shippingInfo = {
        //     name: 'John Doe',
        //     address: '123 Green St',
        //     city: 'Gardenville',
        //     state: 'CA',
        //     zip: '90210',
        // };

        // If no cart items, redirect to home
        //if (this.cartItems.length === 0) {
        //    this.router.navigate(['/home']);
        //}
        
        // Clear the cart
        this.cartService.clearCart();
    }

}